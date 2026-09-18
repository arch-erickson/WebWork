# Hosting

Pick from the intake answers, not from habit. The question that decides it:
**does any page depend on who is asking?**

| Option | Choose when | Costs and limits | Watch for |
| --- | --- | --- | --- |
| **Static host** (GitHub Pages, Netlify, Cloudflare Pages) | Every page can be generated ahead of time. No accounts, no private data | Free to a few dollars. No server | Anything published is public. Access control usually needs a paid tier |
| **Edge platform** (Cloudflare Workers, Deno Deploy, Netlify Functions) | Pages depend on the visitor, but the work per request is small. Data fits an edge database | Single-digit dollars a month at small scale | The runtime is not Node: check every library. Size limits |
| **Node host** (Fly, Render, Railway, a VPS) | Long-running work, heavy libraries, image processing, background jobs | Tens of dollars, plus what you manage | You now own patching, scaling and monitoring |
| **Managed application platform** (Vercel, Netlify with a framework) | The framework is the point and the team is small | Free tier, then per seat and per usage | Bills grow with images and functions. Check what the free tier stops doing at launch |

## Questions that change the answer

- **Where are the readers?** An edge platform helps a global audience more than
  a single-region host.
- **Is there a compliance region?** Some data must stay in one country, which
  rules out several options.
- **Who maintains it in a year?** A VPS is cheapest until nobody wants to patch it.
- **What does the client already pay for?** One fewer vendor is worth real money
  in attention.

## The rule that survives the choice

Whatever you pick: two environments, secrets per environment, a deploy that is
one command, and a rollback that is one more. If a platform makes any of those
hard, that is the signal to look again.

## One platform for everything: Cloudflare

A combination that has held up for a small shop with accounts and payments,
at about US$5 to 15 a month:

| Job | Service |
| --- | --- |
| The application | Workers, with Next.js through the OpenNext adapter |
| Database | D1 (SQLite), behind one data-access layer |
| Pictures | R2, private originals, published copies under content-addressed keys |
| Client sign-in | A library in your own server (Better Auth) on D1, Turnstile on forms |
| Staff sign-in | Cloudflare Access, with two-step verification |
| Scheduled work | Cron Triggers (reconciliation, expiry, sending) |
| Email | Email Sending once a domain exists |

**The free plan is enough to build on, rarely enough to launch on.** A Worker
is capped at about 3 MB of compressed code and 10 ms of CPU per request. A
Next.js app with sign-in and payments usually passes one of them, and secure
password hashing must not be weakened to fit. Plan on Workers Paid (US$5 a
month) for the first real deploy, and let the deploy failing on size be the
signal rather than guessing. Check the current limits; they change.

**Setting up the account (the owner does this, not the agent):**

1. The owner creates the account and turns on two-step sign-in.
2. The owner creates a scoped API token (Workers, D1 and R2 edit), and stores
   it with the account id as CI secrets. The agent never sees a password.
3. Deploys run from a workflow in the repository, using those secrets. Pick
   one deploy path: either the platform's own Git connection or the workflow,
   never both, or every push deploys twice.
4. Protect the preview address with Cloudflare Access (it works on the free
   `workers.dev` address too) until launch.
5. Every other key (payment provider, Google sign-in, SMS) is created by the
   owner in that provider's dashboard and added as a Worker secret. The agent
   lists the exact names in a handoff.
