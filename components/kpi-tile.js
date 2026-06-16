// <bob-kpi-tile label="…" value="…"> — a Carbon tile showing a small gray label above a large,
// light-weight numeral. Shared by the dashboard's KPI row. Renders into the light DOM so the
// global .kpi-label / .kpi-value styles (styles.css) apply.
class BobKpiTile extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <cds-tile>
        <div class="kpi-label">${this.getAttribute('label') ?? ''}</div>
        <div class="kpi-value">${this.getAttribute('value') ?? ''}</div>
      </cds-tile>`
  }
}
customElements.define('bob-kpi-tile', BobKpiTile)
