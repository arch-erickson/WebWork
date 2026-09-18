# Messages, languages and printable documents

Three things that look like finishing touches and turn out to be structure:
the emails and texts the site sends, the second language, and the papers a
client prints or keeps.

## Transactional messages are templates in code

Write every email and text message as a function in one module:

```
render(kind, data, lang)  ->  { channel, subject, preheader, html, text }
```

- **One module, one frame.** Logo, footer and legal lines are shared; each kind
  is only its own words and data.
- **A plain text twin for every email.** Some readers and many filters see only
  that.
- **Mail apps are old.** Tables and inline styles, no reliance on web fonts,
  JPEG or PNG pictures (never WebP), absolute addresses.
- **Preview every kind** in the admin area, at desktop and phone width and as
  plain text, with sample data. The owner approves wording there, not in code.
- **The kinds are a list the backend stores.** Each queued message records its
  kind, its data and the recipient's language at the moment it was queued.
- **Words that promise a duration must match the platform.** If a code lasts
  15 minutes and a link an hour, the email says so, for each.
- **A text message stays under 160 characters** in every language; the build
  checks it.
- Until a sending domain exists, queue and preview messages rather than
  sending them to anyone.

## A second language, done once

- **One source language** is written by the generators; every other language
  is a translated copy made from dictionaries. Nobody edits a translated page.
- **The build lists every sentence with no translation**, and the list must be
  empty before release. A sentence that silently stays in the source language
  is the usual failure.
- **Sentences with a changing part use named holes**: `Thank you, {name}.`, not
  string concatenation. Word order differs between languages.
- **Keep message and page dictionaries apart.** A short word like "Held" or
  "Order" can need different translations in an email and on a page.
- **Decide the register** (formal or informal address) in the intake and write
  it in the rules file.
- **Format, do not translate, what the sender supplies**: dates, card names,
  money. Money follows the reader's locale (`$4.180.000 COP` in Spanish,
  `$4,180,000 COP` in English).
- **Words that read the same in every language** (names, references,
  addresses) go in a neutral list, so they are not reported as missing.
- **Gendered words.** Where a language forces a gender the source did not
  state (an owner, a founder), choose a neutral wording rather than guess.

## Printable documents

Receipts, certificates, statements. Clients print them or save them as PDF.

- **Let the browser make the PDF.** One page per document, print styles, and a
  "Print or save as PDF" button that opens the browser's dialog. No PDF
  library on the server, nothing to keep in step with the page design.
- **One sheet per document**: a fixed paper size (`@page { size: A4 }`), each
  sheet `break-after: page`, and the site's header, footer and floating
  buttons hidden in print.
- **Load every picture before printing.** Lazy-loaded images below the fold are
  missing from the printout unless the button loads them first.
- **Private by default.** Documents belong to the signed-in client; no public
  lookup by number, and the pages are kept out of search.
- **Show only what the record holds.** Build the document against the backend's
  field list; a row the database has no field for becomes a gap later.
- **Say what the document is not.** A payment receipt is not a tax invoice in
  many countries; the receipt says where the invoice comes from.
