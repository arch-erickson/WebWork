# The blueprint

One file that says what is being built, why, and what is still unknown. It is
written in phase 1 from the intake answers, and amended for the life of the
project. When someone asks "why is it like this", the blueprint answers, or it
is not doing its job.

## What it is not

Not a proposal, not marketing, and not a snapshot of a plan that stopped being
true in week two. If a decision changes, the blueprint changes in the same
commit as the code.

## Sections

Use `templates/blueprint.md`. Keep only what the project justifies; a portfolio
blueprint might be eight sections, a shop's twenty-five. The numbering stays
stable so that "section 16" means the same thing in a handoff a month later.

1. Executive summary: what this is, the five findings that matter, the path.
2. What exists today, honestly, including what looks finished and is not.
3. The recommended architecture, with a diagram.
4. The data model, if there is data.
5. The flows that carry money, identity or anything irreversible.
6. Security and privacy decisions.
7. Performance budget.
8. Deployment and environments.
9. Feature matrix: what exists, what is partial, what is missing, what is post-launch.
10. Risks, by severity, each with the fix and the effort.
11. The build plan in phases, with what each phase depends on.
12. Post-launch: what is deliberately not being built, and what would trigger it.
13. Decisions: numbered, dated, with the reason, the cost and the replacement trigger.
14. Questions and unknowns: numbered, owned, with what they block.

## How a decision is written

Every architecture decision gets a number that never changes:

```
AD7 · SQLite at the edge rather than a managed Postgres
What it does      One file-backed database, read and written only by the server.
Why we need it    500 records, one writer, read-heavy, cost near zero.
Why it belongs    Same platform as the hosting, no separate network hop or bill.
What it costs     No row level security; every query path needs its own test.
Right for now     At this size the database is never the bottleneck.
Replace when      Two writers need to scale independently, or data exceeds a few GB.
```

The last two lines are the ones people skip and the ones that matter in a year.

## How an unknown is written

```
U4  Does the payment provider accept foreign cards, and in which currency?
    Why it matters   The audience is international; the whole checkout assumes it.
    How to resolve   Written confirmation, then one sandbox and one real test.
    Owner            Owner
    Blocks           Phase 7
```

An unknown with no owner is a decision nobody is making.

## Keeping it alive

- Amend it in the same commit as the change it describes.
- Mark answered questions as answered, with the date and the answer, rather
  than deleting them. The trail is the value.
- When a section is superseded, say so at the top of the section and point to
  what replaced it.
- If the blueprint is published for reading (a page, a PDF), regenerate it from
  the source file rather than editing the published copy.

## The site map with a status on every page

The most useful single picture in a blueprint, once there is more than a
handful of pages: every page as a card, spaced apart, with arrows for the way
a visitor (or the staff) moves from one to the next. On each card:

- the page's name and file or route
- chips: design built, ported to the production app or not, and the state of
  the server work behind it (live, built but not deployed, partly built,
  missing, or none needed)
- two short lists: **backend built** and **remaining**

Leave out the links every page has (menu, search, footer), or the arrows turn
into a web. Draw actions by the staff that reach a client page (a payment link
sent, a note arriving in the inbox) as dashed arrows between the two areas.

Drive it from one data list, not from hand-placed text, and update that list
after every batch of work. Owners read this diagram to answer "how far along
are we"; commits and handoffs do not answer that for them.

## Publishing it

A long technical document is read more often when it is a page rather than a
file. Keep the source in the repository, generate the readable version, and
keep every diagram in the same visual language: white ground, one accent, real
labels rather than decorative boxes.

## One source, or it drifts

A generated document that is published from more than one place stops matching
its own sources, quietly. It happens like this: the page is generated from the
repository and published; later someone edits the published page directly, or
generates it from a second machine that has older sources. Now the live
document and the sources disagree, and the next person to rebuild wipes out
work nobody remembers doing.

Two habits prevent it:

- **Publish from one place only**, and say in the document itself where its
  sources are. If a second person has to publish, they pull first.
- **Read before you write.** Before republishing, fetch the live version and
  compare. If it is ahead of you, merge onto it rather than over it: take the
  live document as the base, reapply your changes, publish that.

The same applies to any long-lived artefact outside the repository: a deck, a
shared document, a diagram in a design tool.
