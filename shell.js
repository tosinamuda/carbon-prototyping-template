// Shared app shell for every page (classic script — works from file://). It injects the dark
// header + the Carbon rail side nav, marks the current page active, and wires the hamburger.
// Each page is its own HTML file, so the nav links are real <a href>s (the browser navigates);
// there is no client-side router.
;(function () {
  const NAV = [
    {
      href: 'index.html',
      label: 'Home',
      icon: '<path d="M11 24H21V26H11z"/><path d="M13 28H19V30H13z"/><path d="M16,2A10,10,0,0,0,6,12a9.19,9.19,0,0,0,3.46,7.62c1,.93,1.54,1.46,1.54,2.38h2c0-1.84-1.11-2.87-2.19-3.86A7.2,7.2,0,0,1,8,12a8,8,0,0,1,16,0,7.2,7.2,0,0,1-2.82,6.14c-1.07,1-2.18,2-2.18,3.86h2c0-.92.53-1.45,1.54-2.39A9.18,9.18,0,0,0,26,12,10,10,0,0,0,16,2Z"/>',
    },
    {
      href: 'dashboard.html',
      label: 'Dashboard',
      icon: '<path d="M24 21H26V26H24z"/><path d="M20 16H22V26H20z"/><path d="M11,26a5.0059,5.0059,0,0,1-5-5H8a3,3,0,1,0,3-3V16a5,5,0,0,1,0,10Z"/><path d="M28,2H4A2.002,2.002,0,0,0,2,4V28a2.0023,2.0023,0,0,0,2,2H28a2.0027,2.0027,0,0,0,2-2V4A2.0023,2.0023,0,0,0,28,2Zm0,9H14V4H28ZM12,4v7H4V4ZM4,28V13H28.0007l.0013,15Z"/>',
    },
    {
      href: 'notes.html',
      label: 'Notes data',
      icon: '<path d="M29,5a2,2,0,0,0-2-2H5A2,2,0,0,0,3,5V27a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2ZM27,5V9H5V5Zm0,22H5V23H27Zm0-6H5V17H27Zm0-6H5V11H27Z"/>',
    },
    {
      href: 'tutorial.html',
      label: 'Tutorial',
      icon: '<path d="M26,30H24V27a5.0059,5.0059,0,0,0-5-5H13a5.0059,5.0059,0,0,0-5,5v3H6V27a7.0082,7.0082,0,0,1,7-7h6a7.0082,7.0082,0,0,1,7,7Z"/><path d="M5,6A1,1,0,0,0,4,7v9H6V7A1,1,0,0,0,5,6Z"/><path d="M4,2V4H9v7a7,7,0,0,0,14,0V4h5V2Zm7,2H21V7H11Zm5,12a5,5,0,0,1-5-5V9H21v2A5,5,0,0,1,16,16Z"/>',
    },
    {
      href: 'ibm-landing.html',
      label: 'IBM landing',
      icon: '<path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"/><path d="M20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"/>',
    },
  ]

  const current = location.pathname.split('/').pop() || 'index.html'
  const icon = (paths) =>
    `<svg slot="title-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="currentColor">${paths}</svg>`

  const links = NAV.map(
    (n) =>
      `<cds-side-nav-link href="${n.href}"${n.href === current ? ' active' : ''}>${icon(n.icon)}${n.label}</cds-side-nav-link>`,
  ).join('')

  document.body.insertAdjacentHTML(
    'afterbegin',
    `<cds-header aria-label="Bob Builder Template">
      <cds-header-menu-button button-label-active="Collapse menu" button-label-inactive="Expand menu"></cds-header-menu-button>
      <cds-header-name href="index.html">Bob Builder Template</cds-header-name>
    </cds-header>
    <cds-side-nav aria-label="Side navigation" collapse-mode="rail">
      <cds-side-nav-items>${links}</cds-side-nav-items>
    </cds-side-nav>`,
  )

  // The side nav is Carbon's "rail": a 3rem icon rail that expands to a 16rem labelled panel
  // (overlaying the content) when it has the `expanded` attribute. The hamburger toggles that.
  // Carbon mirrors `expanded` onto the button as an ✕, so a MutationObserver strips `active` the
  // moment it's added — the control stays a hamburger in both states.
  const button = document.querySelector('cds-header-menu-button')
  const sideNav = document.querySelector('cds-side-nav')
  if (button && sideNav) {
    new MutationObserver(() => {
      if (button.hasAttribute('active')) button.removeAttribute('active')
    }).observe(button, { attributes: true, attributeFilter: ['active'] })
    button.addEventListener('click', () => sideNav.toggleAttribute('expanded'))
  }
})()
