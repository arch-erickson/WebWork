# Generated imagery

For projects where photography is generated or retouched by a model rather than
shot. Generalised from a jewellery project where the pictures are the product,
so fidelity mattered more than beauty.

Do this only when the subject is either yours to invent, or documented well
enough that a generator is finishing a real photograph rather than making up
the thing being sold.

## The rule that makes it safe

**The generator may improve a photograph. It may never invent the product.**

Write a fidelity contract for the project and keep it beside the assets:

- What must be preserved exactly: the shape, the proportions, the count of
  things, the colours, the materials, the construction.
- What may be improved: dust, handling marks, background, lighting, reflections.
- What is forbidden outright: changing a colour, adding or removing a part,
  inventing detail the source does not support, sharpening into texture that
  was never there.

A picture of something a buyer will receive is a description of the goods.
Anything the generator adds is a claim you cannot honour.

## The pack that goes into every generation

1. **The record.** What the item actually is, in words, before any image.
2. **Real photographs of the item**, the clearest available, as the anchor for
   geometry. Never let the model invent the subject from a description.
3. **An invariant list**, one line per thing that must survive: counts,
   arrangement, colour, dimensions.
4. **A person reference**, if a person appears, so identity is stable across
   every shot rather than a new face each time.
5. **A named role for every input**, and nothing irrelevant in the pack. A
   second item in the references will leak into the result.

If a required feature is not visible in any source, record that as missing
rather than letting the model guess it.

## One call, one shot

Generate a single frame with a single purpose per call. A grid of five views in
one image looks efficient and is unusable: nothing can be cropped, corrected or
replaced independently.

Frame names come from the shot list in `playbook/06-media.md`, and each name
carries its own instructions for camera, distance, background and light.

## Correcting without starting over

Prefer a local correction that fixes one defect and protects the rest of the
image over a regeneration that rolls the dice again. Keep the original beside
the correction.

## After generation, before publishing

- **Normalise the framing in code, not in the prompt.** Asking for identical
  placement every time does not work. Trim, centre and pad to the same canvas
  afterwards, so every card in a grid sits identically.
- **Review against the invariant list**, one item at a time, comparing to the
  real photograph rather than to memory.
- **Keep the master.** Export web sizes only after approval, and keep the
  master where the public cannot reach it.
- **Store the prompt and the inputs beside the output**, as a small JSON file.
  A year later, "how was this made" has an answer, and a reshoot matches.

## What to write down in the blueprint

- Which images are photographed, which are generated, and which are retouched.
- Who approves them.
- The fidelity contract, in full.
- Whether generated imagery is disclosed to the reader, and where. If the
  subject is a real product a customer receives, say yes and mean it.

## Honesty about the tool

Describe what the tool actually exposes. If the interface gives a prompt and
reference images, do not write down seeds, model versions, guidance scales or
denoise settings it never offered: a later reader will try to reproduce them
and find they do not exist. Say what was controlled, and say what varied.
