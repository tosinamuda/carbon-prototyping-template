// Shell controller — the only app-wide behaviour. Each page is its own component (components/*.js)
// that renders + wires itself; this file just switches which one is visible and toggles the rail.

// Side-nav view switching — no router, just show/hide the page components.
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
      for (const [name, el] of Object.entries(views)) el.hidden = name !== target
      links.forEach((l) => l.toggleAttribute('active', l === link))
    })
  })
}

// The side nav is Carbon's "rail": a 3rem icon rail that the component expands to a 16rem labelled
// panel (overlaying the content) when it has the `expanded` attribute. The hamburger just toggles
// that. Carbon also mirrors `expanded` onto the menu button as an ✕, so a MutationObserver strips
// `active` the moment it's added — the control stays a hamburger in both states.
function wireMenuButton() {
  const button = document.querySelector('cds-header-menu-button')
  const sideNav = document.querySelector('cds-side-nav')
  if (!button || !sideNav) return

  new MutationObserver(() => {
    if (button.hasAttribute('active')) button.removeAttribute('active')
  }).observe(button, { attributes: true, attributeFilter: ['active'] })

  button.addEventListener('click', () => sideNav.toggleAttribute('expanded'))
}

wireNav()
wireMenuButton()
