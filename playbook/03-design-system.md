# The design system, in the order it is decided

Nothing here is chosen in the abstract. Each step is decided by rendering it
and looking, at the smallest and the largest size you support.

## 1. Type scale, first

Pick one pairing and prove it before anything else: a voice face for headings
and a workhorse for text, or one family in two weights if the project cannot
carry two files.

- Set the scale as tokens, not per page: `--step--1` through `--step-6`, fluid
  with `clamp()` so a heading is not 54px on a phone.
- Check the longest real title in the project, not "Lorem ipsum". A jewellery
  name, a legal entity, a German compound noun.
- Line length between 45 and 75 characters for body text. Measure it, do not
  guess it: `width / (font-size × 0.5)` is close enough to catch mistakes.
- Line height: tighter as size grows. 1.5 for text, 1.1 for display.

## 2. Colour, and the states

Four decisions, then stop: ink, paper, one accent, and a muted ink for secondary
text. Everything else (borders, tints, hovers) is derived.

- Contrast is measured, not judged: 4.5:1 for text, 3:1 for large text and for
  the edges of controls. Run it in the harness, not in your head.
- Name tokens by role, never by colour: `--ink`, `--paper`, `--accent`,
  `--line`. A token called `--blue` will one day be green.
- Decide the dark ground rule now: is there a dark mode, or are dark sections
  a deliberate device on a light site? Both are fine. Half of each is not.

## 3. Spacing and the frame

- One spacing scale, powers of a base. Every margin comes from it.
- The page frame: maximum content width, gutters at each breakpoint, and the
  rhythm between sections as a single token so the whole site breathes the
  same way.
- Decide the section rhythm at desktop and at phone separately. Desktop
  usually wants less than a phone, proportionally.

## 4. The one page

Build the page that carries the point of the site, with real content, at
1440, 1024 and 390. Not a home page: the page a visitor came for.

It will force these answers, which is the point:

- what a title does when it is long, and when it is short
- how the primary photograph is framed when the source is square, upright, wide
- what the primary action looks like, and what sits beside it
- what is shown when a value is missing, hidden or not yet known
- what the page looks like with the shortest and the longest record

## 5. Extract the components

Everything that appeared twice on that page, or that you already know will
appear on the next one, moves into the component module now. See
`playbook/04-components.md`.

## 6. Motion, last and least

- Decide what moves: usually entrances, never text the reader is trying to read.
- Two durations and one easing curve, as tokens. More than that is noise.
- Anything that loops, moves the page, or plays automatically needs a reason
  and a way to stop.
- Respect the reader's reduced-motion setting unless the client explicitly
  overrules it, and write that decision in the blueprint either way.

## When to freeze

Freeze tokens when the second page starts. After that, a change to a token is
a deliberate, project-wide decision, made once, and visible everywhere the next
time the harness runs.
