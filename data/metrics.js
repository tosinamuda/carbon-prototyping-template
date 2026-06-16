// Dashboard data as a plain global object — no fetch(), so the pages also work when opened
// directly from the filesystem (file://). Loaded as a classic <script> before the dashboard.
window.BOB_METRICS = {
  requests: [
    { group: 'Browser (WebGPU)', key: 'Day 1', value: 112 },
    { group: 'Browser (WebGPU)', key: 'Day 2', value: 131 },
    { group: 'Browser (WebGPU)', key: 'Day 3', value: 148 },
    { group: 'Browser (WebGPU)', key: 'Day 4', value: 165 },
    { group: 'Browser (WebGPU)', key: 'Day 5', value: 182 },
    { group: 'Browser (WebGPU)', key: 'Day 6', value: 200 },
    { group: 'Browser (WebGPU)', key: 'Day 7', value: 217 },
    { group: 'Ollama', key: 'Day 1', value: 89 },
    { group: 'Ollama', key: 'Day 2', value: 106 },
    { group: 'Ollama', key: 'Day 3', value: 121 },
    { group: 'Ollama', key: 'Day 4', value: 138 },
    { group: 'Ollama', key: 'Day 5', value: 156 },
    { group: 'Ollama', key: 'Day 6', value: 172 },
    { group: 'Ollama', key: 'Day 7', value: 190 },
    { group: 'watsonx', key: 'Day 1', value: 63 },
    { group: 'watsonx', key: 'Day 2', value: 80 },
    { group: 'watsonx', key: 'Day 3', value: 96 },
    { group: 'watsonx', key: 'Day 4', value: 112 },
    { group: 'watsonx', key: 'Day 5', value: 128 },
    { group: 'watsonx', key: 'Day 6', value: 144 },
    { group: 'watsonx', key: 'Day 7', value: 161 },
  ],
  split: [
    { group: 'Browser (WebGPU)', value: 412 },
    { group: 'Ollama', value: 318 },
    { group: 'watsonx', value: 196 },
  ],
  latency: [
    { group: 'Browser · 350M', value: 42 },
    { group: 'Ollama · micro', value: 78 },
    { group: 'watsonx · H-Small', value: 120 },
  ],
}
