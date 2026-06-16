# AGENTS.md — Carbon Web Components demo

Context for an AI coding assistant working in **this folder**. The person using you is
**non-technical** — they will not install tools, run a bundler, or debug a build. Everything
must keep working by just opening the page in a browser.

## What this is

A small IBM Carbon Design System app built with **Carbon Web Components** (the `<cds-*>` custom
elements). It runs as **plain HTML + one JS module + one CSS file** — there is **no React, no
`npm install`, no bundler, and no build step**.

## Hard rules — do not break these

- **No build tooling.** Do not add `package.json`, npm, Vite, webpack, TypeScript, or any
  framework. If a task seems to need them, find a no-build way instead.
- **Runs from static files.** It must work when served by any static file server
  (`python3 -m http.server 4321`). No compile step, ever.
- **Load libraries from a CDN**, never from `node_modules`:
  - Carbon Web Components — one self-registering script per component:
    `https://1.www.s81c.com/common/carbon/web-components/version/v2.56.0/<name>.min.js`
    — the full list of `<name>`s and which `<cds-*>` elements each provides is in
    [`carbon-reference.md`](carbon-reference.md). **Check there first — don't guess a URL.**
  - Carbon Charts (vanilla) — via the import map in `index.html`, mapping `@carbon/charts`
    to `https://esm.sh/@carbon/charts@1.27.11`, used in `app.js`.
  - transformers.js (the in-browser model) — imported from `https://esm.sh/...` in `chat-worker.js`.
- **Vanilla JavaScript only** — ES modules, no transpiler. Keep `app.js` plain JS.

## Files

- `index.html` — all markup: the CDN `<script>`s, the import map, the UI shell (dark header +
  side nav), and one `<section class="view">` per page.
- `app.js` — all behaviour: nav switching, the WebGPU chat, chart rendering, data fetching.
- `styles.css` — layout + the g100 tokens that make the header/side nav dark.
- `chat-worker.js` — web worker running Granite 4.0 in the browser.
- `data/*.json` — sample data, loaded with `fetch()`.
- `carbon-reference.md` — **the Carbon cheat-sheet**: every component's CDN URL + `<cds-*>`
  element names, and the design guidance (themes, layering, spacing, type). Consult before
  reaching for a component or a token.

## How to add a new page (view)

1. In `index.html`, add a side-nav link:
   `<cds-side-nav-link data-view="myview" href="#myview">My View</cds-side-nav-link>`
2. Add the content: `<section id="view-myview" class="view" hidden> … </section>`
3. In `app.js`, register it in the `views` map inside `wireNav()`:
   `myview: document.getElementById('view-myview')`

The side nav already toggles each view's `hidden` attribute.

## Conventions

- **Components:** prefer Carbon Web Components (`cds-tile`, `cds-button`, `cds-tag`, `cds-table`,
  `cds-text-input`, `cds-code-snippet`, …). Load the matching CDN script for each — names and
  URLs are in [`carbon-reference.md`](carbon-reference.md).
- **Charts:** Carbon Charts vanilla classes — `new LineChart(el, { data, options })` (also
  `DonutChart`, `SimpleBarChart`). Use `theme: 'white'` and `height: '20rem'`.
- **Theme & layering:** Gray 10 theme — a gray-10 (`#f4f4f4`) page with white (`layer-01`) cards.
- **Type:** Carbon scale. Page titles are `heading-05` (2rem / weight **400**). Carbon headings
  are light, not bold.
- **Spacing & units:** use **rem** on the 8px scale (`0.5rem`, `1rem`, `1.5rem`, `2rem`) — never `px`.
- **Data:** put sample data in `data/<name>.json` and `fetch()` it in `app.js`.

## What we're building right now

A **marketing dashboard** — see [`marketing-dashboard-plan.md`](marketing-dashboard-plan.md) for
the plain-language plan (the goal, the user journey, and what's on the page). Build it as a new
view, following the steps on the **Tutorial** page.
