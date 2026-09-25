# One definition, two surfaces

Most projects end up with the same words in two places: a marketing site and
an application, a design reference and the real thing, a print sheet and a
screen. The second copy is always a little behind the first, and nobody
notices until a client reads the old one.

The rule that holds: **the words and the facts live in one file, and every
surface reads that file.** Neither surface is allowed its own copy.

## What this looks like

In the jewellery project there are two front ends. A static generator writes
the reference site, and a React application is the real product. They share:

- the catalogue (what a piece is, its photographs, its categories)
- the page copy that is data rather than layout: collections, legal pages,
  the journal, the search index, the studio's opening hours
- the stylesheet
- the translations

One script, run at the end of every build, writes those into the
application's own folder as JSON and copies the stylesheet across. The
application imports them. Nothing is typed twice.

```
Design/_build/          the one definition
  collection-pages.js   a collection: its photograph, its sentence, its pieces
  legal.js              the legal pages, split into their data and the template
  sample-data.js        example records, and the studio's hours
  export-web.js         writes all of it into web/src/content as JSON
web/src/content/        generated; never edited by hand
```

## How to split a generator that has copy inside it

The usual state is worse: the words are inside the markup, in template
strings. Lift them out in two steps.

1. **Data first.** Move the arguments of each page into an array of plain
   objects in their own file. The generator maps over it. Nothing about the
   output changes, and you can prove that: build before, build after, diff the
   generated files. They should be identical.
2. **Template second.** Now the same array can be read by the other surface.

Doing it in that order means a mistake shows up as a diff, not as a bug
found later by a reader.

## Translations

The same rule, one layer down. English is written in the generator; every
other language is a dictionary keyed by the English sentence. The build fails
when a sentence has no translation, so a language can never drift behind the
site.

Two traps worth knowing:

- **Patterns are greedy.** A dictionary entry like `"Order {name}"` will
  swallow `Order NS-2481 · placed 6 September · 2 pieces in one parcel` and
  translate only the first word. When you add a pattern that starts with a
  common word, add the whole sentences it would otherwise catch.
- **Prose is not a sentence.** A legal paragraph with a link inside it is one
  segment, not three. Translate it whole, at export time, and store the whole
  paragraph as the key.

## What belongs in each place

| Lives in the one definition | Lives in the surface |
| --- | --- |
| Names, prices, categories, photographs | Layout |
| Page copy that repeats or is listed | Page copy written once, in place |
| Status, dates, counts | Interaction |
| Translations | Routing |

If you are about to write a sentence a second time, stop and move it.
