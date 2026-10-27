# my_skill_for_develop

A personal library of agent skills distilled from the problems I keep running into during development. Each skill captures a workflow that was repeated, failed, or cost time often enough to be worth writing down — so the next time it is loaded instead of rediscovered.

The library grows as I work: new skills are added when a new failure mode shows up, and existing ones are revised when reality turns out to be different.

## Skills

| Skill | Use when |
|---|---|
| [careful-review](skills/careful-review/SKILL.md) | A change is "done" and needs a full recheck — compile, tests, independent recomputation, boundary table, cross-end alignment — instead of a diff review |
| [db-safety](skills/db-safety/SKILL.md) | Touching a database, schema, migration, or data fix — read-only first, confirm every write, never destructive DDL |
| [secret-hygiene](skills/secret-hygiene/SKILL.md) | Handling keys, tokens, certificates, or credential files — never read, store, or echo the value |

## Structure

```
skills/<name>/SKILL.md      # one skill per directory; the directory name is the skill name
template/SKILL.md           # scaffold for new skills
scripts/validate-skills.mjs # frontmatter and naming checks
scripts/scan-sensitive.mjs  # sensitive information scan
.claude-plugin/marketplace.json
```

Optional per-skill files (`scripts/`, `references/`, `assets/`) follow the Agent Skills specification.

## Usage

Copy or symlink a skill directory into your agent's skills folder:

- DeepSeek Harness: `~/.dsh/skills/`
- Claude Code: `~/.claude/skills/`

Claude Code can also install the whole repository as a plugin marketplace:

```
/plugin marketplace add codeqian/my_skill_for_develop
/plugin install careful-review@codeqian-skills
```

Cursor and other tools that do not read `SKILL.md` directly can use the content as a project rule or an `AGENTS.md` section.

## Development

```
node scripts/validate-skills.mjs
node scripts/scan-sensitive.mjs
```

The same checks run in CI on every push and pull request. Any sensitive hit must be reported with a replacement suggestion and confirmed by the user before editing.

## Status

Work in progress. Expect additions and revisions.

---

# my_skill_for_develop（中文）

这是一个个人 skill 库，内容来自我在开发过程中反复遇到的问题。每个 skill 对应一个被重复踩过、或者曾经浪费过时间的流程，目的是下次直接复用，而不是重新摸索一遍。

这个库会随着工作持续扩展和更新：遇到新的坑就补充新 skill，原有 skill 在实践中发现不适用就修订。

## Skills

| Skill | 适用场景 |
|---|---|
| [careful-review](skills/careful-review/SKILL.md) | 改动“做完了”需要全量复查时——编译、测试、独立复算、边界枚举、跨端对齐，而不是只看 diff |
| [db-safety](skills/db-safety/SKILL.md) | 要连库、改表、跑迁移或修数据时——只读优先、写前确认、禁止破坏表结构 |
| [secret-hygiene](skills/secret-hygiene/SKILL.md) | 处理密钥、token、证书或凭据文件时——不读正文、不落盘、不回显 |

## 目录结构

```
skills/<name>/SKILL.md      # 一个目录一个 skill，目录名即 skill 名
template/SKILL.md           # 新增 skill 的脚手架
scripts/validate-skills.mjs # frontmatter 与命名校验
scripts/scan-sensitive.mjs  # 敏感信息扫描
.claude-plugin/marketplace.json
```

单个 skill 需要时可按 Agent Skills 规范增加 `scripts/`、`references/`、`assets/`。

## 使用方式

把 skill 目录复制或软链到你所用 agent 的 skills 目录：

- DeepSeek Harness：`~/.dsh/skills/`
- Claude Code：`~/.claude/skills/`

Claude Code 也可以把整个仓库作为插件市场安装：

```
/plugin marketplace add codeqian/my_skill_for_develop
/plugin install careful-review@codeqian-skills
```

Cursor 等不直接读取 `SKILL.md` 的工具，可以把内容作为项目规则或 `AGENTS.md` 的一节使用。

## 开发

```
node scripts/validate-skills.mjs
node scripts/scan-sensitive.mjs
```

CI 会在每次 push 和 pull request 时跑同一组检查。扫描到敏感信息时，必须先给出替换建议、经你确认后才能改。

## 状态

持续更新中，会有新增和修订。
