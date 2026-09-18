# Image project brief

Project: <name>
Updated: <date>
Owner / reviewer: <name or role>
Status: <draft / established direction / revised>

Fill only relevant fields. Delete unused sections. Record unknowns and their practical impact.

## Purpose and destination

- Audience and intended outcome:
- Website/page/other destination:
- Required desktop, mobile, social or print placements:
- Existing brand/design-system reference:

## Fidelity and subject

- Mode: <evidence-bound / identity-preserving / brand-constrained / exploratory / mixed>
- Subjects or recurring asset families:
- Must preserve:
- May change or be invented:
- Explicitly excluded:
- Unknown facts or missing views:

## Reference pack

| Input | Location | Role | Authority / permission or attribution notes where relevant |
| --- | --- | --- | --- |
| 1 | | Subject / edit target / identity / style / composition / supporting view | |

Conflict rule: <which evidence controls which feature>

## Art direction

- Medium and visual tone:
- Palette and background treatment:
- Light and shadow:
- Materials and surface treatment:
- Viewpoint / perspective:
- Focus, texture or graphic language:
- Stable identity / character / environment anchors:
- Allowed variation in pose, wardrobe, arrangement or setting:

## Required assets

| Asset ID / slot | Purpose | Quantity | Ratio / dimensions | Subject extent / focal point | Crop / text-safe region | Format / alpha |
| --- | --- | ---: | --- | --- | --- | --- |
| | | | | | | |

Required-slot total: <number, excluding alternate versions and exports>
Responsive variants: <shared crop or separately art-directed image>
Sizing meaning: <visual consistency / verified physical comparison / not applicable>

## Tool and production choices

- Available tool and why it fits:
- Known model/settings, or tool-managed/unknown:
- Reference, edit, mask, alpha and resolution capabilities verified:
- Representative first asset:
- Batch size and review cadence:
- Existing user approval requirements:
- Resource budget or constraints, if supplied:

## Acceptance criteria

- Subject/factual checks:
- Style and continuity checks:
- Composition and accessibility checks:
- Actual-page or destination checks:
- Reject if:
- Missing-source fallback:

## Delivery

- Master/source storage and access:
- Per-subject or per-family folder convention:
- Version naming and prompt record location:
- Web/print exports and performance budget:
- Media component or publishing pipeline:
- Reviewer and publishing authority:

## Asset record example

```json
{
  "assetId": "subject-id-primary",
  "version": "v001",
  "slot": "primary",
  "fidelityMode": "evidence-bound",
  "promptPath": "candidates/primary-v001.prompt.md",
  "references": [{"path": "originals/source.png", "role": "subject"}],
  "tool": "record actual tool",
  "model": null,
  "settings": {},
  "output": "candidates/primary-v001.png",
  "dimensions": null,
  "hasAlpha": null,
  "reviewStatus": "generated",
  "reviewFindings": [],
  "selected": false,
  "publicationStatus": "unpublished"
}
```

Null means unknown, not verified. Replace example values with observed values.

## Decision log

| Date | Decision / change | Reason | Affected assets |
| --- | --- | --- | --- |
| | | | |
