---
name: add-dashboard-page
description: Add a new metrics dashboard page to this Carbon prototype by copying the existing Dashboard — four KPI tiles plus the line, donut and bar Carbon Charts — and wiring it into the side navigation. Use when someone asks to add a dashboard, a metrics / analytics / KPI / charts page, or to "copy" or "duplicate the dashboard". For a page that is NOT a charts dashboard (a form, table, settings, or content page), use the add-page skill instead.
---

# Add a new dashboard page

This project is a **no-build, multi-page** IBM Carbon prototype. There is **no React, no npm, no
bundler, and no build step**, and it must keep working when the `.html` files are **opened directly
from the filesystem** (`file://`) — so every script is a plain **classic script** (no
`import`/`export`), data is a **plain JS global** (never `fetch()`), and Carbon Charts is pulled in
with a **dynamic `import()`** of its CDN module. Read `AGENTS.md` and `carbon-reference.md` first,
and never add build tooling.

A dashboard page is **three new files** (a page, a component, a data file) plus **one nav line**.
The ready-made versions are in this skill's `templates/` folder — copy them and replace the
placeholders. It mirrors the existing `dashboard.html` + `components/dashboard.js` + `data/metrics.js`.

## Ask the user for two things first

- **Page name** — the side-nav label and page title (e.g. "Sales").
- **Short id (slug)** — one word, lowercase, no spaces (e.g. `sales`). Used as the file names, the
  element name (`<bob-sales>`), and the data global (`window.BOB_SALES`). **Keep it identical
  everywhere.**

## Steps

### 1. Add the data — `data/<slug>.js`

Copy `templates/data.js` to `data/<slug>.js`, rename the global to `window.BOB_<SLUG>` (uppercase
slug), and fill in real numbers. It has three keys: `line` (rows of `group`/`key`/`value`), `split`
(rows of `group`/`value`), and `bars` (rows of `group`/`value`).

### 2. Write the component — `components/<slug>.js`

Copy `templates/dashboard-component.js` to `components/<slug>.js` and replace every `__SLUG__` /
`__TITLE__` / `__SLUG_UPPER__`. It's a classic script that defines `<bob-<slug>>`: it renders four
KPI tiles + three chart containers, then draws the charts with
`await import('https://esm.sh/@carbon/charts@1.27.11')`, reading `window.BOB_<SLUG>`. Update the four
KPI labels/values in the markup.

### 3. Write the page — `<slug>.html`

Copy `templates/dashboard.html`, replace `__SLUG__` / `__TITLE__`. It loads the Carbon Charts CSS,
the shell, the data file, and the component. (KPI tiles use the shared `<bob-kpi-tile>`, so it also
loads `components/kpi-tile.js`.)

### 4. Add it to the nav — `shell.js`

Append one entry to the `NAV` array in `shell.js` (reuse the dashboard grid icon, or pick another
from `carbon-reference.md`):

```js
{ href: '__SLUG__.html', label: '__TITLE__', icon: '<path d="M24 21H26V26H24z"/><path d="M20 16H22V26H20z"/><path d="M11,26a5.0059,5.0059,0,0,1-5-5H8a3,3,0,1,0,3-3V16a5,5,0,0,1,0,10Z"/><path d="M28,2H4A2.002,2.002,0,0,0,2,4V28a2.0023,2.0023,0,0,0,2,2H28a2.0027,2.0027,0,0,0,2-2V4A2.0023,2.0023,0,0,0,28,2Zm0,9H14V4H28ZM12,4v7H4V4ZM4,28V13H28.0007l.0013,15Z"/>' },
```

## Components & Carbon conventions

`carbon-reference.md` is the source of truth — **look things up there, don't guess**:
- Charts use `theme: 'white'` and `height: '20rem'`. The classes come from
  `await import('https://esm.sh/@carbon/charts@1.27.11')` — no static import, no import map.
- Gray 10 theme: gray-10 page, white `layer-01` cards. Page title is `heading-05`; use **rem** on
  the spacing scale, never px; interactive accents are blue-60. See `carbon-reference.md` §2.
- Need an extra Carbon component? Find its `<name>` in `carbon-reference.md` §1 and add one
  `<script type="module" src="…/v2.56.0/<name>.min.js">` to the page `<head>`.

## Confirm it worked

Open `<slug>.html` (double-click it, or serve with `python3 -m http.server 4321`). The new label is
in the left rail; clicking it opens your dashboard with the KPI tiles and three charts drawn, and no
console errors. If a chart is blank, check the `data-chart` selector in the markup matches the one
the component queries, and that `window.BOB_<SLUG>` is spelled the same in the data file and the
component.
