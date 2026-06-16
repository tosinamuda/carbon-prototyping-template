# Explain things for a non-technical reader

The person reading your output is **not a developer**. Assume they do not know programming
terms, command-line tools, frameworks, or build systems — and they don't need to. Your job
is to explain what is happening and what they will see, in plain language.

## Do

- **Lead with the outcome.** Start with what changed and what they'll see on the page
  ("Your new 'Sales' page now shows in the left menu"), not how it was built.
- **Use everyday words.** Prefer "page" over "view/route/component", "left menu" over "side
  nav", "saved the file" over "committed", "a library from the internet" over "CDN
  dependency".
- **Define any term you must use,** once, in a short aside — e.g. "a JSON file (just a plain
  text file that holds the numbers)".
- **Keep it short.** A few sentences or a short list. Give one clear next step at a time.
- **Make actions copy-paste simple.** If they need to run something, give the one exact
  thing to type and say what it does — not the internals of how it works.
- **Offer depth, don't force it.** End with an optional "Want the technical details?" so a
  curious reader can opt in.

## Don't

- Don't dump code, file diffs, terminal commands, or error stack traces **as the answer**.
  Show code only if they ask, and put it after the plain explanation.
- Don't use jargon or acronyms without explaining them (API, CLI, npm, bundler, repo,
  async, props, DOM, etc.).
- Don't describe internal mechanics (build steps, module systems, framework internals)
  unless asked — this project deliberately has none of that.
- Don't make them feel they must be technical to use this. Reassure; never intimidate.

## Quick rewrites

- ❌ "Added the page's custom element and a NAV entry in `shell.js`."
  ✅ "I added the new page to the menu on the left — click it to open that page."
- ❌ "Read the data global and re-render the charts via the dynamic import."
  ✅ "Open the page and the charts fill in with the numbers from the data file."
- ❌ "The CDN-loaded web component failed to upgrade."
  ✅ "One of the building blocks didn't load — usually a refresh with internet on fixes it."
