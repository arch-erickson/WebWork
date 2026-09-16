# 3D and heavy motion

Only if the intake asked for it. A configurator or a scene is a second project
living inside the first, and it sets the performance budget for everything else.

## Decide before any modelling

| Question | Why it decides the work |
| --- | --- |
| Does the 3D sell something a photograph cannot? | If a photograph does the job it wins on every measure |
| How many models, and who makes them? | Modelling and optimisation are specialist work with their own schedule |
| What must a three-year-old phone do? | It sets the polygon and texture budget, and whether there is a fallback at all |
| Interactive, or a scene on a scroll? | Interactive needs a renderer running; a scroll scene is often a video or an image sequence |

## The defaults that keep it sane

- **glTF or GLB with Draco or Meshopt compression.** Nothing else in production.
- **Budgets, written down:** under 150k triangles on screen, textures 1K to 2K,
  under 10MB for a scene on a phone.
- **Load after the page.** The first screen renders and reads before the
  renderer starts. Never block text on a canvas.
- **A fallback that is not an apology:** a still frame of the same scene, shown
  while loading and kept for devices that cannot run it.
- **Stop when hidden.** Pause the loop off screen and in a background tab, or
  the battery cost gets noticed.
- **Render a still of every scene** for cards, previews and sharing.

## Cheaper things to try first

- A pre-rendered turntable as a scrubbed video or an image sequence.
- A high-quality still with a small parallax.
- A short loop with a poster frame.

Each is a fraction of the weight, and on a phone often looks better than a live
renderer fighting for frames.
