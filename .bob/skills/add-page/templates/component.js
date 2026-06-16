// <bob-__SLUG__> — the __TITLE__ page. Save as  components/__SLUG__.js  and replace every
// __SLUG__ / __TITLE__. Classic script (no import/export) so it works from file://. Renders into
// the light DOM so styles.css applies. If the page shows data, read a window.BOB___SLUG__ global
// (loaded by data/__SLUG__.js) — never fetch().
class Bob__SLUG__ extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>__TITLE__</h1>
        <!-- optional chip:  <cds-tag type="blue" size="sm">Label</cds-tag>  (needs the tag script) -->
      </header>
      <p class="sub">One line describing what this page is for.</p>

      <div class="grid">
        <cds-tile class="col-full">
          <!-- Page content. Pick components from carbon-reference.md and load each one's <script>
               in the page <head>. e.g. a form → cds-form-group + cds-text-input + cds-button;
               a list → cds-table (data-table) or cds-structured-list. -->
          <p>Replace this with the page content.</p>
        </cds-tile>
      </div>`
  }
}
customElements.define('bob-__SLUG__', Bob__SLUG__)
