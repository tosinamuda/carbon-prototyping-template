# Carbon reference — components, CDN URLs & design guidance

A quick-reference so an AI assistant (or you) doesn't have to hunt for Carbon component
names, CDN URLs, or design tokens. Two parts:

1. **[Components & their CDN URLs](#1-components--their-cdn-urls)** — every `<cds-*>` bundle this
   project can load, verified against the IBM CDN for **v2.56.0**.
2. **[Carbon design guidance](#2-carbon-design-guidance)** — the tokens, themes, spacing, and
   type rules that keep a page looking like real Carbon.

> Pin a different version by changing `v2.56.0` in the URL **and** in `index.html`.

---

## 1. Components & their CDN URLs

Every component is **one self-registering script**. Add the `<script>` to `index.html`'s
`<head>` and the `<cds-*>` elements become available — no import, no build.

**The URL is always this pattern — only `<name>` changes:**

```html
<script type="module"
  src="https://1.www.s81c.com/common/carbon/web-components/version/v2.56.0/<name>.min.js"></script>
```

So `button` → `…/v2.56.0/button.min.js`, `data-table` → `…/v2.56.0/data-table.min.js`, etc.
Pick the bundle from the tables below; the `<name>` column **is** the end of the URL.

### Layout & UI shell

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `ui-shell` | `cds-header`, `cds-header-name`, `cds-header-menu-button`, `cds-side-nav`, `cds-side-nav-items`, `cds-side-nav-link` | The dark top bar + side navigation app frame |
| `tile` | `cds-tile`, `cds-clickable-tile`, `cds-selectable-tile`, `cds-expandable-tile` | A card on the `layer-01` (white) surface |
| `layer` | `cds-layer` | Step nested content to the next layer token |
| `stack` | `cds-stack` | Vertical/horizontal spacing between children |

### Actions

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `button` | `cds-button`, `cds-button-set` | Primary / secondary / tertiary / ghost / danger buttons |
| `icon-button` | `cds-icon-button` | Icon-only button with a tooltip |
| `copy-button` | `cds-copy-button` | Copy-to-clipboard button |
| `menu-button` | `cds-menu-button` | Button that opens a menu |
| `overflow-menu` | `cds-overflow-menu`, `cds-overflow-menu-item` | The "⋮" overflow actions menu |
| `menu` | `cds-menu`, `cds-menu-item` | Standalone menu |

### Inputs & forms

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `text-input` | `cds-text-input` | Single-line text field (and password) |
| `textarea` | `cds-textarea` | Multi-line text field |
| `number-input` | `cds-number-input` | Numeric field with steppers |
| `search` | `cds-search` | Search field |
| `checkbox` | `cds-checkbox` | Checkbox |
| `radio-button` | `cds-radio-button`, `cds-radio-button-group` | Radio group |
| `toggle` | `cds-toggle` | On/off toggle |
| `select` | `cds-select`, `cds-select-item` | Native-style select |
| `dropdown` | `cds-dropdown`, `cds-dropdown-item` | Carbon dropdown |
| `combo-box` | `cds-combo-box`, `cds-combo-box-item` | Filterable dropdown |
| `multi-select` | `cds-multi-select`, `cds-multi-select-item` | Multi-choice dropdown |
| `slider` | `cds-slider` | Range slider |
| `date-picker` | `cds-date-picker`, `cds-date-picker-input` | Calendar date field |
| `time-picker` | `cds-time-picker` | Time field |
| `file-uploader` | `cds-file-uploader`, `cds-file-uploader-item` | File upload |
| `form-group` | `cds-form-group` | Group + label a set of fields |

### Navigation

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `tabs` | `cds-tabs`, `cds-tab` | Tabbed sections |
| `content-switcher` | `cds-content-switcher`, `cds-content-switcher-item` | Segmented toggle between views |
| `breadcrumb` | `cds-breadcrumb`, `cds-breadcrumb-item` | Breadcrumb trail |
| `pagination` | `cds-pagination`, `cds-page-sizes-select`, `cds-pages-select` | Table pagination |
| `pagination-nav` | `cds-pagination-nav` | Page-number navigation |
| `progress-indicator` | `cds-progress-indicator`, `cds-progress-step` | Multi-step progress |
| `link` | `cds-link` | Styled inline link |

### Data display

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `data-table` | `cds-table`, `cds-table-head`, `cds-table-header-row`, `cds-table-header-cell`, `cds-table-body`, `cds-table-row`, `cds-table-cell` | Data tables (sortable, selectable, expandable) |
| `structured-list` | `cds-structured-list`, `cds-structured-list-row`, `cds-structured-list-cell` | Simpler row/column list |
| `list` | `cds-ordered-list`, `cds-unordered-list`, `cds-list-item` | Ordered / unordered lists |
| `accordion` | `cds-accordion`, `cds-accordion-item` | Collapsible sections |
| `contained-list` | `cds-contained-list`, `cds-contained-list-item` | Bordered list inside a container |
| `tag` | `cds-tag` | Status / category chips |
| `code-snippet` | `cds-code-snippet` | Inline / single / multi-line code blocks |

### Feedback & status

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `notification` | `cds-inline-notification`, `cds-toast-notification`, `cds-actionable-notification` | Inline / toast / actionable alerts |
| `modal` | `cds-modal`, `cds-modal-header`, `cds-modal-body`, `cds-modal-footer` | Dialogs |
| `side-panel` | `cds-side-panel` | Slide-in side panel |
| `tooltip` | `cds-tooltip`, `cds-definition-tooltip` | Hover tooltips (incl. definition tooltip) |
| `toggle-tip` | `cds-toggletip` | Click-to-open info tip |
| `popover` | `cds-popover`, `cds-popover-content` | Generic anchored popover |
| `loading` | `cds-loading` | Full spinner |
| `inline-loading` | `cds-inline-loading` | Inline "loading…" indicator |
| `progress-bar` | `cds-progress-bar` | Determinate / indeterminate progress bar |
| `skeleton-text` | `cds-skeleton-text` | Loading placeholder for text |
| `skeleton-placeholder` | `cds-skeleton-placeholder` | Loading placeholder block |
| `skeleton-icon` | `cds-skeleton-icon` | Loading placeholder for an icon |

### AI (Carbon for AI)

| `<name>` (→ URL) | Key elements | Use |
| --- | --- | --- |
| `ai-label` | `cds-ai-label` | The AI "sparkle" label/explainer (newer name for `slug`) |
| `slug` | `cds-slug` | Older alias of `ai-label` — prefer `ai-label` |
| `ai-skeleton` | `cds-ai-skeleton-text`, `cds-ai-skeleton-placeholder` | AI-themed loading placeholders |
| `chat-button` | `cds-chat-button` | Chat-style button |
| `icon-indicator` | `cds-icon-indicator` | Small status icon indicator |

> **Bundled, not separate:** `cds-actionable-notification` ships inside `notification`, and
> `cds-definition-tooltip` inside `tooltip` — there is **no** `actionable-notification.min.js`
> or `definition-tooltip.min.js` (both 404). Load the parent bundle.

### Carbon Charts (not a `<cds-*>` script)

Charts are **not** loaded the same way. They come through the **import map** in `index.html`
and are used as classes in `app.js`:

```js
import { LineChart, DonutChart, SimpleBarChart } from '@carbon/charts';
new LineChart(element, { data, options }); // options: { theme: 'white', height: '20rem' }
```

### Icons

Carbon icons are **SVG**, not a `<cds-*>` element. For this no-build project, **paste the SVG
markup inline** so it inherits color via `fill="currentColor"` (an `<img>` can't be themed).

Grab the authentic SVG from the CDN — the **full** icon set lives under `svg/32/` (the `svg/16/`
folder is only the ~60 icons Carbon's own components use, so most names 404 there):

```
https://cdn.jsdelivr.net/npm/@carbon/icons@11.82.0/svg/32/<name>.svg
```

e.g. `dashboard`, `chat`, `table`, `education`, `launch`, `document`, `settings`, `user--avatar`.
Inline it as `<svg viewBox="0 0 32 32" fill="currentColor" width="16" height="16">…</svg>` (the
32-grid scales down cleanly). Don't `npm install @carbon/icons`. The five side-nav icons in
`index.html` were taken straight from there.

> Inlining is fine for a handful of icons. If a page needs *many*, that markup bloats the HTML
> (and the tokens an AI reads) — at that point reach for an SVG sprite + `<use href="…#id">`.

---

## 2. Carbon design guidance

Follow these so generated pages read as genuine Carbon, not "Bootstrap with gray buttons."

### Themes & layering (the #1 thing people get wrong)

Carbon has four themes: **White**, **Gray 10**, **Gray 90 (g90)**, **Gray 100 (g100)**.
This project uses the standard product pairing: a **dark g100 header + side nav** over a
**Gray 10 content area**.

Layering is about **elevation through background steps**, not drop shadows:

| Token | This project | Used for |
| --- | --- | --- |
| `$background` | `#f4f4f4` (gray-10) | The page itself |
| `$layer-01` | `#ffffff` (white) | Cards / tiles / tables sitting on the page |
| `$layer-02` | `#f4f4f4` (gray-10) | Content **nested inside** a card |

Rule: each layer steps **up** by one. A white tile on a gray-10 page reads as one elevation.
Don't put a white tile on a white background (it disappears), and don't reach for shadows.
In CSS these are the `--cds-*` custom properties (e.g. `--cds-layer-01`), already set on
`#main` in `styles.css`.

### Spacing & the 2x grid

- Spacing scale (the only values you should use): **`$spacing-03` 0.5rem, `-05` 1rem,
  `-06` 1.5rem, `-07` 2rem, `-09` 3rem**. Everything is a multiple of the 8px (0.5rem) mini-unit.
- **Use `rem`, never `px`** (base is 16px, so 1rem = 16px). This is a hard rule in this project.
- Page padding: **1.5rem** on small screens, **2rem** on wide.
- Gutters between cards: **1rem** (`$spacing-05`).
- Tiles holding **dense content (charts)** get **1.5rem** padding so the content can breathe;
  plain KPI tiles keep the default 1rem.

### Type scale

Carbon headings are **light (weight 300–400), never bold.** Common steps:

| Style | Size / weight | Use |
| --- | --- | --- |
| `heading-05` | **2rem / 400** | Page title (`<h1>`) |
| `heading-03` | 1.25rem / 400 | Section / card title |
| `body-02` | 1rem / 400 | Body copy |
| `body-01` | 0.875rem / 400 | Secondary / labels |
| `label-01` | 0.75rem | Uppercase eyebrow labels |

Font is **IBM Plex Sans** for text, **IBM Plex Mono** for code. Body text on gray is
`#525252`/`#6f6f6f` (gray-70/60); primary text is `#161616` (gray-100).

### Color — use tokens, not hand-picked hex

Stick to Carbon palette values. The ones in play here: gray-10 `#f4f4f4`, gray-20 `#e0e0e0`,
gray-60 `#6f6f6f`, gray-70 `#525252`, gray-100 `#161616`, blue-20 `#d0e2ff` (tints),
blue-60 `#0f62fe` (interactive/primary), blue-70 `#0043ce` (hover), purple-70 `#6929c4`.
Interactive elements are **blue-60**; don't invent accent colors.

### Common mistakes to avoid

- ❌ White cards on a white page (no layering) → ✅ white tile on the gray-10 page.
- ❌ Bold headings → ✅ light (weight 400) headings.
- ❌ Drop shadows for elevation → ✅ background layer steps.
- ❌ `px` values / off-scale spacing (e.g. `13px`, `1.3rem`) → ✅ the rem spacing scale.
- ❌ A primary-blue chat/message bubble that looks like a button → ✅ a blue-**20** tint.
- ❌ `npm install` anything → ✅ CDN scripts + import map only (see [`AGENTS.md`](AGENTS.md)).

---

**See also:** [`AGENTS.md`](AGENTS.md) (project rules & how to add a view) ·
[`marketing-dashboard-plan.md`](marketing-dashboard-plan.md) (what we're building).
Official docs: <https://carbondesignsystem.com> · component API:
<https://web-components.carbondesignsystem.com>.
