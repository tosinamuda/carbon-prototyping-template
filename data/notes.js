// Notes-table data as a plain global array — no fetch(), so the page also works from file://.
window.BOB_NOTES = [
  {
    title: 'Kickoff',
    content: 'Team aligned on the roadmap; everyone is excited.',
    sentiment: 'positive',
    tags: ['team alignment', 'roadmap', 'kickoff'],
  },
  {
    title: 'Q3 retro',
    content: 'The launch slipped two weeks but beta feedback was strong.',
    sentiment: 'positive',
    tags: ['retro', 'launch', 'beta'],
  },
  {
    title: 'Incident review',
    content: 'The deploy failed twice and the on-call engineer was frustrated.',
    sentiment: 'negative',
    tags: ['incident', 'deploy', 'pipeline'],
  },
  {
    title: 'Weekly sync',
    content: 'Status unchanged; no blockers reported this week.',
    sentiment: 'neutral',
    tags: ['status', 'sync'],
  },
]
