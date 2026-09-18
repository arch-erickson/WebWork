# The order of work

Build in this order and each step has what it needs. Build out of order and you
will redo the step before.

```
ask → write down → ground → one page → components → the rest → data → deploy → gates → launch
```

## Why this order

**Tokens before pages.** Type scale, colour and spacing are the vocabulary. A
page designed before them invents its own values, and those values leak into
every later page.

**One page before all pages.** The page that carries the point of the site
(the piece, the project, the product) forces every real decision: how a title
behaves at three widths, what a price looks like when it is hidden, what
happens when the photograph is upright rather than square. Answer them once,
in one place.

**Components after that page, not before.** A component library designed in the
abstract is a guess. The same library extracted from a finished page is a
record of what was actually needed. Extract the second time you need something,
not the first.

**Content model before the interface that edits it.** You cannot design an
editor for a shape you have not settled.

**Data and accounts last of the structural work.** They are the most expensive
to change and the easiest to postpone. Everything above can be built against
sample data in one file.

**Gates before launch, not after.** Accessibility, performance and overflow
checks are cheap while the site is small and brutal once it is not.

## The spine, with the guide for each step

| # | Step | Done when | Guide |
| --- | --- | --- | --- |
| 1 | Intake | Five key questions answered in the project's own words | `intake/00-interview.md` |
| 2 | Blueprint | Decisions numbered, risks listed, unknowns owned | `playbook/02-blueprint.md` |
| 3 | Foundations | Repo, rules, harness, empty token and component files | `playbook/01-foundations.md` |
| 4 | Type and colour | Scale renders at 320 and 1920; contrast measured | `playbook/03-design-system.md` |
| 5 | The one page | Real content, three widths, no lorem | `playbook/03-design-system.md` |
| 6 | Components | Everything repeated has exactly one definition | `playbook/04-components.md` |
| 7 | The rest of the pages | Each one assembled from components | `playbook/04-components.md` |
| 8 | Content model | Sample data in one file, switch empties it | `playbook/05-content-model.md` |
| 9 | Media | Naming, sizes, framing rule, pipeline | `playbook/06-media.md` |
| 10 | Data and accounts | Only if the intake called for them | `playbook/07-data-and-accounts.md` |
| 10b | Messages, languages, documents | Every message previewed in every language; nothing untranslated | `playbook/07b-messages-and-documents.md` |
| 11 | Deploy | Two environments, cache busting, rollback | `playbook/08-build-and-deploy.md` |
| 12 | Gates | Contrast, keyboard, overflow, weight, console clean | `playbook/09-quality-gates.md` |
| 13 | Launch | Domain, analytics, backups, handover | `playbook/10-launch.md` |

## What to do when someone asks for a page out of order

They will. Build it, but build it from the tokens and components that exist,
and note in the blueprint what it borrowed. If it needed something new twice,
that thing is a component now.
