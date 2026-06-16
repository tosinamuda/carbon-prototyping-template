// Pure-vanilla app: no framework, no build, no backend. Data comes from local JSON files;
// charts come from Carbon Charts (loaded via the import map); the UI is Carbon Web Components.
import { DonutChart, LineChart, SimpleBarChart } from '@carbon/charts'

const CHART_OPTS = { theme: 'white', height: '20rem' }

async function loadJSON(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

function sentimentType(sentiment) {
  if (sentiment === 'positive') return 'green'
  if (sentiment === 'negative') return 'red'
  return 'gray'
}

async function renderDashboard() {
  const metrics = await loadJSON('./data/metrics.json')

  new LineChart(document.getElementById('chart-line'), {
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

  new DonutChart(document.getElementById('chart-donut'), {
    data: metrics.split,
    options: {
      ...CHART_OPTS,
      title: 'Where inference ran',
      donut: { center: { label: 'Requests' } },
    },
  })

  new SimpleBarChart(document.getElementById('chart-bar'), {
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

async function renderNotesTable() {
  const notes = await loadJSON('./data/notes.json')
  await customElements.whenDefined('cds-table-row')
  const body = document.getElementById('notes-body')

  for (const note of notes) {
    const row = document.createElement('cds-table-row')

    const titleCell = document.createElement('cds-table-cell')
    titleCell.textContent = note.title

    const sentimentCell = document.createElement('cds-table-cell')
    if (note.sentiment) {
      const tag = document.createElement('cds-tag')
      tag.setAttribute('type', sentimentType(note.sentiment))
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

// Side-nav view switching — no router, just show/hide sections.
function wireNav() {
  const views = {
    dashboard: document.getElementById('view-dashboard'),
    chat: document.getElementById('view-chat'),
    data: document.getElementById('view-data'),
    tutorial: document.getElementById('view-tutorial'),
  }
  const links = document.querySelectorAll('cds-side-nav-link[data-view]')

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const target = link.dataset.view
      for (const [name, section] of Object.entries(views)) {
        section.hidden = name !== target
      }
      links.forEach((l) => l.toggleAttribute('active', l === link))
    })
  })
}

// Hamburger ↔ side nav. The nav starts open, so the button starts "active" (showing an X).
function wireMenuButton() {
  const button = document.querySelector('cds-header-menu-button')
  const sideNav = document.querySelector('cds-side-nav')
  if (!button || !sideNav) return

  button.setAttribute('active', '')
  button.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('nav-collapsed')
    button.toggleAttribute('active', !collapsed)
    sideNav.toggleAttribute('expanded', !collapsed)
  })
}

// In-browser WebGPU chat — drives chat-worker.js (transformers.js from esm.sh). The model
// loads lazily on the "Load model" click, and replies stream token-by-token into bubbles.
function wireChat() {
  const intro = document.getElementById('chat-intro')
  const loadBtn = document.getElementById('chat-load')
  const loading = document.getElementById('chat-loading')
  const progress = document.getElementById('chat-progress')
  const composer = document.getElementById('chat-composer')
  const input = document.getElementById('chat-input')
  const sendBtn = document.getElementById('chat-send')
  const messagesEl = document.getElementById('chat-messages')
  if (!loadBtn) return

  if (!('gpu' in navigator)) {
    intro.innerHTML =
      '<cds-inline-notification kind="error" low-contrast hide-close-button ' +
      'title="WebGPU not available" subtitle="Open this page in a recent Chrome or Edge."></cds-inline-notification>'
    return
  }

  let worker = null
  let busy = false
  const history = []
  let assistantText = ''
  let assistantBubble = null

  function addMessage(role, text) {
    const wrap = document.createElement('div')
    wrap.className = `chat-msg ${role}`
    const label = document.createElement('div')
    label.className = 'chat-msg-label'
    label.textContent = role === 'user' ? 'You' : 'Granite'
    const bubble = document.createElement('div')
    bubble.className = 'chat-bubble'
    bubble.textContent = text
    wrap.append(label, bubble)
    messagesEl.appendChild(wrap)
    messagesEl.scrollTop = messagesEl.scrollHeight
    return bubble
  }

  loadBtn.addEventListener('click', () => {
    intro.hidden = true
    loading.hidden = false
    worker = new Worker('./chat-worker.js', { type: 'module' })
    worker.onmessage = (e) => {
      const m = e.data
      if (m.type === 'progress') {
        progress.setAttribute('value', String(m.progress))
        progress.setAttribute('helper-text', m.file || 'Downloading…')
      } else if (m.type === 'ready') {
        loading.hidden = true
        composer.hidden = false
        sendBtn.removeAttribute('disabled')
      } else if (m.type === 'token') {
        assistantText += m.text
        if (assistantBubble) assistantBubble.textContent = assistantText
        messagesEl.scrollTop = messagesEl.scrollHeight
      } else if (m.type === 'done') {
        history.push({ role: 'assistant', content: assistantText })
        busy = false
        sendBtn.removeAttribute('disabled')
      } else if (m.type === 'error') {
        loading.hidden = true
        addMessage('assistant', `⚠️ ${m.error}`)
        busy = false
      }
    }
    worker.postMessage({ type: 'load' })
  })

  function send() {
    const text = (input.value || '').trim()
    if (!text || busy || !worker) return
    addMessage('user', text)
    history.push({ role: 'user', content: text })
    assistantText = ''
    assistantBubble = addMessage('assistant', '')
    busy = true
    sendBtn.setAttribute('disabled', '')
    input.value = ''
    worker.postMessage({ type: 'generate', messages: history })
  }

  sendBtn.addEventListener('click', send)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      send()
    }
  })
}

// cds-code-snippet's `wrap-text` attribute doesn't reflect to the property in this build,
// so enable wrapping via the property once the component is defined — long prompts wrap
// instead of truncating to a single line.
function wireTutorial() {
  customElements.whenDefined('cds-code-snippet').then(() => {
    document.querySelectorAll('#view-tutorial cds-code-snippet').forEach((snippet) => {
      snippet.wrapText = true
    })
  })
}

wireNav()
wireMenuButton()
wireChat()
wireTutorial()
renderDashboard().catch((err) => console.error('dashboard:', err))
renderNotesTable().catch((err) => console.error('notes table:', err))
