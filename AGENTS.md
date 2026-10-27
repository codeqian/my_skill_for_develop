# Repository instructions

This repository is a personal library of agent skills. Every skill here came from a real problem hit during development.

## Layout

```
skills/<name>/SKILL.md   # one skill per directory; the directory name is the skill name
template/SKILL.md        # copy this when adding a skill
scripts/validate-skills.mjs
```

Optional per-skill files (`scripts/`, `references/`, `assets/`) are allowed by the Agent Skills spec and should be added only when the skill actually needs them.

## Adding or editing a skill

1. Copy `template/SKILL.md` to `skills/<new-name>/SKILL.md`.
2. Keep the frontmatter minimal and spec-compliant. Allowed fields only:
   `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`.
   Never add tool-specific fields such as `whenToUse` — they break other agents.
3. `name` must equal the directory name: lowercase letters, digits, single hyphens, max 64 characters.
4. `description` must say what the skill does **and when to use it**, including the words a user would actually say. Max 1024 characters.
5. Keep `SKILL.md` under roughly 500 lines. Move long reference material into `references/` and link to it.
6. No secrets, credentials, customer names, internal URLs, or absolute home paths in skill content.
7. Add the skill to the table in `README.md`.
8. Add an entry to `CHANGELOG.md`.
9. Run `node scripts/validate-skills.mjs` before committing.

## Sensitive information check (mandatory)

After creating or editing any skill, run:

```
node scripts/scan-sensitive.mjs
```

Review every hit. If anything is flagged — or you notice sensitive content by reading — **do not edit or delete it silently**. Report to the user first:

1. the file and line,
2. what kind of sensitive data it is,
3. a concrete replacement suggestion (generic example, placeholder, or removal).

Wait for explicit confirmation before changing the skill. After the change, add an entry to `CHANGELOG.md`.

Treat these as sensitive: credentials, tokens, private keys, certificates, signed URLs, private URLs and IPs, internal hostnames, customer or employer names, internal project names, absolute home paths, and any business-specific identifier that reveals the domain.

## Language

Skill bodies and descriptions may be Chinese or English. English descriptions are recommended for public skills so that non-Chinese agents route to them reliably.
