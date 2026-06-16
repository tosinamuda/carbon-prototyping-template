// <bob-chat> — IBM Granite 4.0 (350M) running fully in the browser on WebGPU via chat-worker.js
// (which loads transformers.js from esm.sh). The model loads lazily on the "Load model" click;
// replies stream token-by-token into chat bubbles. No backend, no API key.
class BobChat extends HTMLElement {
  connectedCallback() {
    if (this._rendered) return
    this._rendered = true
    this.innerHTML = `
      <header class="page-head">
        <h1>In-browser chat</h1>
        <cds-tag type="blue" size="sm">WebGPU · no backend</cds-tag>
      </header>
      <p class="sub">
        IBM Granite 4.0 Nano runs in your browser via transformers.js (loaded from
        <code>esm.sh</code>). Nothing leaves this device.
      </p>

      <cds-tile>
        <div id="chat-intro">
          <p>
            Run Granite 4.0 (350M) <strong>entirely in your browser</strong> via WebGPU — no
            backend, no API key. The model (~0.4&nbsp;GB) downloads once and is cached.
          </p>
          <cds-button id="chat-load">Load model</cds-button>
        </div>

        <div id="chat-loading" hidden>
          <cds-progress-bar id="chat-progress" label-text="Loading Granite 4.0 (350M)"
            helper-text="Downloading & initializing…" value="0" max="100"></cds-progress-bar>
        </div>

        <div id="chat-messages" class="chat-messages"></div>

        <div id="chat-composer" class="chat-composer" hidden>
          <cds-text-input id="chat-input" placeholder="Ask Granite anything…" hide-label>
            <span slot="label-text">Message</span>
          </cds-text-input>
          <cds-button id="chat-send" disabled>Send</cds-button>
        </div>
      </cds-tile>`
    this.wire()
  }

  wire() {
    const intro = this.querySelector('#chat-intro')
    const loadBtn = this.querySelector('#chat-load')
    const loading = this.querySelector('#chat-loading')
    const progress = this.querySelector('#chat-progress')
    const composer = this.querySelector('#chat-composer')
    const input = this.querySelector('#chat-input')
    const sendBtn = this.querySelector('#chat-send')
    const messagesEl = this.querySelector('#chat-messages')

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

    const addMessage = (role, text) => {
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
      worker = new Worker(new URL('../chat-worker.js', import.meta.url), { type: 'module' })
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

    const send = () => {
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
}
customElements.define('bob-chat', BobChat)
