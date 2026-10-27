#!/usr/bin/env node
// Validate every skill in skills/ against the Agent Skills specification.
// Checks: frontmatter shape, allowed fields, name/directory match, description length, body presence.
// No dependencies; run with: node scripts/validate-skills.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(process.cwd())
const skillsDir = join(root, 'skills')
const ALLOWED = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'])
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const errors = []
const seen = new Set()

let entries = []
try {
  entries = readdirSync(skillsDir)
} catch {
  console.error(`No skills/ directory at ${skillsDir}`)
  process.exit(1)
}

for (const entry of entries) {
  const dir = join(skillsDir, entry)
  if (!statSync(dir).isDirectory()) continue
  seen.add(entry)
  const before = errors.length

  const file = join(dir, 'SKILL.md')
  let text
  try {
    text = readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
  } catch {
    errors.push(`${entry}: missing SKILL.md`)
    continue
  }

  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text)
  if (!match) {
    errors.push(`${entry}: SKILL.md must start with YAML frontmatter`)
    continue
  }

  const fields = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (kv) fields[kv[1]] = kv[2].trim()
  }

  for (const key of Object.keys(fields)) {
    if (!ALLOWED.has(key)) {
      errors.push(`${entry}: unsupported frontmatter field "${key}" (allowed: ${[...ALLOWED].join(', ')})`)
    }
  }

  const skillName = (fields.name || '').replace(/^["']|["']$/g, '')
  if (!skillName) {
    errors.push(`${entry}: missing required field "name"`)
  } else {
    if (skillName !== entry) errors.push(`${entry}: name "${skillName}" must match the directory name`)
    if (skillName.length > 64) errors.push(`${entry}: name exceeds 64 characters`)
    if (!NAME_RE.test(skillName)) {
      errors.push(`${entry}: name must be lowercase letters, digits and single hyphens (no leading, trailing or double hyphens)`)
    }
  }

  const description = (fields.description || '').replace(/^["']|["']$/g, '')
  if (!description) {
    errors.push(`${entry}: missing required field "description"`)
  } else if (description.length > 1024) {
    errors.push(`${entry}: description is ${description.length} characters (max 1024)`)
  }

  const body = text.slice(match[0].length).trim()
  if (body.length < 20) errors.push(`${entry}: body is empty or too short`)

  if (errors.length === before) console.log(`ok  ${entry}`)
}

if (entries.length === 0) errors.push('no skills found under skills/')

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`\n${seen.size} skill(s) valid`)
