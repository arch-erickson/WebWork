# Build and deploy

## Two environments from the first deploy

Staging and production, with separate data, separate secrets and separate
domains, from the day anything is deployed. Retrofitting this after real data
exists is painful and sometimes impossible.

Staging is not public. Put it behind an access rule, a password, or an allow
list. A staging site indexed by a search engine outranks the real one often
enough to be a known hazard.

## The build

- One command builds everything, and it is written in the rules file with how
  long it takes.
- Generated output is either committed deliberately or ignored deliberately.
  Decide which, write it down, and do not have both.
- Cache busting: stamp the styles and scripts with a version or a hash. A site
  that looks broken for returning visitors after a deploy is almost always
  this.
- Never let a build with a type error or a failing test reach production.

## The pipeline, in the smallest useful form

1. On a pull request: install, type check, tests, build, and the harness.
2. On merge: deploy to staging automatically.
3. To production: a manual approval, and a migration step that runs before the
   code that needs it.
4. A rollback that takes seconds and is practised once before launch.

## Environments and secrets

- Secrets live in the platform's secret store, one set per environment, never
  in the repository and never in a variable that reaches the browser.
- Local development uses its own file, ignored by git, with fake values that
  make the failure obvious rather than silent.
- Write the full list of secrets in the blueprint: name, whether it is secret,
  and its value per environment. It saves an hour on every new machine.

## Domains

- The domain is a launch blocker that takes days, not minutes. Ask who owns it
  in the intake, and move DNS early.
- Decide the canonical host and redirect the other forms to it.
- HTTPS everywhere, including the staging host.

## What to measure after each deploy

- the page weight of the first screen
- the time to first render on a mid-range phone profile
- errors in the console, which should be zero
- the harness screenshots, compared to the last run

## Before the domain exists

The domain is often bought late. Do not wait for it:

- Build on the platform's free address (for example `name.account.workers.dev`),
  closed behind an access rule and marked noindex.
- **Keep the site address in one setting** (`APP_ORIGIN` or similar) that every
  link, sign-in redirect, email link and payment callback reads. Moving to the
  real domain is then one value and a redeploy.
- Queue and preview emails instead of sending them: reliable sending needs DNS
  records on a domain you control.
- Write the move as a checklist in a handoff now: attach the domain, change the
  one setting, update sign-in callbacks, bot-challenge hostnames, access
  rules and payment callbacks, add the email DNS records, redirect the old
  address.

A static preview of the design (GitHub Pages or similar) can keep running
alongside, unchanged, until the application replaces it.

## Who holds the keys

The owner creates every account and every secret. The agent writes down, in a
handoff, the exact name of each secret and variable, where it is used, and
whether it is secret. A secret pasted into chat, a commit or a prompt has to be
rotated.
