// <bob-dashboard> — the KPI row + three Carbon Charts, all from data/metrics.json (no backend).
// Renders into the light DOM so the page's .kpis / .grid / .chart styles and the gray-10 layer
// tokens cascade in. Charts import from the '@carbon/charts' import-map entry in index.html.
import { DonutChart, LineChart, SimpleBarChart } from '@carbon/charts'
import './kpi-tile.js'

const CHART_OPTS = { theme: 'white', height: '20rem' }

const KPIS = [
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
        <cds-tag type="blue" size="sm">Static JSON · no backend</cds-tag>
      </header>
      <p class="sub">Carbon Charts rendered from <code>data/metrics.json</code> — no server involved.</p>

      <div class="kpis">
        ${KPIS.map((k) => `<bob-kpi-tile label="${k.label}" value="${k.value}"></bob-kpi-tile>`).join('')}
      </div>

      <div class="grid">
        <cds-tile class="col-full"><div class="chart" data-chart="line"></div></cds-tile>
        <cds-tile><div class="chart" data-chart="donut"></div></cds-tile>
        <cds-tile><div class="chart" data-chart="bar"></div></cds-tile>
      </div>`
    this.renderCharts().catch((err) => console.error('dashboard:', err))
  }

  async renderCharts() {
    const res = await fetch('./data/metrics.json')
    if (!res.ok) throw new Error(`metrics.json: ${res.status}`)
    const metrics = await res.json()

    new LineChart(this.querySelector('[data-chart="line"]'), {
      data: metrics.requests,
      options: {
        ...CHART_OPTS,
        title: 'Inference requests by provider',
        axes: {
          bottom: { title: 'Day', mapsTo: 'key', scaleType: 'labels' },
          left: { title: 'Requests', mapsTo: 'value', scaleType: 'linear' },
        },
      },
    })

    new DonutChart(this.querySelector('[data-chart="donut"]'), {
      data: metrics.split,
      options: { ...CHART_OPTS, title: 'Where inference ran', donut: { center: { label: 'Requests' } } },
    })

    new SimpleBarChart(this.querySelector('[data-chart="bar"]'), {
      data: metrics.latency,
      options: {
        ...CHART_OPTS,
        title: 'Median tokens / second',
        axes: {
          left: { mapsTo: 'group', scaleType: 'labels' },
          bottom: { title: 'tokens/s', mapsTo: 'value' },
        },
      },
    })
  }
}
customElements.define('bob-dashboard', BobDashboard)
