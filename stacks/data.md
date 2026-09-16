# Data

| Option | Choose when | Gives you | Costs |
| --- | --- | --- | --- |
| **Files in the repository** | Tens of items, one editor, no personal data | Version history, no service, no bills | Editing means a commit. No queries |
| **A generator over a spreadsheet or an export** | The client already maintains a list somewhere | Their workflow unchanged, the site regenerated on import | Import validation is now yours |
| **Edge SQL** (Cloudflare D1, Turso) | Hundreds to low thousands of rows, read-heavy, one writer | Cheap, close to the visitor, SQL | No row level security, so one data-access layer with tests is mandatory |
| **Managed Postgres** (Neon, Supabase, RDS) | Relational work, several writers, policies in the database, extensions | Mature tooling | A network hop, and a bill that grows |
| **Document store** (Firestore, Mongo) | Shapes vary per record, or live updates are the point | Flexible writes | Queries and integrity become application work |
| **Headless CMS** (Sanity, Contentful, Payload) | Editors matter more than schema control | An editor you did not build | Lock-in, per-seat cost, another API to secure |

## Whatever you choose

- One data-access layer. Nothing else touches the connection.
- Every sensitive field in its own table, with a test proving public paths
  cannot read it.
- Irreversible writes are atomic and keyed, so a retry cannot duplicate them.
- Migrations forward only, numbered, applied by a job rather than by hand.
- A backup you have restored at least once, and an export that lives outside
  the provider.
