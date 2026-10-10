# Blueprint diagrams

Every blueprint gets the same drawings, drawn the same way. Not because
consistency is tidy, but because an owner who has read one of your blueprints
can read the next one without learning a new language, and because a drawing
that matches the system can be rebuilt when the system moves.

The kit is in `diagrams/`. This is when to reach for it and how to draw so the
result is worth the space.

## Draw in code, never in a drawing tool

A diagram made by hand in a drawing tool is correct on the day it is made and
quietly wrong a week later. Nobody opens it to check, because opening it means
opening another application.

A diagram built from the same names the project uses is rebuilt with the
project. When a service moves, the board moves, and the change shows up as a
diff like any other. That is the whole argument, and it is enough on its own.

It also means the deck and the blueprint show the same picture, because the
deck lifts the drawing rather than redrawing it. Two drawings of one system
diverge. See `playbook/13-reporting-progress.md`.

## The grammar

Four things, and each means one thing everywhere:

- **A group** is where something lives. The browser, the server, the database,
  somebody else's company. If two boxes are in the same group they run in the
  same place and fail together.
- **A card** is one thing the owner can recognise and name. Not one module. If
  they would not say the words on the card, it is the wrong card.
- **An arrow** is a real call, in the direction the request travels. If nothing
  in the code makes that call, there is no arrow. A dashed one is something
  intended and not yet built, and nothing else.
- **A chip** is status, in the vocabulary of
  `playbook/13-reporting-progress.md`. Implemented, Partial, Missing,
  Refactor, Post-MVP. The same five words as the matrix and the deck.

A reader who learns those four once can read every board you draw.

## Colour means something, and keeps meaning it

Nine families come with the kit. Choose what each means at the start of a
document and hold it for the whole document. If blue is the public site on the
first board, blue is the public site on the last one.

Never choose colour for variety. A board whose colours mean nothing is harder
to read than a board with no colour at all, because the reader spends attention
looking for a pattern that is not there.

Three rules keep it honest:

- **Colour never carries the meaning alone.** The word is on the card; the
  colour only makes it scannable. A printout and a colour-blind reader must
  lose nothing.
- **Differences in lightness, not only hue.** Prefer blue against orange to
  red against green.
- **One card per thing the owner can recognise.** If a box needs a sentence to
  explain what it is, it is two boxes or the wrong box.

## Let the kit place things

`stack` and `row` pour cards into a group and work out the heights and spacing.
Use them. Hand-placing every box is how the fourth board in a document stops
matching the first, and it is slower.

Fix the board's width and let the height follow the content.

## When a diagram earns its place

Draw one when the shape of a thing is the point: what runs where, what calls
what, the order of a flow, which tables join. Those are hard to hold in
sentences and easy to see.

Do not draw one for a list, a sequence of steps a reader will follow anyway, or
anything a table says better. A diagram costs a reader more attention than a
paragraph, so it has to repay it.

The test: if you can say it in two sentences and lose nothing, say it in two
sentences.

## Every board is one picture of one question

A board that answers two questions answers neither. "What runs today" and
"what we are building" are two boards, even when most of the boxes are the
same. The second is far more useful when the reader has just seen the first.

## Keep them current, or stop drawing them

A board that is two weeks stale is worse than none, because it is believed.
Rebuild it in the same commit as the change it describes. If that is too much
work, the board is too detailed; cut it back until it is cheap to keep true.
