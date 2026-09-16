# Foundations

Everything here is done before the first visual decision, and takes under an
hour.

## The repository

- One repository. Design and application live together until there is a reason
  they cannot.
- `.gitignore` before the first commit: environment files, `node_modules`,
  build output that can be regenerated, anything with a key in it.
- Decide now whether generated pages are committed. If the site is static and
  published from the repository, yes, and accept the noise. If a server builds
  it, no.
- Protect the default branch as soon as a second person or agent joins.

## The rules file

Copy `templates/CLAUDE.md` into the project root and edit it. It is the first
thing an agent reads, so it carries only what changes behaviour:

- what the project is, in two lines
- the shared-component rule and where components live
- the voice rules for visible text
- the build command, and how long it takes
- what must never be committed
- what is not built yet, and must not be connected to real data

## Working agreement, if more than one agent

Copy `templates/COORDINATION.md`. It carries a claims table (who owns which
paths), the rules, and a log with newest at the top. Two agents in one
repository without this will overwrite each other inside a day.

## The verification harness, before the first page

`scripts/verify.mjs` renders pages in a real browser and reports what is
measurable: console errors, horizontal overflow, contrast on text, the widths
of the main blocks, and a screenshot set at three sizes. Run it on the empty
shell so there is a baseline, and run it after every visual change.

An agent that cannot see the page it built will confidently describe something
that is not there.

## The empty design system

Create the files before they have values, so nothing is ever written anywhere
else:

```
styles/tokens.css        colour, type scale, spacing, motion, breakpoints
styles/base.css          reset, element defaults, focus styles
lib/components.*         one module, exporting every repeated element
content/sample.*         every example record, with an ENABLED switch
```

## First commit

Commit the empty structure with the rules file and the harness. That commit is
the moment the project became reproducible.
