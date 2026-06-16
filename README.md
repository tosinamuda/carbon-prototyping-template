# Carbon Prototyping Template

A **no-build, no-backend** prototyping template for IBM Carbon — a real Carbon Design System UI
with **zero framework, zero build step, and zero backend**, that you can open by **double-clicking
the HTML** (no server required):

- **Multi-page**: one real HTML file per page (`dashboard.html`, `notes.html`, `tutorial.html`) — a
  proper URL each. `index.html` redirects to the dashboard.
- **Carbon Web Components** (`<cds-header>`, `<cds-side-nav>`, `<cds-table>`, `<cds-tile>`,
  `<cds-tag>` …) loaded as self-registering elements straight from IBM's CDN — no npm, no bundler.
- **Carbon Charts** loaded with a dynamic `import()` from a CDN.
- **Data as plain JS** (`data/metrics.js`, `data/notes.js`) — JS globals, no `fetch()`, so it works
  from `file://` too.

It's also a **workshop kit**: hand the folder to an AI coding assistant and the bundled docs
(`AGENTS.md`, `marketing-dashboard-plan.md`, `carbon-reference.md`) give it everything it needs to
build the demo with you — no install step.

## Run

**Just open it.** Double-click `dashboard.html` (or open `file:///…/dashboard.html`). All our code
is classic scripts + JS-global data, so it runs straight from the filesystem — no server, no build.
(Needs internet, since Carbon + Charts load from their CDNs.)

To deploy or share a real URL, serve the folder with anything static:

```bash
python3 -m http.server 4321   # → http://localhost:4321
# …or:  npx --yes serve -l 4321
```

Because it's fully static, it also deploys to **GitHub Pages** with no build — point Pages at the
repo root. One caveat: the `doc.html` Markdown viewer *does* use `fetch()`, so the "Read the plan /
AGENTS.md" links on the Tutorial page only render when **served** (not from `file://`).

## Files

```
.
├── index.html          redirects to dashboard.html
├── dashboard.html      page: KPI row + 3 Carbon Charts
├── notes.html          page: a Carbon data table
├── tutorial.html       page: the "build it" walkthrough + copyable prompts
├── shell.js            injects the shared dark header + rail side nav into every page
├── components/         one custom element per page (small, self-contained, classic scripts)
│   ├── dashboard.js    <bob-dashboard> — KPI row + 3 Carbon Charts
│   ├── notes.js        <bob-notes>     — the Carbon data table
│   ├── tutorial.js     <bob-tutorial>  — the build-it walkthrough + prompts
│   └── kpi-tile.js     <bob-kpi-tile>  — shared KPI tile sub-component
├── data/
│   ├── metrics.js      chart data as a JS global (window.BOB_METRICS)
│   └── notes.js        table rows as a JS global (window.BOB_NOTES)
├── doc.html            Carbon-styled Markdown viewer (used by the Tutorial's doc links; needs serving)
├── ibm-landing.html    a standalone IBM.com-style marketing page (masthead, leadspace, cards, footer)
├── styles.css          layout offsets + the g100 tokens that make the header/rail dark
│
│   workshop kit (for building the demo with an AI assistant):
├── AGENTS.md                   project rules & conventions for an AI coding assistant
├── marketing-dashboard-plan.md plain-language "what to build" (goal · user journey · checklist)
└── carbon-reference.md         Carbon cheat-sheet: component CDN URLs + design guidance
```

The pages (each shares the rail nav via `shell.js`):
- **Dashboard** (`dashboard.html`) — Carbon Charts (KPI tiles + line/donut/bar) from `data/metrics.js`.
- **Notes data** (`notes.html`) — a Carbon data table from `data/notes.js`.
- **Tutorial** (`tutorial.html`) — a step-by-step "build a marketing dashboard" guide with copyable
  prompts (`cds-code-snippet`), linking the workshop-kit docs.

[`ibm-landing.html`](ibm-landing.html) is a separate page that recreates the **IBM.com look** — the
striped IBM wordmark, a gradient leadspace headline, Carbon arrow buttons, an IBM-style card group, and
a footer. Open it at <http://localhost:4321/ibm-landing.html>.

## Workshop kit — build it with an AI assistant

The point of the template is to *describe* what you want and let an AI assistant build it — no code:

1. **[`marketing-dashboard-plan.md`](marketing-dashboard-plan.md)** — the plan in plain language
   (the goal, who it's for, the user journey, and a checklist of what's on the page). It's also a
   reusable shape for describing *any* build to a non-technical audience.
2. **[`AGENTS.md`](AGENTS.md)** — the rules an assistant needs: Carbon Web Components, runs as plain
   HTML, no install, no build, load from CDN.
3. **[`carbon-reference.md`](carbon-reference.md)** — a Carbon cheat-sheet so the assistant never
   has to guess: every component's CDN URL + `<cds-*>` elements, plus the design tokens, themes,
   spacing, and type rules.

The **Tutorial** page renders all three (via `doc.html`) and walks through the build prompt by prompt.

## How it works (no build)

- **Components:** each `<script src=".../version/v2.56.0/<name>.min.js">` defines its `<cds-*>`
  custom elements as a side effect. They style themselves via Shadow DOM.
- **Dark header:** Carbon components read `--cds-*` design tokens (defaulting to the light theme).
  `styles.css` sets the g100 token values on `cds-header` so it renders dark — the standard Carbon
  pairing of a dark header over a white side nav.
- **Pages:** each `.html` page holds one custom element (`<bob-dashboard>` etc.) defined in
  `components/<name>.js` (a classic script) that renders itself into the light DOM. `shell.js`
  injects the shared header + rail nav into every page and marks the current link active. Nav links
  are real `<a href>`s — the browser navigates; no client-side router.
- **Charts:** `components/dashboard.js` pulls Carbon Charts in with a dynamic
  `import('https://esm.sh/@carbon/charts@1.27.11')` — works from a classic script, and from `file://`.
- **Runs from `file://`:** no local ES modules, no `fetch()` (data is JS globals in `data/*.js`),
  no Web Workers — only those are blocked when you open files directly. Remote CDN modules are
  CORS-enabled, so Carbon + Charts still load.
- **Docs:** `doc.html` fetches a Markdown file and renders it with `marked` (from `esm.sh`),
  styled with Carbon tokens — same no-build pattern as the charts.

To pin different versions, edit the CDN URLs in `index.html` (components) and the import map (charts).
