# Working with more than one agent

Two agents on one repository double the output and multiply the ways work is
lost. Everything here was learned from a project where one agent owned the
interface and another the backend, data and imagery, on two machines.

## One lead

Name one agent (or person) as the lead, in writing, in `COORDINATION.md`. The
lead decides when the two disagree, reviews the other's work when it lands, and
fixes what is incomplete, logging the fix. Without a lead, disagreements turn
into two half-finished versions of the same thing.

The lead does not take over the other's paths. Ownership stays as the claims
table says; the lead corrects, records, and hands back.

## The split

Split by layer, not by feature. "Interface and generated content" and "server,
data, security, imagery" rarely touch the same file. Feature splits ("you do
checkout, I do accounts") collide in every shared component.

Write the split as a claims table: path, owner, since, state. A path nobody
claims belongs to the lead.

## The channel is the repository

Agents cannot message each other. Everything travels through three things:

| Where | What goes there |
| --- | --- |
| `COORDINATION.md` log | One entry per change: what, and what the other side must do |
| `handoffs/<from>-to-<to>/` | The contract: endpoints, fields, rules, open questions |
| Git history | The work itself |

A handoff is written when the other side has to build against something. It
names exact fields, exact secret names, and what was not verified. The reply
is a new handoff in the other direction, never an edit to theirs.

## Commit is not enough: push

A commit on one laptop is as invisible to the other agent as uncommitted work.
Pull with rebase, then push, at the end of every piece of work. When reviewing,
check `git status -sb` for "ahead": unpushed work is the most common way a
whole day disappears from the other side's view.

## Leave nothing that breaks the other side

Unfinished work that imports a file you have not written yet will break the
other agent's type check or build, and they will spend time on your problem.
Park it outside the repository (or on a branch) until it compiles.

Stage only your own files. A wide `git add` sweeps up the other agent's work in
progress, half-finished and unreviewed.

## Review what lands

When the other agent finishes a piece, the lead reads:

- the handoff: does it match what was asked, and name what the owner must do?
- the log: is there an entry per change?
- the tests: do they run, and do they cover the failure paths, not only the
  happy one?
- the seams: does the interface still match the contract (field names, time
  limits, wording that promises a duration)?

Small mismatches are cheap to fix on the day and expensive a week later. A
reset link that lasts an hour while the email says fifteen minutes is exactly
this kind of seam.

## A finding is a lead, not a fact

An agent sent to read a codebase comes back with findings. Most will be right.
The ones you act on need checking first, especially any that say *delete this*
or *this is blocked*.

A mapping agent reported a component as unused and safe to remove. It was not:
its only importer used a relative path the search had missed. Acting on it
broke the build, and the typechecker named the importer in seconds, which is
exactly how long the check would have taken beforehand. The same agent reported
a service as unwired and blocking, when the deployment supplied it from a
variable that exists. It was right about fourteen other things.

So: treat the report as a map, not as a verdict. Verify the claims that will
change the code, with a command whose answer you can read. Leads are cheap and
wrong leads are expensive only if you act on them unchecked.

Two failure shapes worth knowing, because both happened:

- **The search that missed.** A grep for `components/Thing` does not find
  `import { Thing } from '../Thing'`. Confirm "nothing uses this" with the
  compiler, not with a pattern.
- **The blocker that was not.** "Not configured" in a file often means "not
  configured locally". Check how it is supplied where it actually runs.

## When an agent edits files at scale

Patch scripts are how an agent changes many files at once, and they have their
own traps. Two cost an hour each before being understood:

- **A doubled dollar in a replacement is an escape.** In JavaScript's
  `String.replace`, the replacement string treats `$$` as one literal
  dollar, and `$&` and `$1` as the match and its groups. A patch that writes
  a selector like `$$('.thing')` silently writes `$('.thing')` instead, and
  the result looks like the shell ate a character. Pass a function as the
  replacement and it is taken literally.
- **Line endings are mixed inside one file.** A file can be mostly one kind
  with a region of the other. A patch that normalises to "whatever the file
  mostly uses" fails to match that region. Match the bytes that are there.

And assert what you expect to change. A patch that says it replaced six of a
thing, and stops when it finds five, is a patch that cannot quietly do half a
job.

## Stage only your own files

With two agents in one repository, `git add` on a directory will sweep up
whatever the other one has in progress. That commits someone else's unfinished
work under your message, and it can ship something half-done.

Name your files, or check what is staged before committing. Caught before a
push it costs a minute to undo; caught afterwards it is a conversation.


## Checks both sides run

The same automated checks run on every push, whoever made it: build, tests,
the build-matches-committed-output check, accessibility, screenshots. Then
neither agent has to trust the other's "it works".
