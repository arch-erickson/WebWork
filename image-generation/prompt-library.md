# Reusable image prompt patterns

Read the [playbook](playbook.md) and fill the [project brief](project-brief.template.md) first.
Replace braces; attach the actual inputs; delete irrelevant lines. Each pattern produces one
deliverable. These are instructions, not claims about settings or capabilities of every tool.

## New creative image

```text
Create one {medium} for {purpose and placement}.
Subject: {specific subject, action and distinguishing attributes}.
Setting: {environment and relevant context}.
Composition: {viewpoint, subject placement, frame ratio, focal point and negative space}.
Visual language: {palette, light, texture, mood and style anchors}.
Creative freedom: {what may be invented}; retain {fixed story or brand constraints}.
Avoid {specific unwanted elements}. {Output requirements supported by the tool}.
```

## Real product or factual subject

```text
Input 1 defines the actual subject. Input 2 supports {other view or feature}.
Create one {primary / detail / alternate / in-use} image for {placement}.
Preserve {verified distinguishing geometry, materials, colors, counts and construction}.
Change only {background, lighting, permitted surface cleanup or scene}.
Compose {view, scale within frame, whole-object visibility and margins}.
Use {project art direction}. Remove {identified photographic support, if appropriate}.
Do not invent hidden features, change the product or make unsupported size claims.
```

## Person or recurring character

```text
Input 1 is the identity reference; input 2 controls {style or wardrobe, if needed}.
Create one {portrait / scene} of this same {person or fictional character}.
Preserve {facial proportions, body proportions, silhouette, hair or character-specific anchors}.
Change {permitted pose, clothing, setting and lighting}.
Use {project art direction}. Render {natural skin detail / agreed stylized surface treatment}.
Anatomy and contact must suit the pose. Avoid unrelated identity changes or extra accessories.
```

## Product in use / compositing

```text
Input 1 defines the exact product. Input 2 defines {person / environment / host object}.
Show the product {specific use or placement}.
Preserve the product's {invariants} and the host's {invariants}.
Physical result: {correct attachment, contact, scale, orientation, occlusion and gravity}.
Match light direction, reflections, perspective and shadow to the scene.
Change only {permitted scene or styling elements}. Do not reshape the product to make it fit.
```

## Precise edit / inpainting

```text
Edit input 1. Change only {region or attribute}; use the supplied mask if the tool supports it.
The required visible result is {concrete outcome}.
Input 2 defines {correct detail or identity}.
Keep {successful composition, subject, light, background and other protected features}.
Do not change {critical invariants}. No unrelated regeneration or extra objects.
```

## Outpainting / aspect-ratio extension

```text
Extend input 1 to {target ratio} by adding space at {edges}.
Preserve the existing subject, its proportions and {protected content}.
Continue {environment, perspective, light, texture and depth} naturally into the new area.
Leave {specified region} quiet for {page heading or layout use}.
Do not stretch the original image, duplicate the subject or invent unwanted foreground objects.
```

## Transparent cutout

```text
Isolate the exact subject in input 1, preserving its silhouette, colors and fine edges.
Remove the backdrop, including through genuine openings. Retain {permitted translucent edges
or soft shadow} if appropriate. Do not remove {real structural parts that resemble supports}.
Deliver actual alpha transparency in a supported format, not a painted checkerboard or white
rectangle. Keep the complete subject visible with {margin}. Do not redesign or distort it.
```

If the tool cannot output alpha, use a supported cutout workflow and inspect it, or report the
limitation. A request for transparency is not evidence that the output actually has it.

## Website hero

```text
Create one {photograph / illustration} for the {page} hero.
Message: {what it should communicate}. Subject: {concrete description}.
Compose for {desktop ratio}, with the focal subject at {position} and calm negative space
at {position} for real HTML text. Respect {mobile safe region or separate mobile variant brief}.
Use {brand art direction}. Keep essential details away from the crop boundaries.
Do not bake the website heading, buttons or navigation into the picture.
```

## Illustration series

```text
Create one illustration representing {concept} in the established series.
Match reference {input} for {line weight, shapes, palette, perspective, shading and texture}.
Depict {specific scene or visual metaphor}, with {fixed recurring characters or objects}.
Vary only {allowed attributes}. Use {canvas ratio and placement}.
Keep the visual hierarchy clear at {display size}. Avoid unexplained symbols or accidental text.
```

## Food / hospitality

```text
Create one {dish / interior / preparation} image for {placement}.
Reference {input} defines the actual {dish or venue}; preserve {ingredients, portion, plating,
architecture or distinguishing features that must remain true}.
Use {lighting, palette and composition}; change {permitted styling only}.
Keep materials and textures appetizing and plausible without inventing what customers receive.
For a purely illustrative scene, use the explicitly agreed creative freedom instead.
```

## Architecture / interiors

```text
Task mode: {documentary edit / design concept}.
Reference {input} defines {existing geometry, openings, furniture or site conditions}.
Preserve {constraints}. Change or propose {authorized materials, furnishing, landscape or design}.
Viewpoint: {supported camera angle or conceptual view}. Light: {direction and conditions}.
Keep perspective, scale, structure and contact plausible. Distinguish imagined design changes
from the existing built condition in the asset record and its eventual presentation.
```

## Texture / background

```text
Create one {material texture / abstract background} for {use}.
Specify {surface, pattern scale, palette, light and detail level}.
Require {seamless tiling / non-tiling composition / calm text region} as applicable.
Avoid unwanted recognizable objects, logos, borders or lighting gradients that break the use.
```

Check tiling seams mechanically when seamless output is required. For physically based rendering,
do not label a beauty image as a calibrated normal, roughness or displacement map without validation.

## Text, diagrams and interfaces

Use an actual renderer for factual charts, interfaces and exact diagrams. If a generated concept
is appropriate, specify its illustrative status, layout and exact labels, then verify each label
and relationship. Keep production text editable when possible. Never describe a generated
interface image as a functioning page or a fabricated chart as measured data.

## A concise correction example

Weak: "Fix how the object is attached."

Better: "The pendant must hang from its real top bail. Route the existing chain through that
opening, with natural tension and gravity. Keep the pendant design, chain style, model, clothing,
lighting and crop unchanged. Remove the incorrect connection at the side setting."

The principle applies to any physical subject: specify the intended visible relationship and
protect everything that should remain unchanged.
