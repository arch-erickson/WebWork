# Quality gates

Run these on every page before it is called done. All of them are measurable,
and `scripts/verify.mjs` does most of them.

## Layout

- No horizontal overflow at 320, 390, 768, 1024, 1440 and 1920.
- Nothing important is hidden behind a fixed header: check the first screen
  with the header open and closed.
- Text never sits over the subject of a photograph. Words take a side of the
  frame, with a scrim behind them, or the foot of the frame on a phone.
- The longest real title, and the shortest, both look deliberate.

## Type and colour

- Body text between 45 and 75 characters a line.
- Contrast: 4.5:1 for text, 3:1 for large text and control edges. Measured.
- No text smaller than 12px, and nothing important in a colour alone.

## Keyboard and readers

- Every control reachable by keyboard, in a sensible order, with a visible
  focus ring.
- Dialogs trap focus and return it when closed.
- Images have alt text that says what matters, or empty alt if decorative.
- Headings descend in order, one h1 per page.

## Weight and speed

- First screen under a stated budget: 500KB is generous for a content site,
  1.5MB for an image-led one. Write the number in the blueprint.
- Fonts subset, two files at most, and never blocking the first paint.
- No layout shift after load: every image has dimensions.

## Copy

- The voice rules from the rules file, enforced by a grep in the build: no
  words addressed to the designer, no placeholder text, no forbidden
  punctuation.
- Every empty state says what will appear and what to do next.
- Every error says what happened and what to do, in the reader's terms.

## Console and network

- No errors, no failed requests, no mixed content.
- No third-party request on arrival that the reader did not ask for.

## The habit

Run the harness after every visual change, not at the end of the week. It takes
seconds and it is the difference between a page that works and a page that was
described as working.

## The build has to be reproducible

The check below, "the committed output matches a fresh build", is the most
useful gate in the harness and the easiest one to break. It compares what is
in the repository against what the sources produce right now, so anything the
build invents each time it runs makes it fail for no real reason, and people
start ignoring it.

Three things to keep out of generated files:

- **The clock.** A sitemap stamped with today's date differs from the one
  committed yesterday. Write dates that mean something: the date the content
  changed, kept as a constant and moved by hand. Anything derived from the
  commit does not work either, because committing the file changes it again.
- **Hashes over the whole tree.** A cache-busting hash taken over a folder
  changes when an untracked scratch file is sitting in it. Hash the files you
  ship, listed explicitly.
- **Machine differences.** Locale in date and number formatting, file order
  from the filesystem, and line endings. Sort what you list; set the locale;
  commit a `.gitattributes`.

The test is simple: build twice and compare. If the two differ, the gate is
worthless until you fix it.

## Automate them in CI

Every push, whoever made it:

1. **Build, then check that the committed output matches a fresh build.** It
   catches generated files edited by hand and sources committed without
   their output.
2. **Browser checks** for the flows that matter: search, forms, payment
   states, account actions, languages.
3. **An accessibility audit** (axe) on every page at desktop and phone width,
   failing on any rule, whatever its weight.
4. **Screenshot comparison** against approved pictures. Fonts render
   differently per operating system, so keep one baseline per platform and
   commit the CI runner's.
5. **A performance audit** (Lighthouse) on the key pages, run by hand before
   a release.

**Wait for the page to be ready before checking it.** A loading skeleton hides
labels on purpose; an audit that runs during it reports buttons without names.
Wait for the loading state to lift and for images to decode, then check. Slow
CI machines expose this long after it passes on a laptop.
