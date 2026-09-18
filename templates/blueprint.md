# <Project> blueprint

| | |
| --- | --- |
| Prepared | <date> |
| Revised | <date and what changed> |
| Shape | <portfolio / editorial / catalogue / shop / marketing / application / immersive> |
| Status | Draft for approval / Approved / Building |

Delete any section this project does not justify, but keep the numbering of the
ones you keep, so a reference to "section 9" survives.

## 1. Summary
What this is in three sentences. The five findings that matter most, each with
a severity. The recommended path in four lines.

## 2. What exists today
Honest inventory, including what looks finished and is not. Note anything that
cannot be verified and mark it unknown rather than assuming.

## 3. Recommended architecture
One diagram and one paragraph. Name every service, and what it is for.

## 4. The content model
Each type, its fields, what is required before publishing, who sets it.

## 5. The flows that matter
Only those that carry money, identity, or anything irreversible. One sequence
diagram each, and the failure path beside the happy path.

## 6. Security and privacy
The threats that actually apply, what mitigates each, and what is deliberately
accepted. Personal data held, where it lives, how long it stays.

## 7. Performance budget
The weight of the first screen, the target on a mid-range phone, and what is
allowed to be heavy.

## 8. Deployment
Environments, secrets per environment, the pipeline, migrations, rollback.

## 9. Feature matrix
Every feature: exists, partial, missing, or post-launch, with the work needed.

## 9b. Site map
Every page as a card with arrows between connected pages, and under each page
what the backend does and what remains. See `playbook/02-blueprint.md`.

## 10. Risks
By severity. Each with what happens if ignored, the fix, the effort, and when
it must be done.

## 11. Build plan
Phases with dependencies. Each phase: what gets built, what it needs first,
what it changes in the data, how it is tested, and when it is done.

## 12. Post-launch, deliberately not built
Each with the condition that should trigger it. This section prevents scope
arguments later.

## 13. Decisions
Numbered AD1, AD2, ... Each with: what it does, why it is needed, why it
belongs here, what it costs, why it is right at this size, and when to replace
it. Never renumber.

## 14. Questions and unknowns
Numbered U1, U2, ... Each with: why it matters, how to resolve it, who owns it,
and what it blocks. Mark answered ones as answered, with the date and the
answer, rather than deleting them.
