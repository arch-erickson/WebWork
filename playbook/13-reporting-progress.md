# Reporting progress to the person paying

An owner does not want a burndown chart. They want to know what is finished,
what is being worked on, what is waiting on them, and what it costs. Say it in
their words, and say it the same way every time so the picture is comparable
from one month to the next.

## Five words, used everywhere

Pick the vocabulary once and never improvise around it:

| Word | What it means |
| --- | --- |
| **Implemented** | Built, checked, and doing its job |
| **Partial** | Some of it is built; the rest is named and planned |
| **Missing** | Not started |
| **Refactor** | Exists, and has to be rebuilt somewhere else before it counts |
| **Post-MVP** | Deliberately not now |

The temptation is to invent friendlier phrasings for a meeting. Do not. If a
card says *Partial* in the architecture diagram, it says *Partial* in the deck
too, and the owner learns one vocabulary rather than three.

Two exceptions worth making:

- **Translate Refactor when you present it.** To an owner, "refactor" sounds
  like waste. Say *Designed*, and explain once: drawn, approved, waiting to be
  built in the real product. Same state, plain words.
- **Say what each label is about.** Two pills reading `Implemented` and
  `Implemented` look like the same word printed twice. Label the second:
  `Implemented` · `Data · Partial`.

## One picture, coloured by status

Draw the whole system once, as cards grouped by where they live, and put the
status on every card. Then that one drawing answers "how far along are we"
without a single sentence.

Rules that keep it readable:

- Colour never carries the meaning alone. The word is on the card; the colour
  only makes it scannable. Someone colour-blind, or a printout, must lose
  nothing.
- Differences in lightness, not only hue. Prefer blue and orange to red and
  green.
- One card per thing the owner can recognise. Not one per module.

## The deck is screenshots, not prose

For a progress meeting, the strongest deck is the product itself:

- The client's path as a row of real screenshots, numbered, with an arrow
  between them and one line saying what the person does next.
- The same path on a phone.
- Every screen as a grid, each tagged.
- The architecture drawing, lifted from the blueprint unchanged. Do not draw a
  second version for the deck; two drawings diverge.
- Then, and only then, the asks.

Cut the explanations. Whoever presents it is talking; the slides are what they
point at.

## Asks are instructions, not requests

Anything the owner has to do gets its own slide with numbered steps: where to
sign in, which menu, whom to invite, what to send back. "We need the Bold
account" is not an ask. This is:

1. Open the merchant account in your company's name, with your bank account
   for payouts
2. In the dashboard, open the users section and invite `name@example.com`
3. Ask your account manager whether foreign cards work, and whether a payment
   can be refunded through the system
4. Send me the three keys the dashboard gives you

Write them in the voice of whoever presents, addressed to whoever acts.

## Keep it current, or stop making it

A status picture that is two weeks old is worse than none, because it is
believed. Update it at the end of every batch of work, in the same commit.
