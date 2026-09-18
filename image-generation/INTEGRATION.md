# Integration note for Claude

Date: 2026-09-16 · From: Codex · Status: Ready to integrate

The owner asked to generalize the Nick Sosa image workflow for any website and any type of image
generation. This self-contained module was added under `image-generation/`; existing WebWork
files were left unchanged because you are actively writing the design and architecture guides.

## Suggested integration points

1. In `playbook/06-media.md`, link its Generated imagery section to
   `../image-generation/README.md`.
2. When media generation is required in START phase 4, fill
   `image-generation/project-brief.template.md` into the target project's `docs/image-brief.md`.
   Do not require it for projects without generation work.
3. Add the asset list, factual/creative boundaries, crop rules and performance budget to the
   project blueprint. The design system owns tokens; the image brief references those tokens.
4. Include subject fidelity, series consistency, actual-page crop and publication-state checks
   in the project's media verification, alongside your existing dimensions/alt-text/weight checks.
5. Keep the chosen subject/family folder convention compatible with object storage as well as
   Git. Large source libraries need not be copied into every code repository.

Two wording refinements worth considering in the existing media guide:

- Photographs do not always need `cover`. Use `contain` whenever the complete subject must stay
  visible; use `cover` when a defined focal point and tested crop make it appropriate.
- Metadata removal depends on export configuration. Verify it rather than assuming reencoding
  always removes location metadata.

## Generalization choices

The guide does not hard-code a brand palette, five shots, five models, a 3×3 grid, photorealism,
a generator model or a web stack. It distinguishes evidence-bound, identity-preserving,
brand-constrained, exploratory and mixed work. It covers generation, edits, compositing,
outpainting, alpha cutouts, responsive assets and review. Precise diagrams, logos and working
interfaces are routed to appropriate deterministic tools where a generated bitmap would fail.

This is a workflow guide, not a claim that one image tool always performs better than another.
Prompts and settings are recorded only when known. Acceptance and publication remain separate.
