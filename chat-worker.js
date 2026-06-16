// In-browser Granite 4.0 (350M) on WebGPU — no backend, no bundler.
// transformers.js is loaded straight from esm.sh (a module worker can import from a URL).
// The model weights stream from the Hugging Face CDN on first load and are then cached.
import { pipeline, TextStreamer } from 'https://esm.sh/@huggingface/transformers@4.2.0'

const MODEL = 'onnx-community/granite-4.0-350m-ONNX-web'
let generator = null

self.addEventListener('message', async (event) => {
  const msg = event.data
  try {
    if (msg.type === 'load') {
      generator = await pipeline('text-generation', MODEL, {
        device: 'webgpu',
        dtype: 'q4',
        progress_callback: (p) => {
          if (p.status === 'progress') {
            self.postMessage({ type: 'progress', progress: Math.round(p.progress ?? 0), file: p.file ?? '' })
          }
        },
      })
      self.postMessage({ type: 'ready' })
      return
    }

    if (msg.type === 'generate') {
      const streamer = new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (text) => self.postMessage({ type: 'token', text }),
      })
      await generator(msg.messages, { max_new_tokens: 512, do_sample: false, streamer })
      self.postMessage({ type: 'done' })
    }
  } catch (err) {
    self.postMessage({ type: 'error', error: String(err && err.message ? err.message : err) })
  }
})
