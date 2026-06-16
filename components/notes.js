// <bob-notes> — a Carbon data table built from the global BOB_NOTES (data/notes.js). Classic
// script (no fetch, no import) so it works from file://. Light DOM so the table inherits tokens.
const NOTES_SENTIMENT_TYPE = { positive: 'green', negative: 'red' }

class BobNotes extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>Notes data</h1>
        <cds-tag type="blue" size="sm">Static JS data · no backend</cds-tag>
      </header>
      <p class="sub">A Carbon data table built from <code>data/notes.js</code>.</p>

      <cds-tile>
        <cds-table>
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Title</cds-table-header-cell>
              <cds-table-header-cell>Sentiment</cds-table-header-cell>
              <cds-table-header-cell>Tags</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body></cds-table-body>
        </cds-table>
      </cds-tile>`
    this.fillRows()
  }

  async fillRows() {
    await customElements.whenDefined('cds-table-row')
    const body = this.querySelector('cds-table-body')

    for (const note of window.BOB_NOTES || []) {
      const row = document.createElement('cds-table-row')

      const titleCell = document.createElement('cds-table-cell')
      titleCell.textContent = note.title

      const sentimentCell = document.createElement('cds-table-cell')
      if (note.sentiment) {
        const tag = document.createElement('cds-tag')
        tag.setAttribute('type', NOTES_SENTIMENT_TYPE[note.sentiment] ?? 'gray')
        tag.textContent = note.sentiment
        sentimentCell.appendChild(tag)
      } else {
        sentimentCell.textContent = '—'
      }

      const tagsCell = document.createElement('cds-table-cell')
      for (const label of note.tags ?? []) {
        const tag = document.createElement('cds-tag')
        tag.setAttribute('type', 'blue')
        tag.textContent = label
        tagsCell.appendChild(tag)
      }

      row.append(titleCell, sentimentCell, tagsCell)
      body.appendChild(row)
    }
  }
}
customElements.define('bob-notes', BobNotes)
