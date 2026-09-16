# <Project>

<One sentence: what this is and who it is for.>

## The rule that matters most

**If an element appears more than once, it is built once, in the shared module,
and every screen calls it.** A variation is a parameter, never a second copy.

| Concern | File |
| --- | --- |
| Shared components | `<path>` |
| Design tokens | `<path>` |
| Page generator or routes | `<path>` |
| Sample data | `<path>` |

Before writing markup, check whether the component exists. If it half exists,
extend it.

## Build

```bash
<command>
```

Takes about <n> seconds. Run it before looking at any page.

## Verify

```bash
node scripts/verify.mjs <page>
```

Renders the page, reports console errors, overflow, contrast and widths, and
writes screenshots at three sizes. Run it after every visual change.

## Voice

<Client facing and professional. Say what is forbidden: em dashes, words like
"placeholder" or "concept", notes addressed to the designer, exclamation marks.>

## Sample data

Every example record lives in `<path>`. Set `ENABLED` to false and rebuild to
empty every screen. Real data comes from `<source>` through `<generator>` and is
never hand-edited.

## Not yet built

<What must not be connected to real data yet, and why.>
