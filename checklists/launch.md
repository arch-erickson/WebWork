# Launch checklist

Tick these, do not skim them.

## Ownership
- [ ] Domain in the client's account, not the builder's
- [ ] Hosting, analytics, email, payment and social accounts owned by the client
- [ ] A second administrator exists on every critical account
- [ ] Secrets stored in the platform, not in the repository, not in chat

## Keys and domain
- [ ] Every secret created by the owner, stored in the platform, listed by name in a handoff
- [ ] The site address changed in its one setting; sign-in callbacks, bot checks, access rules and payment callbacks updated
- [ ] Email DNS records in place and a real message received in two mail apps
- [ ] The preview address redirects to the domain, and the preview is no longer indexed
- [ ] The payment provider tested in its sandbox, including a lost or late reply

## Correctness
- [ ] Every page passes the gates in `playbook/09-quality-gates.md`
- [ ] The primary action completed end to end on the live site
- [ ] Forms reach a real inbox that someone reads
- [ ] 404 and 500 pages exist and offer a way back
- [ ] Every message previewed in every language; no untranslated sentence left
- [ ] Receipts and other printable documents printed once on real paper
- [ ] Redirects from every old URL that matters

## Safety
- [ ] Staging closed to the public and to search engines
- [ ] Backups configured, and one restore practised
- [ ] Error tracking and an uptime check that reaches a human
- [ ] Rate limits on anything that sends a message or costs money
- [ ] Nothing sensitive in logs

## Legal and privacy
- [ ] Privacy notice matching what the site actually collects
- [ ] Consent handled for anything third-party that sets cookies
- [ ] Terms, returns and delivery if money changes hands
- [ ] Contact details and company identification where the law requires them

## Handover
- [ ] The rules file explains how to run, build and deploy
- [ ] The blueprint explains why, including what was deliberately not built
- [ ] A one-page runbook for the three most likely failures
- [ ] Someone other than the builder has deployed once, successfully
