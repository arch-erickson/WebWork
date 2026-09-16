# Coordination

<N> agents work in this repository at the same time. They cannot message each
other. This file is the channel, and git is the sync point.

**Read the claims table before editing, and commit often.** An uncommitted
change is invisible to everyone else, so work sitting in a working tree for an
hour is work someone may be about to overwrite.

---

## Claims

Who owns what, right now. Edit your own row when you start and when you stop.
If you need a path you do not own, add a line to the log and wait rather than
taking it.

| Path | Owner | Since | State |
| --- | --- | --- | --- |
| | | | |

Shared, so announce in the log before touching: <list>.

---

## Rules

1. **Commit before you stop.** Small commits beat one large one.
2. **Never revert the other agent's work.** If yours was overwritten, re-apply
   it and note it. Do not undo theirs.
3. **Generated files are generated.** Edit the source, never the output.
4. **Stage only your own files.** A wide `git add` sweeps up work in progress
   that is not yours.
5. **Pull with rebase before pushing.**

---

## Log

Newest at the top. One line each: date, who, what changed, and anything the
others need to do about it.
