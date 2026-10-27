# Changelog

All notable changes to this repository are recorded here.

## [0.2.0] - 2026-10-27

### Added

- `skills/db-safety` — database red lines and read-only-first probing.
- `skills/secret-hygiene` — handling credentials without storing or echoing them.

## [0.1.0] - 2026-10-27

### Added

- `skills/careful-review` — five-step recheck before claiming a change is done.
- `template/SKILL.md` — scaffold for new skills.
- `scripts/validate-skills.mjs` — frontmatter and naming validation.
- `scripts/scan-sensitive.mjs` — sensitive information scan.
- `.github/workflows/validate.yml` — runs validation and scanning on push and pull request.
- `.claude-plugin/marketplace.json` — Claude Code plugin marketplace manifest.
- `AGENTS.md` — repository editing rules.
