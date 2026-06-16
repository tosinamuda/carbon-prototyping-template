# AGENTS.md — Carbon Web Components demo

Context for an AI coding assistant working in **this folder**. The person using you is
**non-technical** — they will not install tools, run a bundler, or debug a build. Everything
must keep working by just opening the page in a browser.

## What this is

A small IBM Carbon Design System app built with **Carbon Web Components** (the `<cds-*>` custom
elements). It is a **multi-page** site — one real HTML file per page (`dashboard.html`,
`notes.html`, `tutorial.html`; `index.html` redirects to the dashboard) — and there is **no React,
no `npm install`, no bundler, and no build step**.

It must **open straight from the filesystem** (double-clicking the `.html`, i.e. `file://`), not
only when served. That constraint drives the design (see the hard rules): all our own JS is plain
**classic scripts**, page content lives in **custom elements** (`<bob-dashboard>` etc. in
`components/<name>.js`), the shared header + rail is injected by **`shell.js`**, and sample data is
**plain JS globals** (`data/*.js`), never `fetch()`ed.

## Hard rules — do not break these

- **Must work from `file://`.** Open the `.html` files directly, no server. This rules out three
  things the browser blocks on `file://`, so **never** use them:
  - **No local ES modules.** Our scripts are classic `<script src>` (no `import`/`export`, no
    `type="module"` on local files). Only *remote* CDN modules may use `type="module"` (their CORS
    allows it). Need a remote module from classic code? Use a dynamic `import('https://…')` (that's
    how `components/dashboard.js` loads Carbon Charts).
  - **No `fetch()` of local files.** Sample data is a JS global in `data/<name>.js`
    (`window.BOB_… = …`), loaded as a classic `<script>`.
  - **No Web Workers** (blocked on `file://`). That's why there's no in-browser-model chat.
- **No build tooling.** No `package.json`, npm, Vite, webpack, TypeScript, framework. No compile step.
- **Load libraries from a CDN**, never from `node_modules`:
  - Carbon Web Components — one self-registering ES-module script per component:
    `https://1.www.s81c.com/common/carbon/web-components/version/v2.56.0/<name>.min.js` (CORS-enabled,
    so it loads on `file://`). The full list of `<name>`s + which `<cds-*>` elements each provides is
    in [`carbon-reference.md`](carbon-reference.md). **Check there first — don't guess a URL.**
  - Carbon Charts — `import('https://esm.sh/@carbon/charts@1.27.11')` (dynamic import) inside
    `components/dashboard.js`.

## Files

- `index.html` — redirects to `dashboard.html`.
- `dashboard.html` / `notes.html` / `tutorial.html` — one page each. A tiny `<head>` (CSS + the
  Carbon WC CDN scripts it needs) and a `<body>` of just `<main id="main"><bob-…></bob-…></main>`
  plus a few classic `<script>`s (shell + data + component).
- `shell.js` — classic script that **injects the shared shell** (dark header + Carbon rail side
  nav) into every page, marks the current page's nav link active, and wires the hamburger.
- `components/<name>.js` — one custom element per page (`<bob-dashboard>`, `<bob-notes>`,
  `<bob-tutorial>`) plus the shared `<bob-kpi-tile>`. Classic scripts; each renders its own markup
  (light DOM, so `styles.css` applies) and wires its behaviour in `connectedCallback()`.
- `data/<name>.js` — sample data as a JS global (`window.BOB_METRICS`, `window.BOB_NOTES`).
- `styles.css` — layout + the g100 tokens that make the header/rail dark.
- `carbon-reference.md` — **the Carbon cheat-sheet**: every component's CDN URL + `<cds-*>`
  element names, and the design guidance (themes, layering, spacing, type). Consult before
  reaching for a component or a token.

## How to add a new page

1. Create `components/myview.js` — a classic-script custom element (no `import`/`export`):
   ```js
   class BobMyView extends HTMLElement {
     connectedCallback() {
       if (this._rendered) return
       this._rendered = true
       this.innerHTML = `<header class="page-head"><h1>My View</h1></header> …`
       // …read data from a window.BOB_* global, wire events, etc.
     }
   }
   customElements.define('bob-myview', BobMyView)
   ```
2. Create `myview.html` — copy an existing page; in `<body>` put `<main id="main"><bob-myview
   class="view"></bob-myview></main>`, then the classic scripts (`shell.js`, any `data/*.js`, the
   Carbon WC CDN `<script type="module">`s it needs, and `components/myview.js`).
3. Add the page to the nav: append `{ href: 'myview.html', label: 'My View', icon: '<path …/>' }`
   to the `NAV` array in `shell.js` (grab the icon from `carbon-reference.md`).

## Conventions

- **Components:** prefer Carbon Web Components (`cds-tile`, `cds-button`, `cds-tag`, `cds-table`,
  `cds-text-input`, `cds-code-snippet`, …). Load the matching CDN script for each — names and
  URLs are in [`carbon-reference.md`](carbon-reference.md).
- **Charts:** Carbon Charts vanilla classes — `new LineChart(el, { data, options })` (also
  `DonutChart`, `SimpleBarChart`). Use `theme: 'white'` and `height: '20rem'`. Get the classes via
  `const { LineChart } = await import('https://esm.sh/@carbon/charts@1.27.11')`.
- **Theme & layering:** Gray 10 theme — a gray-10 (`#f4f4f4`) page with white (`layer-01`) cards.
- **Type:** Carbon scale. Page titles are `heading-05` (2rem / weight **400**). Carbon headings
  are light, not bold.
- **Spacing & units:** use **rem** on the 8px scale (`0.5rem`, `1rem`, `1.5rem`, `2rem`) — never `px`.
- **Data:** put sample data in `data/<name>.js` as a `window.BOB_*` global and read it in the
  component — never `fetch()` (that breaks `file://`).
- **New pages are components:** add a `components/<name>.js` custom element + its `.html` page (see
  *How to add a new page* above) rather than piling markup into one file.

## What we're building right now

A **marketing dashboard** — see [`marketing-dashboard-plan.md`](marketing-dashboard-plan.md) for
the plain-language plan (the goal, the user journey, and what's on the page). Build it as a new
`<bob-*>` component, following the steps on the **Tutorial** page.
