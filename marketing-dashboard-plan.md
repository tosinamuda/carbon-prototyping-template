# Marketing dashboard — what to build

> **For non-technical folks:** this is how you tell an AI assistant (or a developer) what you
> want — no code required. A good brief has five parts: the **goal**, **who it's for**, a
> **user journey** (how they'd actually use it), **what's on the screen**, and **how you'll
> know it's done**. Below is exactly that, filled in for our marketing dashboard. Reuse this
> shape for anything you want built.

---

## 1. The goal (one sentence)

Give our marketing manager a single screen that shows, at a glance, how our channels and
campaigns are performing — so they know what's working and where to spend next.

## 2. Who it's for

**Maya, a marketing manager.** She is not technical. Every morning she wants a 30-second read
on yesterday's performance before her team standup.

## 3. The user journey (a morning with the dashboard)

1. Maya opens the dashboard — it loads instantly, no login, no setup.
2. **Headline numbers** at the top tell her if yesterday was good: visitors, conversion rate,
   revenue, and bounce rate.
3. She glances at the **"Visitors by channel"** trend to see whether organic, paid, and social
   are growing or slipping across the week.
4. She checks **"Sessions by source"** to see where her traffic is actually coming from.
5. She reviews **"Conversions by campaign"** to see which campaign is pulling its weight.
6. She closes the laptop knowing where to focus the budget today.

## 4. What's on the page (a plain checklist)

Think of each line as a small "ticket" — a thing that should be there:

- [ ] A page titled **"Marketing dashboard."**
- [ ] **Four headline numbers** in a row: **Visitors**, **Conversion rate**, **Revenue**,
      **Bounce rate**.
- [ ] A **line chart — "Visitors by channel"** — daily visitors for the last 7 days, split into
      **Organic**, **Paid**, and **Social**.
- [ ] A **donut chart — "Sessions by source"** — the share from **Organic / Direct / Paid / Social**.
- [ ] A **bar chart — "Conversions by campaign"** — comparing a few named campaigns
      (e.g. Spring Sale, Newsletter, Retargeting, Webinar).
- [ ] Every number comes from **sample data files** — no sign-in, no server.

## 5. How we'll know it's done

- It opens in a browser with **no setup**.
- All four numbers and all three charts appear and look correct.
- It looks like a **clean, professional IBM Carbon product**, not a rough prototype.

---

## Notes for whoever builds it

- Build it inside this project — the technical conventions are in
  [`AGENTS.md`](AGENTS.md) (Carbon Web Components, runs as plain HTML, no install, no build).
- Made-up but believable numbers are fine — this is a demo.
- The **Tutorial** page walks through building this, prompt by prompt.
