# The intake interview

Ask these before anything is designed or installed. Each question exists
because a wrong guess about it is expensive later. The right-hand column is
what the answer actually decides, so you can tell the person why you are
asking, and so a later agent can trace a decision back to a sentence someone
said.

Ask in groups. Stop a group early when the answers make the rest moot.

---

## A. What this is

| Ask | It decides |
| --- | --- |
| Describe the site in one sentence, as you would to a stranger. | The home page's job, and the first line of the blueprint |
| What does a good visit end with: a purchase, a message, a booking, a download, a read, a follow? | The primary action on every page, and what analytics has to count |
| What happens today instead of this site? | What must not get worse |
| Is there a site now? What stays, what dies? | Redirects, content migration, the risk register |
| Who decides it is finished? | Who signs off, and how many rounds to plan for |

## B. Who reads it

| Ask | It decides |
| --- | --- |
| Who are they, and what do they already know about you? | Tone, how much explanation, how much proof |
| Where are they, and in what language? Is one language enough at launch? | Hosting region, locale routing, translation workload |
| Phone or desktop, mostly? Fast connection or not? | Which width you design first, image budget |
| Anything about accessibility you already know you need? | Contrast floor, motion policy, keyboard and reader testing |

## C. The content

| Ask | It decides |
| --- | --- |
| What are the things on this site: pieces, projects, products, posts, people, properties? | The content model, and the noun the whole codebase uses |
| How many at launch, and in a year? | Static pages, a generator, or a database |
| Who writes and updates them, and how often? | Whether an editor interface is needed at all |
| Do they have a natural order, or categories, or both? | Navigation and the index pages |
| What must every one of them have before it can be published? | The publish gate, and the empty states |

## D. Money and obligation

| Ask | It decides |
| --- | --- |
| Does the site take money? Directly, or through an enquiry? | Whether checkout exists, and how much of the blueprint is about it |
| Who takes the payment, and in what currency? | Payment provider, tax and invoice questions |
| Are prices public, private, or on request? | The data model, and whether a price can ever reach a public page |
| Are there legal obligations: consent, invoicing, age gates, professional rules? | The privacy work, and who reviews it |

## E. Accounts

| Ask | It decides |
| --- | --- |
| Does anyone sign in? Clients, staff, both, neither? | Whether auth exists at all, which is the single biggest scope fork |
| If clients sign in, what do they get that they cannot get otherwise? | Whether accounts are worth it |
| Which ways in: social providers, email, phone? | Provider setup, SMS cost, verification flows |
| Who on your side needs to change things, and can they be trusted with everything? | Roles, and whether a console is needed |

## F. Media

| Ask | It decides |
| --- | --- |
| What photography exists, and who owns it? | Licensing, and how much generation is needed |
| Is every item photographed the same way, or is it whatever came in? | The shot list, and whether framing bugs are possible |
| Video? Where does it live now: your camera, YouTube, Instagram? | Embeds, consent, and the privacy notice |
| Any 3D, configurators, or animation beyond scroll and hover? | A whole extra budget: see `stacks/three-d.md` |
| Who will add media after launch, and from what device? | Upload flow, size limits, automatic processing |

## G. Constraints

| Ask | It decides |
| --- | --- |
| Budget for hosting and services a month. | The hosting matrix in `stacks/hosting.md` |
| A date that matters? | What is cut first |
| Anything you already pay for or refuse to use? | Provider shortlist |
| Who owns the domain, the analytics, the social accounts? | Launch blockers, listed early because they take days |
| Where must data live, legally? | Region, and provider eligibility |

## H. After launch

| Ask | It decides |
| --- | --- |
| Who maintains it, and how technical are they? | How much can be left as code, how much needs an interface |
| What will change weekly, monthly, yearly, never? | What earns an editor, and what stays in the repository |
| What would make you say this failed a year from now? | The measures worth collecting, and the risks worth writing down |

---

## Scoring the answers into a shape

After the interview, name the shape. It changes the defaults for everything
downstream, and it is the one line to put at the top of the blueprint.

| Shape | Signals | Defaults it sets |
| --- | --- | --- |
| **Portfolio or studio** | Few items, no money, one author, heavy imagery | Static generation, no database, no accounts, media pipeline matters most |
| **Editorial** | Many posts, several authors, frequent change | Content model and an editor first, search early, database likely |
| **Catalogue, price on request** | Items are unique, sale happens in conversation | Database, private prices, enquiry flow, no cart |
| **Shop** | Repeatable stock, public prices, self-serve | Checkout, inventory, tax, refunds; the largest build |
| **Product or SaaS marketing** | Few pages, fast change, experiments | Component library and copy tooling, analytics, forms |
| **Application with a public face** | Sign-in is the point | Auth first, roles, two surfaces: marketing and app |
| **Immersive or 3D** | Scenes, configurators, scroll-driven work | Performance budget before design, asset pipeline, fallbacks |

Most projects are one shape plus a piece of another. Say which, in the
blueprint, and say which one wins when they disagree.
