# Changelog

All notable changes to this repository are recorded here.

## [0.4.4] - 2026-11-24

### Changed

- `skills/design-parity-review` — added a review-only mode (只检查 / 先别改 / 只列问题 / 不要动代码 / review only) that keeps the whole turn read-only, plus a global rule that a review ends at the report unless a fix was explicitly requested.

## [0.4.3] - 2026-11-24

### Added

- `skills/design-parity-review` — review UI against a design or requirement doc: freeze a design whitelist, audit the implementation for extra decorations, compare real screenshots, and report missing/extra/mismatched elements; explicit point changes bypass the workflow.

## [0.4.2] - 2026-11-11

### Changed

- `skills/requirement-to-test-cases` — added mandatory requirement-table column audit, sort-key/derived-value coverage (e.g. average = total ÷ matches), mandatory 5-item checklist for list/ranking features (direction, sort key, null position, cross-page order, regression), falsifiability rule, and requirement-column → AC → TC coverage matrix; skill version **1.2.0**.

## [0.4.1] - 2026-11-10

### Changed

- `skills/requirement-to-test-cases` — replaced business-specific examples with domain-neutral ones, added English trigger text; skill version 1.1.0.

## [0.4.0] - 2026-11-10

### Added

- `skills/requirement-to-test-cases` — turn requirement documents into traceable acceptance points and layered test cases, with a data-availability audit.

## [0.3.0] - 2026-11-07

### Changed

- `skills/careful-review` — added verification tiers (default / static / single round / loop) and a loop-until-clean protocol; skill version 1.1.0.

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
