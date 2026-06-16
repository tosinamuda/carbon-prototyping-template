# Carbon Prototyping Template

A **no-build, no-backend** prototyping template for IBM Carbon. Open it with any static file
server and it runs — proving you can build a real Carbon Design System UI with **zero framework,
zero build step, and zero backend**:

- **Carbon Web Components** (`<cds-header>`, `<cds-side-nav>`, `<cds-table>`, `<cds-tile>`,
  `<cds-tag>` …) loaded as self-registering custom elements straight from IBM's CDN — no npm, no bundler.
- **Carbon Charts** (vanilla classes) loaded via an **import map** from a CDN.
- **In-browser AI** — IBM Granite 4.0 (350M) running fully on WebGPU via transformers.js (no server).
- **Data from static JSON** (`data/metrics.json`, `data/notes.json`) — fetched in the browser.

It's also a **workshop kit**: hand the folder to an AI coding assistant and the bundled docs
(`AGENTS.md`, `marketing-dashboard-plan.md`, `carbon-reference.md`) give it everything it needs to
build the demo with you — no install step.

## Run

It's just static files, but the JSON `fetch` needs HTTP (not `file://`), so serve the folder
with anything that serves static files:

```bash
python3 -m http.server 4321
# …or:
npx --yes serve -l 4321
```

Then open <http://localhost:4321>. (Needs internet on first load to fetch the Carbon CDN assets;
they're then cached by the browser.)

Because it's fully static, it also deploys to **GitHub Pages** (or any static host) with no build —
point Pages at the repo root.

## Files

```
.
├── index.html          UI shell with 4 views: Dashboard, Chat (WebGPU), Notes data, Tutorial
├── doc.html            Carbon-styled viewer that renders the Markdown docs in-browser
├── ibm-landing.html    a standalone IBM.com-style marketing page (masthead, leadspace, cards, footer)
├── app.js              vanilla module: nav/hamburger, charts + table, the WebGPU chat, tutorial wrap
├── chat-worker.js      module worker — Granite 4.0 (350M) on WebGPU via transformers.js (esm.sh)
├── styles.css          layout offsets + the g100 tokens that make the header/side nav dark
├── data/
│   ├── metrics.json    chart data (line / donut / bar)
│   └── notes.json      data-table rows
│
│   workshop kit (for building the demo with an AI assistant):
├── AGENTS.md                   project rules & conventions for an AI coding assistant
├── marketing-dashboard-plan.md plain-language "what to build" (goal · user journey · checklist)
└── carbon-reference.md         Carbon cheat-sheet: component CDN URLs + design guidance
```

`index.html` is the app shell with four nav views:
- **Dashboard** — Carbon Charts (KPI tiles + line/donut/bar) from `data/metrics.json`.
- **Chat (WebGPU)** — IBM Granite 4.0 (350M) running fully in the browser; `chat-worker.js`
  imports transformers.js from `esm.sh`. No backend.
- **Notes data** — a Carbon data table from `data/notes.json`.
- **Tutorial** — a step-by-step "build a marketing dashboard" guide with copyable prompts
  (`cds-code-snippet`), linking the workshop-kit docs.

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
- **Charts:** the `importmap` maps the bare specifier `@carbon/charts` to a CDN URL, so
  `app.js` can `import { LineChart } from '@carbon/charts'` and `new LineChart(el, { data, options })`
  with no bundler.
- **Docs:** `doc.html` fetches a Markdown file and renders it with `marked` (from `esm.sh`),
  styled with Carbon tokens — same no-build pattern as the charts.

To pin different versions, edit the CDN URLs in `index.html` (components) and the import map (charts).
