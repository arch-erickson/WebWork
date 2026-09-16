#!/usr/bin/env node
/* Scaffold a project from the intake answers.
 *
 *   node WebWork/scripts/new-project.mjs --name "Acme" --shape catalogue --into .
 *
 * It writes only what the shape justifies, copies the templates, and leaves a
 * TODO list in docs/next-steps.md. It never overwrites an existing file.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync, cpSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '..');

const arg = (flag, fallback = '') => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const name = arg('--name', 'Project');
const shape = arg('--shape', 'portfolio');
const into = resolve(arg('--into', '.'));

const SHAPES = {
  portfolio:   { data: false, accounts: false, media: 'heavy',  console: false },
  editorial:   { data: true,  accounts: false, media: 'medium', console: true },
  catalogue:   { data: true,  accounts: true,  media: 'heavy',  console: true },
  shop:        { data: true,  accounts: true,  media: 'heavy',  console: true },
  marketing:   { data: false, accounts: false, media: 'medium', console: false },
  application: { data: true,  accounts: true,  media: 'light',  console: true },
  immersive:   { data: false, accounts: false, media: 'heavy',  console: false },
};
const plan = SHAPES[shape];
if (!plan) {
  console.error(`Unknown shape "${shape}". One of: ${Object.keys(SHAPES).join(', ')}`);
  process.exit(1);
}

const write = (rel, body) => {
  const target = join(into, rel);
  if (existsSync(target)) { console.log(`kept    ${rel}`); return; }
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, body);
  console.log(`wrote   ${rel}`);
};
const copy = (from, rel) => {
  const target = join(into, rel);
  if (existsSync(target)) { console.log(`kept    ${rel}`); return; }
  mkdirSync(dirname(target), { recursive: true });
  cpSync(join(KIT, from), target);
  console.log(`wrote   ${rel}`);
};
const tpl = (rel) => readFileSync(join(KIT, rel), 'utf8');

// Folders every shape gets.
for (const dir of ['docs', 'styles', 'lib', 'content', 'scripts', 'assets', 'pages']) {
  mkdirSync(join(into, dir), { recursive: true });
}

copy('templates/tokens.css', 'styles/tokens.css');
copy('templates/components.js', 'lib/components.js');
copy('templates/blueprint.md', 'docs/blueprint.md');
copy('templates/handoff.md', 'docs/handoff-template.md');
copy('scripts/verify.mjs', 'scripts/verify.mjs');
copy('intake/answers.template.md', 'docs/intake.md');

write('CLAUDE.md', tpl('templates/CLAUDE.md').replace('# <Project>', `# ${name}`));

write('content/sample.js', `/* Every example record lives here and nowhere else.
   Set ENABLED to false and rebuild to empty every screen, so the empty states
   are built and checked rather than imagined. */
const ENABLED = true;
const off = (v) => (ENABLED ? v : (Array.isArray(v) ? [] : null));

const items = [
  // { slug: 'first', name: 'First item', meta: 'One of one', img: 'assets/first.jpg' },
];

module.exports = { ENABLED, items: off(items) };
`);

write('styles/base.css', `/* Element defaults. Everything with a value comes from tokens.css. */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0; background: var(--paper); color: var(--ink);
  font-family: var(--sans); font-size: var(--step-0); line-height: var(--lh-text);
}
img, video, canvas { max-width: 100%; height: auto; display: block; }
h1, h2, h3, h4 { font-family: var(--serif); font-weight: 400; line-height: var(--lh-tight); margin: 0; }
p { margin: 0 0 var(--s-4); max-width: var(--measure); }
a { color: inherit; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
[hidden] { display: none !important; }
.wrap { width: 100%; max-width: var(--max); margin-inline: auto; padding-inline: var(--gutter); }
.section { padding-block: var(--stack); }
`);

write('docs/next-steps.md', `# Next steps for ${name}

Shape: **${shape}**. Generated ${new Date().toISOString().slice(0, 10)}.

1. Fill in \`docs/intake.md\` with the answers in the client's own words.
2. Write \`docs/blueprint.md\` from them. Delete the sections this project does
   not justify; keep the numbering of the ones you keep.
3. Set the type scale and colour in \`styles/tokens.css\`, then run the harness
   on the empty shell for a baseline:
   \`node scripts/verify.mjs pages/index.html\`
4. Build the one page that carries the point of the site, with real content, at
   1440, 1024 and 390.
5. Extract everything repeated into \`lib/components.js\`.
${plan.data ? '6. Choose the data store from `WebWork/stacks/data.md` and write the content model into the blueprint before building the editor.\n' : '6. No database planned for this shape: content lives in `content/` and the repository.\n'}${plan.accounts ? '7. Choose sign-in methods from `WebWork/stacks/auth.md`. Write the linking and verification rules into the blueprint before any screen is built.\n' : '7. No accounts planned for this shape. If that changes, read `WebWork/playbook/07-data-and-accounts.md` first.\n'}${plan.console ? '8. The roles matrix comes before the console screens.\n' : ''}${plan.media === 'heavy' ? '9. Define the shot list and the framing rule before the first photograph: `WebWork/playbook/06-media.md`.\n' : ''}${shape === 'immersive' ? '10. Set the 3D budget before any modelling: `WebWork/stacks/three-d.md`.\n' : ''}
Gates to run before calling any page done: \`WebWork/playbook/09-quality-gates.md\`.
`);

console.log(`\nScaffolded "${name}" as a ${shape} project in ${into}`);
console.log('Read docs/next-steps.md');
