// <bob-dashboard> — the KPI row + three Carbon Charts, from the global BOB_METRICS (data/metrics.js).
// Classic script (no static ES-module import) so it loads from file://; Carbon Charts is pulled in
// with a dynamic import() of the remote CDN module, which is allowed cross-origin (works on file://
// too). Renders into the light DOM so the page's .kpis / .grid / .chart styles apply.
const DASH_CHART_OPTS = { theme: 'white', height: '20rem' }

const DASH_KPIS = [
  { label: 'Total requests', value: '926' },
  { label: 'Providers', value: '3' },
  { label: 'Median tok/s', value: '80' },
  { label: 'Browser share', value: '44.5%' },
]

class BobDashboard extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>Dashboard</h1>
        <cds-tag type="blue" size="sm">Static JS data · no backend</cds-tag>
      </header>
      <p class="sub">Carbon Charts rendered from <code>data/metrics.js</code> — no server, no fetch.</p>

      <div class="kpis">
        ${DASH_KPIS.map((k) => `<bob-kpi-tile label="${k.label}" value="${k.value}"></bob-kpi-tile>`).join('')}
      </div>

      <div class="grid">
        <cds-tile class="col-full"><div class="chart" data-chart="line"></div></cds-tile>
        <cds-tile><div class="chart" data-chart="donut"></div></cds-tile>
        <cds-tile><div class="chart" data-chart="bar"></div></cds-tile>
      </div>`
    this.renderCharts()
  }

  async renderCharts() {
    try {
      const { LineChart, DonutChart, SimpleBarChart } = await import('https://esm.sh/@carbon/charts@1.27.11')
      const m = window.BOB_METRICS

      new LineChart(this.querySelector('[data-chart="line"]'), {
        data: m.requests,
        options: {
          ...DASH_CHART_OPTS,
          title: 'Inference requests by provider',
          axes: {
            bottom: { title: 'Day', mapsTo: 'key', scaleType: 'labels' },
            left: { title: 'Requests', mapsTo: 'value', scaleType: 'linear' },
          },
        },
      })

      new DonutChart(this.querySelector('[data-chart="donut"]'), {
        data: m.split,
        options: { ...DASH_CHART_OPTS, title: 'Where inference ran', donut: { center: { label: 'Requests' } } },
      })

      new SimpleBarChart(this.querySelector('[data-chart="bar"]'), {
        data: m.latency,
        options: {
          ...DASH_CHART_OPTS,
          title: 'Median tokens / second',
          axes: {
            left: { mapsTo: 'group', scaleType: 'labels' },
            bottom: { title: 'tokens/s', mapsTo: 'value' },
          },
        },
      })
    } catch (err) {
      console.error('dashboard charts:', err)
    }
  }
}
customElements.define('bob-dashboard', BobDashboard)
