---
name: design-parity-review
description: Review a UI implementation against a design reference or a requirement/development document, and report missing, extra, or mismatched elements. Use when the user says "对照设计稿/效果图检查", "按需求文档/开发文档开发", "核对页面还原", "visual parity review", or "design QA". Do not use for explicit point changes such as changing one color, deleting one divider, or changing one font size; implement those directly with minimal checks.
---

# Design parity review

## When to use

Use this skill when:

- A screen or component must be built from a requirement document or development document.
- A screen must be checked against a visual design, screenshot, SVG, or prototype.
- The user asks whether a page matches the design, or asks for visual QA.
- A page has been rebuilt and needs a design-parity sign-off before release.

Do not use this skill when the user gives an explicit point change, for example:

- "把这里的字号改成 13"
- "去掉这条分割线"
- "这个按钮改成蓝色"
- "把这个图标放到右边"

For those requests, implement only the stated change. Do not add decorations, do not widen the scope, and do not run the full design-parity workflow.

## Inputs

Collect before reviewing:

1. Design reference
   - SVG/PNG/screenshot/prototype.
   - Prefer SVG with retained `<text>`, `font-size`, `font-family`, `font-weight`, and line-height metadata.
2. Implementation target
   - Screen, route, deep link, component name.
   - Platform: Android, iPhone, or both.
3. Requirement source
   - PRD, development document, acceptance criteria, or explicit design notes.
4. States to inspect
   - Default, dark/light, empty, loading, error, long text, no data, disabled, selected.

If the design contains only outlined text paths, state explicitly that font sizes are estimates unless a confirmed token or annotation exists.

## Workflow

### 1. Establish the design source of truth

Inspect the design before reading implementation details.

Build an element inventory covering:

- Page sections and their order.
- Cards, rows, columns, and grouping.
- Decorative elements:
  - dividers
  - borders
  - backgrounds
  - shadows
  - badges
  - icons
  - gradients
- Text:
  - label and value
  - hierarchy
  - font family, size, weight, line height
  - color and alignment
- Layout:
  - width and height
  - padding, margin, gap
  - alignment and wrapping
- States:
  - selected/unselected
  - dark/light
  - empty/loading/error
  - long names, missing values, zero values.

Freeze this inventory as the whitelist. Anything not present in the design or requirement is forbidden.

### 2. Audit the implementation

Review the changed files and the rendered component.

At minimum, search for newly added or changed style properties:

- `border*`
- `shadow*`
- `backgroundColor`
- new icon components
- hard-coded colors (`#...`, `rgba(...)`)
- new `Divider` or separator rows
- extra text labels
- extra wrapper padding or negative margins

Compare every decoration with the inventory:

- Present in design and implementation -> pass.
- Present in design, missing in implementation -> missing.
- **Not present in design, present in implementation -> extra; always fail.**

Never justify an extra divider, border, shadow, background, or icon as "a common list style" or "looks better".

### 3. Capture the target

Capture the exact screen and state being reviewed.

- Android: use the installed debug/Metro build and a real device when available.
- iPhone: use the current build and a real device when available.
- Capture full screen, not a cropped component, unless the design is component-only.
- Record light and dark modes separately.
- Record the relevant empty/loading/error/long-text states.

If runtime capture is impossible, mark the visual comparison as **BLOCKED** rather than claiming parity from code alone.

### 4. Compare systematically

Compare in this order, because extra decorations are the most common failure:

1. **Extra elements**
   - New dividers
   - New borders or outlines
   - New background blocks
   - New icons or labels
2. **Missing elements**
   - Sections, rows, labels, icons, values
3. **Structure and order**
   - Grouping and section order
4. **Text**
   - Content
   - Hierarchy
   - Font size and weight
   - Color and alignment
5. **Layout**
   - Width, height, spacing, padding, alignment
6. **Visual treatments**
   - Corner radius
   - Background color
   - Divider color and width
   - Dark-mode variants
7. **Interaction and states**
   - Tappable areas
   - Selected/unselected
   - Disabled
   - Empty/loading/error
   - Safe area and long text.

Do not accept a visual match based only on code inspection.

### 5. Run the automated guards

Before declaring pass:

- Run lint and type checks for the changed files.
- Run the relevant component/behavior tests.
- Run i18n completeness checks when user-visible text changed.
- Run any existing style/decorations audit:
  - flag raw colors, borders, shadows, or icons added without a design reference.
- If screenshot-based checks exist, normalize the implementation to the design width and compare:
  - horizontal and vertical line detection
  - filled/rounded background blocks
  - spacing and bounding boxes
  - text hierarchy via UI hierarchy or OCR where available.

Static checks cannot prove visual parity. Visual checks cannot prove behavior. Both are required.

### 6. Verify font sizes and colors honestly

- Read exact values from design metadata when available.
- When only paths exist, measure glyph height and line spacing to estimate the size.
- Label estimated values as estimates.
- Do not present an inferred size as a confirmed design token.
- Use theme tokens and existing tokens instead of inventing raw colors.
- Preserve light mode when a dark-mode-only change is requested, unless the design explicitly changes both.

### 7. Report

Use this output shape:

```md
## 结论
PASS | FAIL | BLOCKED

## 设计基准
- design file / device / platform / state

## 缺失
- ...

## 多余
- ...

## 不一致
- ...

## 边界与状态
- ...

## 未覆盖
- ...
```

Rules:

- PASS only when there are no missing or extra elements and the key properties match.
- Any extra decoration is a FAIL, even if it "looks acceptable".
- Any unverified platform or state belongs under "未覆盖".
- Do not use "应该没问题" as evidence.

## Common failure examples

- Adding a divider between list rows because many lists have one.
- Adding a shadow or background to make a card more prominent.
- Guessing a font size from an outlined SVG and presenting it as exact.
- Copying a generic list/table style into a design-specific card.
- Comparing only code diffs without a runtime screenshot.
- Checking only the happy path and missing dark mode, empty, or long text.
- Matching the text content but ignoring font weight, line height, or alignment.

## Constraints

- The design reference is a whitelist.
- No speculative decorations.
- No broad refactors during a design review.
- No secrets, credentials, customer names, private URLs, or absolute home paths in reports or files.
- If a visual comparison cannot be performed, report it as blocked; never fabricate evidence.
- Explicit point changes override this workflow: implement them directly and keep checks minimal.
