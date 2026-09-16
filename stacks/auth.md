# Accounts and sign-in

First answer: does anyone sign in at all? If only the owner edits content, an
access rule at the edge or one protected route is enough. Do not build accounts
for one person.

| Option | Choose when | What it costs |
| --- | --- | --- |
| **None** | Nothing is personal, nothing is saved | Nothing |
| **Edge access rule** (Cloudflare Access, Netlify Identity, basic auth) | Only staff sign in, and they are few | A configuration, not a codebase |
| **Managed provider** (Auth0, Clerk, Firebase Auth) | Accounts matter and speed matters more than cost | Per user a month, and a dependency in the critical path |
| **A library in your own server** (Better Auth, Lucia, NextAuth) | You want the records in your own database | You own the flows: verification, recovery, linking |
| **Social only** (Apple, Google, Facebook) | The audience already has those accounts and you want no passwords | Provider setup, and the linking rules below |
| **Email or phone with a password** | Some of the audience has neither, or the client insists | Recovery flows, SMS cost, rate limiting |

## The rules that prevent the expensive mistakes

- **Automatic account linking only where the provider verified the address.**
  Apple and Google verify. A provider that returns an unverified email does
  not. Never link by phone number: carriers recycle them.
- **One account per email, one per phone number**, stored normalised (lower
  case, E.164), with a unique index.
- **Verification belongs to the identifier**: a link for an address, a code for
  a number, before either can sign in or recover.
- **The same response whether or not an account exists.** Enumeration is the
  cheapest attack there is.
- **Staff use a different door** from clients, with two-step verification, and
  roles written as a matrix before any screen exists.
- **Every code or link that is sent costs money and can be abused.** A
  challenge before sending, limits per identifier, per address and per day, and
  a spend cap with the provider.
