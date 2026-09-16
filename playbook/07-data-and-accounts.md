# Data and accounts

The most expensive decision in the project, and the one most often made by
accident. Start from the position that you need neither.

## Do you need a database at all?

| You do not, if | You do, if |
| --- | --- |
| Items are few and change rarely | Items number in the hundreds or change weekly |
| One person edits, and they can edit files | Several people edit, or they are not technical |
| Nothing is personal or private | Anything is personal, priced privately, or transactional |
| Every page can be generated ahead of time | Pages depend on who is asking |

A generator over files in the repository is a legitimate architecture for a
serious site, and it removes an entire class of failure.

## If you do need one

Choose from `stacks/data.md`. Whatever it is, hold to these:

- **One door.** All reads and writes go through a single data-access layer.
  Nothing else touches the connection. Every function takes the acting person
  and puts their scope into the query.
- **Private by default.** Anything sensitive (prices on request, contact
  details, notes) lives in its own table, and no public function selects from
  it. Prove it with a test rather than a policy.
- **Money is written once.** Anything irreversible happens in one atomic write
  with a unique key, so a retry cannot double it.
- **Migrations are forward only**, numbered, applied by a job, never from a
  laptop.

## Do you need accounts?

Ask what an account gives that the site cannot give without one. If the answer
is "we would like to know who they are", that is not enough: a form and an
email address will do. If the answer is "they follow an order, they see prices
agreed with them, they return to something of theirs", accounts are real.

## If you do need them

Decide the ways in from `stacks/auth.md`. Then write down, before building:

- which methods need a password, and which are proven by the provider
- how each identifier is verified: a link by email, a code by SMS
- what happens when the same person arrives by a second method: **automatic
  linking only where the provider verified the address**, never by a phone
  number, never by an unverified provider email
- uniqueness: one account per email, one per phone number, in a normalised form
- what a forgotten password costs to recover, on each method
- staff: a separate door, stronger, with the roles written as a matrix before
  any screen is built

## The costs people forget

- **SMS is money per message and invites fraud.** If phone sign-in is in scope,
  budget for a provider, rate limits per number and per address, a challenge
  before any send, allowed countries, and a spend cap with an alert.
- **Email deliverability** is a project of its own: a sending domain, records,
  and a fallback provider.
- **Sessions and secrets** need a home per environment, never in the repository.

## The order to build it in

1. The data layer and its tests, against sample data.
2. Staff access and roles, because the console is where damage happens.
3. Client accounts, with one method, end to end, including the failure paths.
4. The second and third method.
5. Recovery, then deletion. A client who cannot leave is a liability.
