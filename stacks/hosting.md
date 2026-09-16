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
