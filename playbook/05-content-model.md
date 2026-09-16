# The content model

The nouns of the project, written down before any interface edits them.

## Name the thing once

Whatever the site is about, pick the word and use it everywhere: in the
database, in the code, in the interface, in conversation. Pieces. Projects.
Properties. Posts. A project that says "product" in the schema, "item" in the
code and "piece" on the page will pay for it in every conversation.

## Describe each type in a table before building it

| Field | Type | Required to publish | Who sets it | Notes |
| --- | --- | --- | --- | --- |

Two columns earn their place: **required to publish**, which becomes the
publish gate, and **who sets it**, which decides whether an editor is needed.

## The publish gate

Say explicitly what must be true before an item can appear publicly. For a
catalogue: a name, one approved photograph in the primary frame, a category,
and a price record even if the price is hidden. Enforce it in the data layer,
not in the interface, so an import cannot bypass it.

## Sample data lives in exactly one file

Every example record, in one module, with a switch:

```js
const ENABLED = true;   // set to false and rebuild to empty every screen
```

Two reasons. The person paying can see the site with and without invented
content in one command, and the empty states get built and checked instead of
being imagined.

Real catalogue data, if it exists, is not sample data: it comes from its own
source (a spreadsheet, an export) through a generator, and is never hand-edited
in the repository.

## Ordering, categories and the index pages

Decide for each type: natural order (newest, price, name), categories, and
whether an item can belong to more than one category. The answer to the last
one decides whether you need a join table, and it is much cheaper to answer now
than to retrofit.

## Shape-specific notes

- **Portfolio:** items are few and rich. Prefer files in the repository over a
  database, and a strict per-item folder layout.
- **Editorial:** a post needs an author, a date, a category, a cover and a
  standfirst. Everything else is body. Decide the body format now: blocks, not
  raw HTML, if anyone but a developer will write it.
- **Catalogue and shop:** the price is its own record, with a history and a
  visibility. Never a column on the item you can accidentally select.
- **Application:** the content model is the domain model. Write it as entities
  and relationships, and put the diagram in the blueprint.
