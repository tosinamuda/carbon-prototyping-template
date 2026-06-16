// <bob-home> — the home / landing page. It introduces the workshop ("the training") and links out
// to the tutorial, the example dashboard, and the plan. Classic script, light DOM.
const HOME_CARDS = [
  {
    href: 'tutorial.html',
    eyebrow: 'Start here',
    title: 'Take the tutorial →',
    desc: 'Build the marketing dashboard step by step — copy each prompt, hand it to your AI assistant, watch it appear.',
  },
  {
    href: 'dashboard.html',
    eyebrow: 'See the goal',
    title: 'Explore the example dashboard →',
    desc: 'The finished kind of page you’ll build: KPI tiles and three Carbon Charts, from plain data.',
  },
  {
    href: 'doc.html?doc=marketing-dashboard-plan.md',
    eyebrow: 'Plain language',
    title: 'Read the plan →',
    desc: 'What we’re building, written for a non-technical reader — the goal, who it’s for, and a checklist.',
  },
]

class BobHome extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>Build a Carbon dashboard — by describing it</h1>
        <cds-tag type="purple" size="sm">Workshop</cds-tag>
      </header>
      <p class="sub">
        A hands-on IBM Carbon prototyping workshop. You’ll build a real marketing dashboard by
        <strong>telling an AI assistant what you want</strong> — no coding, no setup, no build step.
        Everything runs by just opening a file in your browser.
      </p>

      <div class="home-cards">
        ${HOME_CARDS.map(
          (c) => `
          <cds-clickable-tile href="${c.href}">
            <p class="start-num">${c.eyebrow}</p>
            <h3 class="step-title">${c.title}</h3>
            <p class="step-desc">${c.desc}</p>
          </cds-clickable-tile>`,
        ).join('')}
      </div>

      <h2 class="steps-heading">How the workshop works</h2>
      <ol class="steps">
        <li class="step"><div class="step-num">1</div><div class="step-body">
          <h3 class="step-title">Describe it</h3>
          <p class="step-desc">Each tutorial step gives you a plain-English prompt. You don’t write code — you describe the page.</p>
        </div></li>
        <li class="step"><div class="step-num">2</div><div class="step-body">
          <h3 class="step-title">Let the AI build it</h3>
          <p class="step-desc">Your assistant reads <code>AGENTS.md</code> + <code>carbon-reference.md</code> and adds the page using real IBM Carbon components.</p>
        </div></li>
        <li class="step"><div class="step-num">3</div><div class="step-body">
          <h3 class="step-title">Open it</h3>
          <p class="step-desc">Double-click the page (or serve the folder) and it just works — Carbon-styled, no install.</p>
        </div></li>
      </ol>`
  }
}
customElements.define('bob-home', BobHome)
