/* A worked example, and the kit's own smoke test.

   Run it with `node diagrams/example.js` and open the file it writes. If the
   board draws, the kit is sound in this repository and not only in the project
   it came from.

   It is also the shortest honest answer to "how do I start one of these". */
const fs = require('fs');
const path = require('path');
const { Board, defs } = require('./fx.js');

const b = new Board(1180, 640, 'What runs where');

b.header(30, 36, 'In the browser', "What a visitor's machine does");
b.header(620, 36, 'On the server', 'What runs where you control it');

b.group({ id: 'client', x: 30, y: 70, w: 530, h: 500, title: 'The browser', color: 'blue' });
b.group({ id: 'server', x: 620, y: 70, w: 530, h: 500, title: 'The server', color: 'teal' });

b.stack('client', [
  { id: 'pages', title: 'The pages', sub: 'Every screen, in each language', icon: 'web', tag: 'impl' },
  { id: 'search', title: 'Search and filters', sub: 'From a published index, no server', icon: 'search', tag: 'impl' },
  { id: 'bag', title: 'The bag', sub: 'Kept on the device until sign-in', icon: 'box', tag: 'part' },
]);

b.stack('server', [
  { id: 'api', title: 'The application', sub: 'Pages, the account, its own API', icon: 'server', tag: 'impl' },
  { id: 'db', title: 'The database', sub: 'Clients, orders, pieces', icon: 'db', tag: 'impl' },
  { id: 'files', title: 'The photographs', sub: 'Originals and their smaller copies', icon: 'folder', tag: 'impl' },
]);

b.edge({ from: 'pages', to: 'api', color: 'blue', label: 'asks for a piece' });
b.edge({ from: 'bag', to: 'api', color: 'slate', dashed: true, label: 'merges at sign-in' });
b.edge({ from: 'api', to: 'db', color: 'teal' });
b.edge({ from: 'api', to: 'files', color: 'teal' });

const svg = b.svg('What runs in the browser and what runs on the server');
const css = fs.readFileSync(path.join(__dirname, 'fx.css'), 'utf8');

const page = `<!doctype html>
<meta charset="utf-8">
<title>Diagram kit, worked example</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>:root{--line:#D8DEE4}body{margin:0;padding:2rem;background:#fff;font-family:Inter,system-ui,sans-serif}
${css}</style>
<h1 style="font:600 1.1rem Inter,sans-serif">What runs where</h1>
<div class="diagram">${svg}</div>
${defs()}
`;

const out = path.join(__dirname, 'example.html');
fs.writeFileSync(out, page);
console.log('wrote ' + out + ' (' + fs.statSync(out).size + ' bytes)');
