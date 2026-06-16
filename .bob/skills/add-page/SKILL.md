---
name: add-page
description: Add a new page to this Carbon prototype, built from IBM Carbon Design System components and following Carbon's themes, layering, spacing and type. Use whenever someone asks to "add a page", "create a new page", "add a new view", "add a section to the app", "add a form / table / settings / details / list page", or "add it to the sidebar / side nav" — for any page that is NOT a metrics-and-charts dashboard. (For a KPI + charts dashboard, use the add-dashboard-page skill instead.)
---

# Add a new Carbon page

This project is a **no-build, multi-page** IBM Carbon prototype. There is **no React, no npm, no
bundler, and no build step**, and it must keep working when the `.html` files are **opened directly
from the filesystem** (`file://`) — so: every script is a plain **classic script** (no
`import`/`export`, no local ES modules), data is **plain JS globals** (never `fetch()`), and there
are **no Web Workers**. Read `AGENTS.md` and `carbon-reference.md` in the project root first, and
never add build tooling.

`carbon-reference.md` is the **source of truth for components and design** — every `<cds-*>`
element, the CDN script that registers it, and the Carbon tokens (themes, layering, spacing, type,
color). Use it to choose components and to look up each one's script URL. Don't guess.

Each page is **its own HTML file** (`dashboard.html`, `notes.html`, …) whose body is just one
custom element — `<bob-<slug>>`, defined in `components/<slug>.js`. The shared header + rail nav is
injected by `shell.js`; nav links are real `<a href>`s. Building a page is: pick the Carbon
components → write the component → write the page HTML → add it to the nav → (only if it shows data)
add a data file.

## Ask the user first

- **Page name** — the side-nav label and page title (e.g. "Customers").
- **Short id (slug)** — one word, lowercase, no spaces (e.g. `customers`). Used as the file name,
  the element name (`<bob-customers>`), and the data global. Keep it identical everywhere.
- **What's on the page** — a form? a table/list? cards of text? This decides which components you
  pull from `carbon-reference.md`.

## Steps

### 1. Pick the Carbon components — `carbon-reference.md` §1

Note each component's `<name>` (the end of its CDN URL) and its `<cds-*>` elements. Common picks:
- **Form** → `form-group`, `text-input`, `textarea`, `select`/`dropdown`, `checkbox`, `radio-button`, `button`.
- **Records / list** → `data-table` or `structured-list`; `pagination` if long; `tag` for status chips.
- **Content / detail** → headings + text, `link`, `accordion`, `tile`, `tooltip`.
- **Feedback** → `notification`, `modal`, `loading` / `skeleton-text`.

### 2. Write the component — `components/<slug>.js`

Copy `templates/component.js`, replace every `__SLUG__` / `__TITLE__`, and build the markup inside
`connectedCallback()` from the components you chose. It's a **classic script** (no imports): it just
defines a custom element that sets its own `innerHTML`. If the page shows data, read it from a
`window.BOB_<SLUG>` global (see step 5) — never `fetch()`.

### 3. Write the page — `<slug>.html`

Copy `templates/page.html`, replace `__SLUG__` / `__TITLE__`. In its `<head>`, add one
`<script type="module" src="…/v2.56.0/<name>.min.js">` for **each** Carbon component the page uses
(keep `v2.56.0`); `ui-shell`, `tag`, and `tile` are already there. The `<body>` is just
`<main id="main"><bob-<slug> class="view"></bob-<slug>></main>` plus the classic scripts
(`shell.js`, the data file if any, then `components/<slug>.js`).

### 4. Add it to the nav — `shell.js`

Append one entry to the `NAV` array in `shell.js` (grab an icon `<path>` from `carbon-reference.md`):

```js
{ href: '__SLUG__.html', label: '__TITLE__', icon: '<path d="…"/>' },
```

`shell.js` renders the rail link (with its icon) on every page and marks the current page active.

### 5. Add data only if the page needs it — `data/<slug>.js`

A static page (text, a form's markup) needs no data. If it shows data, create `data/<slug>.js`:

```js
window.BOB___SLUG__ = [ /* …rows/objects… */ ]
```

load it in the page `<body>` with `<script src="./data/<slug>.js"></script>` **before** the
component script, and read `window.BOB___SLUG__` in the component. (JS global, not JSON + fetch — so
the page still opens from `file://`.) Building table rows? Follow `components/notes.js` as the pattern.

## Carbon design rules (from `carbon-reference.md` §2)

- **Layering:** gray-10 page, white `layer-01` cards (`cds-tile`). Never white-on-white; show
  elevation with background layer steps, **not** drop shadows.
- **Spacing:** the rem scale only — 0.5 / 1 / 1.5 / 2 / 3rem. **Never px.**
- **Type:** page title `heading-05` (2rem / weight 400 — Carbon headings are light), section titles
  `heading-03`. IBM Plex Sans.
- **Color:** Carbon tokens; interactive elements are **blue-60** (`#0f62fe`). Don't invent accents.

## Confirm it worked

Open `<slug>.html` (double-click it, or serve the folder with `python3 -m http.server 4321`). The new
label is in the left rail; clicking it opens your page; the Carbon components render styled, with no
console errors. **If a component shows as plain, unstyled text, its script isn't loaded** — re-check
the `<name>` in the page `<head>` against `carbon-reference.md`.
