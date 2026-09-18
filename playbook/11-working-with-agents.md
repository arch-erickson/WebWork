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

## Checks both sides run

The same automated checks run on every push, whoever made it: build, tests,
the build-matches-committed-output check, accessibility, screenshots. Then
neither agent has to trust the other's "it works".
