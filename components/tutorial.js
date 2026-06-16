// <bob-tutorial> — the "build a marketing dashboard" walkthrough: two "Start here" doc cards
// followed by the build steps, each with a copyable prompt (cds-code-snippet). The content is
// data-driven (START_CARDS + STEPS) so adding a step is a one-line edit. Light DOM so the
// .tutorial-start / .steps / .step styles apply.
const START_CARDS = [
  {
    num: 'Start here · 1',
    title: 'Read the plan',
    desc:
      `The plan describes this dashboard as a <strong>user journey</strong>, in plain language — ` +
      `it's how you tell an AI (or a developer) what to build, no code needed.`,
    links: [{ href: 'doc.html?doc=marketing-dashboard-plan.md', text: 'Read the plan →' }],
  },
  {
    num: 'Start here · 2',
    title: 'Point your AI at this folder',
    desc:
      `Open this folder in your AI coding assistant. It reads <strong>AGENTS.md</strong>, which ` +
      `tells it this is a Carbon Web Components project that runs as plain HTML — no install, no build.`,
    links: [
      { href: 'doc.html?doc=AGENTS.md', text: 'Read AGENTS.md →' },
      { href: 'doc.html?doc=carbon-reference.md', text: 'Carbon reference →' },
    ],
  },
]

const STEPS = [
  {
    title: 'Scaffold the Carbon shell',
    desc: `Start with a UI Shell: a dark header, a side navigation, and a content area on the Gray 10 theme (gray-10 page, white <code>layer-01</code> cards).`,
    prompt: `Create a single-page app shell using Carbon Web Components loaded from the CDN. Include a dark header titled "Marketing Dashboard", a left side navigation, and a content area. Use the Carbon Gray 10 theme: a gray-10 (#f4f4f4) page background with white (layer-01) cards, and IBM Plex Sans.`,
  },
  {
    title: 'Add the KPI row',
    desc: `Four summary tiles across the top, each a label plus a large light-weight number.`,
    prompt: `Add a row of four KPI tiles (cds-tile) at the top of the dashboard: Visitors (48.2K), Conversion rate (3.4%), Revenue ($82K), and Bounce rate (41%). Each tile shows a small gray label and a large 2.5rem light-weight number. Lay them out in a 4-column grid with 1rem gaps.`,
  },
  {
    title: 'Add the traffic line chart',
    desc: `A full-width trend of daily visitors split by channel, using Carbon Charts.`,
    prompt: `Add a full-width Carbon Charts line chart titled "Visitors by channel" showing daily visitors over the last 7 days for three groups: Organic, Paid, and Social. Use options theme "white" and height "20rem", with the bottom axis mapped to the day (scaleType labels) and the left axis to value.`,
  },
  {
    title: 'Add the traffic-source donut',
    desc: `A donut breaking down where sessions come from, with a center total.`,
    prompt: `Add a Carbon Charts donut chart titled "Sessions by source" with Organic 46%, Direct 24%, Paid 18%, and Social 12%. Show a center label with the total sessions. Place it as a half-width card next to the campaign chart.`,
  },
  {
    title: 'Add the campaign bar chart',
    desc: `A horizontal bar chart comparing conversions per campaign.`,
    prompt: `Add a horizontal Carbon Charts simple bar chart titled "Conversions by campaign" comparing four campaigns: Spring Sale, Newsletter, Retargeting, and Webinar. Map the left axis to the campaign name (scaleType labels) and the bottom axis to conversions.`,
  },
  {
    title: 'Load data from JSON — no backend',
    desc: `Move every chart's data into static JSON and fetch it in the browser.`,
    prompt: `Move all KPI and chart data into static JSON files under /data and load them with fetch() in a plain ES module. The dashboard must run with no backend and no build step — just static files served over HTTP.`,
  },
  {
    title: 'Polish with Carbon tokens',
    desc: `Apply Carbon's spacing, type, and layering so it reads as a real Carbon product.`,
    prompt: `Apply Carbon design tokens throughout: spacing-05 (16px) tile padding and grid gaps, the heading-05 type (2rem / weight 400) for the page title, body-02 for descriptions, and proper layering — a gray-10 page with white layer-01 cards. Use rem units, not px.`,
  },
]

class BobTutorial extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>Build a marketing dashboard</h1>
        <cds-tag type="purple" size="sm">Tutorial</cds-tag>
      </header>
      <p class="sub">
        No coding required. You'll <strong>describe</strong> what you want and let an AI assistant
        build it — step by step. Two short documents set it up; then you work through the prompts below.
      </p>

      <div class="tutorial-start">
        ${START_CARDS.map(
          (c) => `
          <cds-tile>
            <p class="start-num">${c.num}</p>
            <h3 class="step-title">${c.title}</h3>
            <p class="step-desc">${c.desc}</p>
            ${c.links
              .map((l) => `<a class="doc-link" href="${l.href}" target="_blank" rel="noopener">${l.text}</a>`)
              .join('')}
          </cds-tile>`,
        ).join('')}
      </div>

      <h2 class="steps-heading">Then build it, prompt by prompt</h2>
      <ol class="steps">
        ${STEPS.map(
          (s, i) => `
          <li class="step">
            <div class="step-num">${i + 1}</div>
            <div class="step-body">
              <h3 class="step-title">${s.title}</h3>
              <p class="step-desc">${s.desc}</p>
              <p class="prompt-label">Prompt to use</p>
              <cds-code-snippet type="multi">${s.prompt}</cds-code-snippet>
            </div>
          </li>`,
        ).join('')}
      </ol>`

    // cds-code-snippet's `wrap-text` attribute doesn't reflect to the property in this build, so
    // enable wrapping via the property once the component is defined — long prompts wrap instead
    // of truncating to one line.
    customElements.whenDefined('cds-code-snippet').then(() => {
      this.querySelectorAll('cds-code-snippet').forEach((s) => {
        s.wrapText = true
      })
    })
  }
}
customElements.define('bob-tutorial', BobTutorial)
