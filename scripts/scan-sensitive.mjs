#!/usr/bin/env node
// Scan skill content for sensitive information.
// Reports file:line, the kind of hit, and a masked excerpt. Never prints the raw value.
// Exit code 1 when hits are found (use --warn to report without failing).
// Run with: node scripts/scan-sensitive.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const warnOnly = process.argv.includes('--warn')

const PATTERNS = [
  { name: 'private key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'GitHub token', re: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/ },
  { name: 'GitHub fine-grained token', re: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/ },
  { name: 'Slack token', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { name: 'OpenAI-style key', re: /\bsk-[A-Za-z0-9]{20,}\b/ },
  { name: 'assigned secret', re: /\b(?:password|passwd|pwd|secret|token|api[_-]?key|access[_-]?key)\b\s*[:=]\s*["']?[^\s"']{6,}/i },
  { name: 'Chinese secret assignment', re: /(?:密码|口令|密钥)\s*[:=：]\s*\S{4,}/ },
  { name: 'email address', re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/ },
  { name: 'IPv4 address', re: /\b(?:\d{1,3}\.){3}\d{1,3}\b/ },
  { name: 'absolute home path', re: /(?:\/Users\/[^/\s]+|\/home\/[^/\s]+|[A-Za-z]:\\Users\\)/ },
  { name: 'internal hostname', re: /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:internal|corp|local)\b/i },
]

const files = []
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full)
    else if (entry.endsWith('.md')) files.push(full)
  }
}
walk(join(root, 'skills'))

let hits = 0
for (const file of files) {
  const rel = relative(root, file)
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    for (const pattern of PATTERNS) {
      const match = pattern.re.exec(line)
      if (!match) continue
      hits++
      const masked = line.replace(match[0], '***').trim().slice(0, 120)
      console.log(`${rel}:${index + 1}: [${pattern.name}] ${masked}`)
    }
  })
}

if (hits > 0) {
  console.log(`\n${hits} potential sensitive hit(s) in ${files.length} file(s).`)
  console.log('Do not edit them silently. Report each hit with a replacement suggestion and wait for confirmation.')
  process.exit(warnOnly ? 0 : 1)
}

console.log(`No sensitive patterns found in ${files.length} file(s).`)
