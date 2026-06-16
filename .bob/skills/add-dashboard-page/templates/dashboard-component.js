// <bob-__SLUG__> — a metrics dashboard (4 KPI tiles + line/donut/bar Carbon Charts).
// Save as  components/__SLUG__.js  and replace every __SLUG__ / __TITLE__ / __SLUG_UPPER__.
// Classic script (no static import) so it works from file://. Reads window.BOB___SLUG_UPPER__
// (data/__SLUG__.js) and pulls Carbon Charts in with a dynamic import() of the CDN.
const __SLUG___CHART_OPTS = { theme: 'white', height: '20rem' }

const __SLUG___KPIS = [
  { label: 'KPI one', value: '0' },
  { label: 'KPI two', value: '0' },
  { label: 'KPI three', value: '0' },
  { label: 'KPI four', value: '0' },
]

class Bob__SLUG__ extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>__TITLE__</h1>
        <cds-tag type="blue" size="sm">Static JS data · no backend</cds-tag>
      </header>
      <p class="sub">Carbon Charts rendered from <code>data/__SLUG__.js</code> — no server, no fetch.</p>

      <div class="kpis">
        ${__SLUG___KPIS.map((k) => `<bob-kpi-tile label="${k.label}" value="${k.value}"></bob-kpi-tile>`).join('')}
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
      const d = window.BOB___SLUG_UPPER__

      new LineChart(this.querySelector('[data-chart="line"]'), {
        data: d.line,
        options: {
          ...__SLUG___CHART_OPTS,
          title: 'Trend over time',
          axes: {
            bottom: { title: 'Day', mapsTo: 'key', scaleType: 'labels' },
            left: { title: 'Value', mapsTo: 'value', scaleType: 'linear' },
          },
        },
      })

      new DonutChart(this.querySelector('[data-chart="donut"]'), {
        data: d.split,
        options: { ...__SLUG___CHART_OPTS, title: 'Breakdown', donut: { center: { label: 'Total' } } },
      })

      new SimpleBarChart(this.querySelector('[data-chart="bar"]'), {
        data: d.bars,
        options: {
          ...__SLUG___CHART_OPTS,
          title: 'By category',
          axes: { left: { mapsTo: 'group', scaleType: 'labels' }, bottom: { title: 'Value', mapsTo: 'value' } },
        },
      })
    } catch (err) {
      console.error('__SLUG__ charts:', err)
    }
  }
}
customElements.define('bob-__SLUG__', Bob__SLUG__)
