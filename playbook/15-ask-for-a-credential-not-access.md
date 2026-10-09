# Ask for a credential, not for access

Every build needs things only the owner can create: a payment account, a
domain, a sending address, a connection to the social account their brand
already lives on. The question is what you ask them for.

The lazy ask is access. Add me to your team. Make me an editor. Add me to your
Instagram. It is lazy because it is the same sentence for every service, and it
is almost always more than the work needs.

**Work out the smallest thing that actually unblocks you, and ask for that.**
It is nearly always a credential or a grant the owner can withdraw, not a seat
beside them.

## What this looks like

Three asks in one deck, all written the lazy way, all wrong:

| Asked for | What the work needed |
| --- | --- |
| Add me to your Instagram | One approval of a connection, which they can withdraw themselves |
| Invite me to your email team | An API key, and the DNS records for the sending domain |
| Make me an Editor on your cloud project | A client id and a secret, two strings |

The last is the clearest. Editor is write access to everything in the project.
The work needed two strings that can be rotated in a minute.

## Why it matters more than it looks

**It is a better conversation.** An owner who reads "add me to your Instagram"
is right to ask why their jeweller's website needs standing access to their
social account. That question costs trust, and the honest answer is that it
does not.

**It is cheaper at handover.** An approval the owner can revoke in ten seconds
is nothing to unpick. A standing seat is a line on the handover list, a
password to rotate, and a person to remember to remove.

**It fails smaller.** A key scoped to one job, rotated at the end, is a much
smaller problem than an account membership that outlives the engagement.

## How to write the ask

For each thing the owner must do, ask yourself: when this is finished, what do
I actually hold? If the answer is "a seat in their account", look again.

Then write the steps in their words, ending with what they send you:

1. In the app, switch the account to a professional one
2. Link it to the business page
3. Open the link I send and approve it. You can withdraw it at any time
4. Keep posting as you do now

and say plainly what does not happen: *your account stays yours, nobody is
added to it.*

## Where you genuinely do need access

Sometimes you do. Configuring and testing a payment account usually means
watching a real transaction land in a dashboard. Say so, say for how long, and
put it on the handover list the day it is granted. See `templates/handover.md`.

The test is not "can I justify access". It is "is a credential enough". Most of
the time it is.
