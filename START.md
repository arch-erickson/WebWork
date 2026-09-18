# START

The script an agent follows when someone says "build me a website". Read it top
to bottom. Do not skip ahead to design: every later phase reads what the
earlier ones wrote down.

---

## Phase 0 — Ask, before anything exists

Work through `intake/00-interview.md`. Ask in small groups, not as one wall of
questions, and stop when an answer makes a later question pointless. Fifteen
answers are enough to start; the rest can be marked unknown and revisited.

Write the answers to `docs/intake.md` in the project, in the person's own
words. Add the date. Never paraphrase a constraint into something softer than
they said it.

**Do not proceed until you can answer these five:**

1. What is this site for, in one sentence, and what does a good visit end with?
2. Who reads it, from where, on what device, in what language?
3. What is the content: how many items, who writes them, how often do they change?
4. Does it take money, hold accounts, or store anything about a person?
5. Who maintains it after launch, and how technical are they?

## Phase 1 — Write the blueprint

Generate `docs/blueprint.md` from `templates/blueprint.md`, keeping only the
sections the answers justify. A brochure site does not need a checkout
section; a shop does not need a 3D budget section unless it has 3D.

Every architecture decision gets a number, a date, what it does, why it was
chosen, what it costs, and when it should be replaced. Every unknown gets an
ID, who owns it, and what it blocks.

The blueprint is not a document you write once. Every later phase amends it,
and the date on the amendment is part of the record.

## Phase 2 — Ground the project

Follow `playbook/01-foundations.md`:

- repository, `.gitignore`, branch rules
- `CLAUDE.md` from `templates/CLAUDE.md`, edited to this project
- `COORDINATION.md` if more than one agent or person will write code, with a
  named lead (`playbook/11-working-with-agents.md`)
- the verification harness from `scripts/verify.mjs`, running before any design
  exists, so the first screenshot is the baseline
- the empty design system: token file, component module, build script

Run the scaffold: `node WebWork/scripts/new-project.mjs --answers docs/intake.md`

## Phase 3 — Design outward from one page

Follow `playbook/00-order-of-work.md`. In short:

1. Type scale and one typeface pairing, checked at 320px and 1920px.
2. Colour: ink, paper, one accent, and the states. Contrast checked, not assumed.
3. Spacing scale and the page frame (max width, gutters, section rhythm).
4. **One page, end to end**, the page that matters most: usually the thing being
   sold or shown. Build it with real content, not lorem.
5. Extract from that page every element that will appear again. Those become
   the first components.
6. Motion last, and sparingly: what moves, how fast, and what never moves.

## Phase 4 — Make it real

In this order, skipping anything the intake ruled out:

| Step | Guide |
| --- | --- |
| Content model and sample data | `playbook/05-content-model.md` |
| Media pipeline | `playbook/06-media.md` |
| Data and accounts | `playbook/07-data-and-accounts.md` |
| Messages, languages, printable documents | `playbook/07b-messages-and-documents.md` |
| Build and deploy, two environments | `playbook/08-build-and-deploy.md` |
| Quality gates | `playbook/09-quality-gates.md` |
| Launch | `playbook/10-launch.md` |

## Phase 5 — Hand over

Whoever comes next, human or agent, needs one entry point: what is current,
what is history, what is still open, and who owns each open question. Use
`templates/handoff.md`. Archive anything superseded rather than deleting it,
with a line saying what replaced it.

---

## How to behave throughout

- **Build, then look.** After every visual change, render the page and look at
  it. Measure what you claim: widths, gaps, contrast, load.
- **One definition.** Before writing markup, search for the component. If it
  half exists, extend it with a parameter.
- **Say what is not done.** An honest "this is mocked, the server does not
  exist yet" is worth more than a demo that implies otherwise.
- **Keep the record current.** When a decision changes, amend the blueprint in
  the same commit as the code.
