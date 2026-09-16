# Components

One rule carries most of the value in this repository:

> **If an element appears more than once, it is built once, in a shared module,
> and every screen calls that module. A variation is a parameter, never a
> second copy.**

## Why it is worth being strict about

The expensive bugs are not clever. They are the same element written three
slightly different ways: a thumbnail that letterboxes an upright photograph in
one place and crops it correctly in another; an icon set that renders as black
silhouettes wherever one rule was missed; a status label with three different
wordings for the same state. One definition makes those impossible to have in
only one place.

It also changes how fixes feel. A framing fix in the shared frame corrects
every screen at once, and the next screen someone builds inherits it.

## What belongs in the module, in almost every project

| Component | The decision it centralises |
| --- | --- |
| Media frame | How any image is fitted: cover or contain, ratio, what happens with no image |
| Item card | The thing-in-a-grid: frame, name, meta, one action |
| Item row | The same thing in a list: smaller frame, denser meta, actions at the end |
| Status label | The one vocabulary of states, and their colours |
| Empty state | Heading, sentence, one action. Every list has one |
| Panel or card shell | Padding, border, head with actions |
| Button set | Primary, secondary, quiet, destructive. Size and disabled states |
| Field | Label, control, help, error, required marking |
| Icon | One grid, one stroke weight, sized from CSS and never from markup |
| Gallery | Main frame, thumbnails, arrows, keyboard and swipe, full screen |

Add per shape: a price block for shops, an author line for editorial, a scene
loader for 3D, a reel card if the project embeds video.

## How to grow it without it becoming a junk drawer

1. Build the thing inline the first time you need it.
2. The second time, move it into the module and call it from both places. Do
   not generalise before you have two real cases.
3. A third case that does not fit adds a parameter. If the parameters start to
   contradict each other, that is two components, not one.
4. Keep the module's exports in one alphabetical list. If you cannot remember
   what is in it, nobody will call it.

## Where variations come from

- **Size:** `sm`, `md`, `lg` rather than pixel values at the call site.
- **Fit:** cutouts contain, photographs cover. The component decides from a
  flag, not from the page.
- **Density:** the same component in a console table and on a storefront card
  differs by one parameter, not by a fork.

## The check

Before writing markup, search the module. If it half exists, extend it. The
harness can enforce a weak version of this: grep the page files for inline
`<img`, `<button class="btn`, and status words, and fail the build if they
appear outside the module.
