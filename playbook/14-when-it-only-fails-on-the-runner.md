# When it only fails on the runner

A check fails in CI and passes on your machine. The instinct is to work out
the difference from where you are sitting. Resist it.

**A failure you cannot reproduce is a reporting problem before it is a code
problem.** You do not have the failing machine. You have a message from it.
Make the message say more, push, and read the answer.

In one afternoon this happened three times. Each time the first instinct was
wrong, and each time the fix was the same move.

| What the check said | What it was |
| --- | --- |
| The page scrolls sideways on a phone | A footer button whose word is twice as long in Spanish |
| It came to rest 87px from a section | The check worked the resting places out itself and had drifted from the page |
| The page never finishes loading | A refused response whose body nobody read |

Before finding each one, time went into theories that were wrong: a cold
build, hot reloading, a missing pointing device. None of them survived a
minute of evidence, and none of them would have been proposed at all if the
check had simply named the element.

## Make the check name the culprit

A check that says *the page moved sideways* starts an investigation. A check
that says *it moved 19px, and the element that did it is the newsletter button
in the footer* ends one.

So when a check fails where you cannot watch it:

1. Change the check to report the fact, not the symptom. What element, how far,
   what value, what the browser itself was working from.
2. Push it and read the answer.
3. Fix the real thing.

Step 1 feels like a detour. It is faster than one wrong guess, and the better
message stays in the repository for whoever hits it next.

## Report, do not filter

A first attempt at this made it worse. The check looked for the element
pushing the page wide, found that every element sat inside something that
clips, and reported that nothing was measurable.

The filter was the bug. The page clips sideways at the top level, so *every*
element is inside something clipping, and the one that mattered was excluded
along with the rest. A check that filters can filter away its own answer.
Report what you measured and let a person judge it.

## The ways your laptop lies

These are not obvious and each one hid a real fault:

- **Scrollbars.** A visible scrollbar narrows the measured page, so an overflow
  check is *less* strict on a laptop than on a headless runner. A page that
  looks fine locally can be over the edge in CI.
- **Type sets wider elsewhere.** The same sentence is a few pixels wider on the
  runner. An element that lands exactly flush on your screen lands past the
  edge on theirs. This bites hardest in the longer language, so the fault
  appears in Spanish and not in English, which reads like a translation bug and
  is not one.
- **No pointing device.** `(pointer: fine)` does not match on a headless
  browser. Anything gated on having a mouse never runs there, so a check
  asserting that behaviour is asserting something that cannot happen. Measure
  whether the behaviour is active and say so, rather than assuming it.
- **Speed.** A fixed `wait(2000)` reads whatever the animation had reached on
  that machine. Wait for the value to stop changing instead, and make the quiet
  period longer than any settling the page does on its own.

## When you are still guessing, bisect

If a change is suspected and the evidence is thin, stash it and run the check
again. One run with the change and one without answers in two minutes what an
afternoon of reasoning will not. It is also the only way to be sure the thing
you are about to fix is the thing that broke.

## Keep the better message

The improved check is the lasting part. The bug gets fixed once; the check that
names the culprit goes on naming it. Treat the diagnostic as the deliverable,
not as scaffolding to remove afterwards.
