# Launch

## Two weeks before

- Domain and DNS moved, certificates issued, canonical host decided.
- Legal pages written and reviewed: privacy, terms, cookies if any are set.
- Analytics chosen, installed, and checked for what it does to consent.
- Backups configured and one restore practised. An untested backup is a hope.
- Error tracking and an uptime check, with an alert that reaches a human.
- Every third-party account owned by the client, not by the builder.

## The week of

- Freeze the design system. Copy and content can still change.
- Run every gate in `playbook/09-quality-gates.md` on every page.
- Check the site on a real phone, on mobile data, not only in a simulator.
- Redirects from every old URL that matters, with a list kept in the repository.
- `robots.txt` and a sitemap, and the staging site closed to indexing.
- Search Console and any business listings updated to the new address.

## The day

- Deploy in the morning, not the evening.
- Watch errors for an hour.
- Check the primary action end to end on the live site: a real enquiry, a real
  test order, a real sign-in.
- Keep the previous version deployable for a week.

## The week after

- Read what people actually did: the primary action, the pages nobody reached,
  the searches with no results.
- Fix the top three friction points before adding anything new.
- Write the handover: what is current, what is history, what is open, and who
  owns each open question.

## Handover contents

| Item | Where it lives |
| --- | --- |
| How to run and deploy it | The rules file |
| Why it is built this way | The blueprint's decisions |
| What is deliberately not built | The blueprint's post-launch section |
| Accounts and who owns them | A private document, never the repository |
| What to do when something breaks | A short runbook with the three likely failures |
