# The diagram kit

One hand for every blueprint. Drop these four files beside a project and its
diagrams look like every other project's, because they are drawn by the same
code rather than by the same intention.

| File | What it is |
| --- | --- |
| `fx.js` | The primitives. A board of boxes and arrows, a sequence, an entity diagram. |
| `fx.css` | Every label's size and the viewer's styles. The only thing it asks of the page is a `--line` colour. |
| `viewer.js` | Lets a reader open a board full screen, zoom and drag it, and click a box to see only what touches it. |
| `icons.svg` | Twenty-two marks for the kinds of thing a box usually is. |

Why it is drawn in code and not in a drawing tool: a drawing drifts from the
system the moment either changes, and nobody notices. A board built from the
same names the project uses can be rebuilt whenever the project moves, and it
is a diff when it does.

## Using it

```js
const { Board, defs, PAL, TAG } = require('./diagrams/fx.js');

const b = new Board(1340, 760, 'How a client reaches a piece');

b.header(30, 36, 'Public today', 'What anyone can open, with no sign-in');

b.group({ id: 'site', x: 30, y: 300, w: 610, h: 420, title: 'The site', color: 'blue' });

b.stack('site', [
  { id: 'pages', title: 'The pages', sub: 'Every screen, in two languages', icon: 'web', tag: 'impl' },
  { id: 'search', title: 'Search and filters', sub: 'Run in the browser', icon: 'search', tag: 'impl' },
]);

b.edge({ from: 'pages', to: 'search', color: 'blue' });

const svg = b.svg('How a client reaches a piece');
```

Put the result inside `<div class="diagram">`, include `fx.css`, and paste the
output of `defs()` once per page for the arrowheads and icons.

## The board

`new Board(width, height, label)` then:

| Call | What it does |
| --- | --- |
| `header(x, y, title, sub, tag)` | A heading inside the board, over a region |
| `group({ id, x, y, w, h, title, sub, color })` | A labelled region that boxes sit in |
| `card({ id, x, y, w, title, sub, icon, tag, color })` | One box. Height is worked out from the text |
| `stack(groupId, cards, { top, gap, pad })` | Lay cards down a column and size the group to fit |
| `row(groupId, cards, { top, gap, pad })` | The same, across |
| `edge({ from, to, color, label, dashed })` | An arrow between two ids, routed around the boxes |
| `pill(x, y, text, color)` | A small standalone marker |
| `note(x, y, w, text, color)` | A short aside |
| `raw(svg, onTop)` | Anything the kit does not cover |
| `svg(ariaLabel)` | Render it |

`dashed` also works on a card and on a group, and means the same thing
everywhere: intended, not yet built.

`stack` and `row` are what keep boards consistent. Place a group, pour cards
into it, and let the kit decide the heights and the spacing. Hand-placing every
box is how two diagrams in the same document stop matching.

## The colours

Nine families, each with a fill, a stroke, a tab and an arrow that belong
together: `blue`, `violet`, `teal`, `gold`, `slate`, `red`, `green`, `purple`,
`ink`.

Pick by meaning and keep it for the whole document. If blue is the public site
on one board, it is the public site on all of them. Never pick for variety.

## The status words

`TAG` holds the vocabulary a reader learns once:

`impl` Implemented · `part` Partial · `miss` Missing · `ref` Refactor ·
`post` Post-MVP · `works` Works · `looks` Looks only · `off` Off ·
`local` Local only · `none` Absent · `new` New · `change` Change ·
`private` Private · `trusted` / `untrusted` · `secret` Secret, and a few for
naming who owns a thing.

Use these rather than inventing a word for a meeting. The colour is only there
to make the word scannable; the word carries the meaning, so a printout and a
colour-blind reader lose nothing.

## Sequences and entity diagrams

```js
sequence({ participants, steps, colW, aria })   // who does what, in order
erd({ w, tables, rels, notes, aria })           // tables and what joins them
```

Same palette, same type, same viewer.

## Adding an icon

`icons.svg` holds twenty-two. Add to it in the same style: a 32 by 32 view box,
no fill, `stroke="#334155"`, `stroke-width="1.7"`, round caps and joins, and a
`fill="currentColor" fill-opacity=".22"` wash on the main shape so the mark
reads at small sizes. Then reference it by name, without the `i-` prefix.

The practice around all of this, and when a diagram earns its place at all, is
in `playbook/16-blueprint-diagrams.md`.
