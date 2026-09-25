# Handover

Copy this into the project as `HANDOVER.md` at the start, not at the end. Every
account someone opens on the client's behalf goes on it the day it is opened,
while it is still cheap to move.

The rule: **an account opened in the builder's name is a debt.** Anything that
can be created in the client's name from the start, is. What cannot be, gets a
line here saying how it moves and who has to be present.

Tick a line only when the client can sign in to it themselves and the builder
is no longer needed for it to keep running.

## 1. Accounts that must end in the client's name

| To do | How | Today | Who |
| --- | --- | --- | --- |
| ☐ Hosting and data account | Rename to the business. Invite the client as an owner or super administrator; they turn on two-step sign-in and put their own card on the billing page. The builder stays as an administrator while working. Nothing is rebuilt: the resources stay where they are. | | |
| ☐ Billing alerts | Usage alerts sent to the client's address, not the builder's | | |
| ☐ Domain | The client buys it in their own name, inside that account where possible, auto-renew on, business contact details. Then it never has to move. | | |
| ☐ Code repository | Create an organisation owned by the client and transfer the repository to it, or at least make them an admin. After a transfer, check the build secrets and any published address, which changes with the owner. | | |
| ☐ Payments | Opened by the client's company with their bank account for payouts. Keys go into the server as secrets; the webhook address is registered in the provider. | | |
| ☐ Sign-in provider | Owned by the client's account, builder added as a member. The consent screen carries the business name, logo and domain. | | |
| ☐ Email sending | The sending domain and its DNS records, in the client's account | | |
| ☐ Text or chat messages | Account in the client's name, with a spend cap and the countries they approve | | |
| ☐ Invoicing | Under the client's tax registration, with their accountant | | |
| ☐ Analytics and search console | Verified on the domain, under the client's account | | |
| ☐ Staff access | The client is the owner in the staff table and in the access policy, with two-step sign-in. They add everyone else. | | |

## 2. Keys and settings

| To do | How |
| --- | --- |
| ☐ Deploy token | Tokens belong to a person. Before the builder leaves, create a new one from the client's login, replace the secret, then delete the old token. |
| ☐ Server secrets | Rotate every secret the builder has seen, once the handover is final |
| ☐ Site address | Point the application at the domain, and update the same address in sign-in, payments, access and any verification service |
| ☐ One page listing all of it | Every account, who owns it, what it costs, where its key lives |

## 3. What the client should be able to do alone

Not a list of credentials. A list of actions. If any of these still needs the
builder, the handover is not finished.

- ☐ Sign in to every account above
- ☐ Change the card that pays for hosting
- ☐ Add and remove a member of staff
- ☐ Publish a change to the site's content
- ☐ Refund an order
- ☐ Export their data
- ☐ Reach whoever maintains the code

## 4. The conversation to have early

Ask at intake, not at the end:

- Whose name is the business in, legally? That name goes on the domain, the
  payment account and the invoicing.
- Who at the business will hold the passwords, and who is the second person if
  they are unavailable?
- Which of these accounts do they already have?
