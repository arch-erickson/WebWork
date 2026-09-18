# Media

On most sites the pictures are the product. They are also the largest bytes,
the largest licensing risk, and the most common source of layout bugs.

## Decide the framing rule before the first photograph

Two questions answer most framing bugs:

1. **Does every item get photographed the same way?** If yes, define the shot
   list: a fixed sequence of named frames, in the same order, for every item.
   The interface is then built against slots by name, so a visitor sees the
   same sequence on every item rather than whatever was uploaded.
2. **Are the sources mixed?** Cutouts on no background and full editorial
   frames cannot be fitted the same way. Cutouts are contained so nothing is
   cropped; photographs cover and crop. One component decides this, from a
   flag on the record.

A five-frame shot list that has worked: the object alone, the object worn or in
use, a detail, a profile, and something for scale, plus unlimited extras. The
first is required and becomes the card image.

## Naming

`<type>-<slug>-<frame>-<version>.<ext>`, lowercase, no spaces, version bumped
rather than overwritten. Never rename an asset silently once it is referenced.

## Sizes and formats

- Deliver at most two times the largest display size. A card at 420px does not
  need a 4000px file.
- Prefer AVIF or WebP with a JPEG fallback only where the audience needs it.
- Set width and height (or an aspect ratio) on every image so nothing jumps
  while loading.
- Lazy load anything below the first screen; never lazy load the hero.

## Where they live

| Situation | Where |
| --- | --- |
| Few, stable, part of the design | In the repository, next to the code |
| Many, or uploaded after launch | Object storage with a CDN, and a transform service for sizes |
| Generated or retouched in batches | A private source folder, with only approved outputs published |

Keep originals private and publish only processed copies. Re-encoding through a
transform service also strips location metadata, which matters more than people
expect for photographs taken at home or in a studio.

## Video

- Self-hosted video is expensive to serve and easy to get wrong. Prefer an
  embed unless the video is short and essential.
- An embed is a third party: it loads scripts and sets cookies. Load it only
  after the reader asks, by showing a cover with a play control and swapping in
  the player on press. That one decision keeps the page private on arrival and
  fast.
- Store the cover yourself so the card still reads if the video is removed.

## Generated imagery

If images are generated rather than photographed, write the rules down:
what the subject may and may not be, the aspect ratios, the lighting, and who
approves them. Keep the prompt or the settings with the asset. Never
regenerate an approved asset silently: add a version.

## The checks worth automating

- no image wider than the budget
- every image has dimensions or a ratio
- alt text present, and not the file name
- total weight of the first screen under the budget in `playbook/09-quality-gates.md`

## Lighter pictures without a paid service

On an image-led site the pictures are most of the weight. A build step that
has cut a home page from 25 MB to under 1 MB:

- Write AVIF and WebP copies at a few fixed widths (for example 480, 960,
  1440, 1920) ahead of time, only for files above a size threshold, with a
  manifest of what exists.
- A single pass over every generated page adds the sources and `srcset`,
  chooses `sizes` from where the picture sits, lazy-loads everything after the
  first picture, gives the first one `fetchpriority="high"`, and preloads it
  from the page head.
- Store published copies under content-addressed keys (a hash of the file) so
  a cached copy is never wrong, and keep the originals private.
- Emails still get JPEG or PNG.

Prebuilt copies cost nothing per view. A transform service is worth it only
when uploads arrive after launch at sizes you did not plan.

## Cut-outs and masks

Segmentation models (SAM and its successors) make clean masks of the subject
for effects and cut-outs. Keep the model and its environment outside the
project repository, as a shared tool, and commit only the masks and a record of
which picture each came from. The build reads the masks; it never runs the
model.
