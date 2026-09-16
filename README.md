# WebWork

A way of building websites with an AI agent that holds up after the first week.

This repository is not a template you copy and fill in. It is the **order of
work**: what to decide first, what to write down, what to build once and reuse,
and how to check that any of it is true. The stack changes from project to
project. The order does not.

It was written after building a Colombian jewellery house end to end, where
almost every early mistake came from the same two causes: a decision that was
never written down, and an element that was built three slightly different
times in three different files.

## How to start

Open a new, empty project folder with Claude Code and say:

> Read `WebWork/START.md` and take me through it.

Claude asks the intake questions first, writes the answers into the project,
generates a blueprint from them, scaffolds the folders and the checking
harness, and only then starts on design. Nothing about the stack is assumed
until you have answered the questions that decide it.

## What is here

| Folder | What it holds |
| --- | --- |
| `START.md` | The script the agent follows, phase by phase |
| `intake/` | The questions to ask before anything is built, and what each answer changes |
| `playbook/` | The ten guides, in the order they are needed |
| `stacks/` | Decision matrices: hosting, data, accounts, media, 3D |
| `templates/` | Blueprint skeleton, coordination file, handoff format, design tokens, shared components |
| `scripts/` | Scaffolding and the verification harness |
| `checklists/` | Short lists for launch, accessibility and content |
| `guide.html` | The same workflow as one page you can read or hand to someone |

## The five phases

1. **Ask.** Twenty minutes of questions. What the site is for, who reads it,
   what it sells or shows, what has to be true legally, what media exists, who
   maintains it. `intake/00-interview.md`
2. **Write it down.** A blueprint generated from those answers: the
   architecture, the decisions with their reasons, the risks, the open
   questions. It is a living file, updated whenever a decision changes.
   `playbook/02-blueprint.md`
3. **Set the ground.** Repository, branches, the agent working agreement, the
   verification harness, the empty design system. Nothing visual yet.
   `playbook/01-foundations.md`
4. **Design outward.** Tokens, then one page end to end, then the components
   that page needed, then the rest. Never the other way around.
   `playbook/03-design-system.md`
5. **Make it real.** Data, accounts, media pipeline, deployment, quality gates,
   launch. `playbook/07-data-and-accounts.md` onward.

## The rules that carry across every project

- **Anything that appears twice is built once.** One definition, one file,
  every screen calls it. A variation is a parameter, never a second copy.
- **Every decision is written where the next person will look**, with the
  reason and the date. A decision nobody can find is a decision you will make
  again, differently.
- **Check the built page, not the intention.** Screenshots, measured numbers,
  a console with no errors. "It should work" is not a result.
- **Sample data lives in one file** with a switch that empties it.
- **The interface speaks to the reader**, never to the designer. No notes to
  self in visible text.
