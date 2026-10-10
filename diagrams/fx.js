// Figma-style SVG diagram renderer: boards (cards, groups, arrows), sequence
// flows and ERD tables. Every diagram shares one icon and marker set.
const fs = require('fs'), path = require('path');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const PAL = {
  blue:   { fill: '#EFF6FF', stroke: '#60A5FA', tab: '#2563EB', arrow: '#3B82F6' },
  violet: { fill: '#F5F3FF', stroke: '#A78BFA', tab: '#7C3AED', arrow: '#8B5CF6' },
  teal:   { fill: '#EDFAF7', stroke: '#2DD4BF', tab: '#0D9488', arrow: '#14B8A6' },
  gold:   { fill: '#FFFBEB', stroke: '#FBBF24', tab: '#B45309', arrow: '#E29A12' },
  slate:  { fill: '#F8FAFC', stroke: '#CBD5E1', tab: '#64748B', arrow: '#94A3B8' },
  red:    { fill: '#FEF2F2', stroke: '#FCA5A5', tab: '#DC2626', arrow: '#DC2626' },
  green:  { fill: '#F0FDF4', stroke: '#86EFAC', tab: '#16A34A', arrow: '#22C55E' },
  purple: { fill: '#FAF5FF', stroke: '#D8B4FE', tab: '#6D28D9', arrow: '#7C3AED' },
  ink:    { fill: '#F8FAFC', stroke: '#94A3B8', tab: '#334155', arrow: '#475569' },
};
const TAG = {
  impl: ['Implemented', '#DCFCE7', '#166534'], part: ['Partial', '#FEF3C7', '#92400E'], miss: ['Missing', '#FEE2E2', '#991B1B'],
  ref: ['Refactor', '#FFEDD5', '#9A3412'], post: ['Post-MVP', '#E0E7FF', '#3730A3'],
  works: ['Works', '#DCFCE7', '#166534'], looks: ['Looks only', '#FEF3C7', '#92400E'], off: ['Off', '#F1F5F9', '#475569'],
  local: ['Local only', '#FEF3C7', '#92400E'], none: ['Absent', '#FEE2E2', '#991B1B'],
  new: ['New', '#DCFCE7', '#166534'], change: ['Change', '#FFEDD5', '#9A3412'], private: ['Private', '#F1F5F9', '#475569'],
  untrusted: ['Untrusted', '#FEE2E2', '#991B1B'], trusted: ['Trusted', '#DCFCE7', '#166534'], secret: ['Secret', '#EDE9FE', '#5B21B6'],
  owner: ['Owner', '#F1F5F9', '#475569'], codex: ['Codex', '#E0F2FE', '#075985'], claude: ['Claude', '#F5F3FF', '#5B21B6'], everyone: ['Everyone', '#F1F5F9', '#475569'],
};
const tagOf = t => (typeof t === 'string' ? TAG[t] : [t.text, t.bg, t.fg]);

// Approximate text widths for Inter / Cormorant at a given size.
const tw = (s, size, bold) => String(s).length * size * (bold ? 0.58 : 0.53);
const wrap = (s, size, max, bold) => {
  if (!s) return [];
  const words = String(s).split(' '), out = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (tw(t, size, bold) > max && line) { out.push(line); line = w; } else line = t; }
  if (line) out.push(line);
  return out;
};

function tagSvg(t, rightX, y) {
  const [text, bg, fg] = tagOf(t);
  const w = Math.round(tw(text, 10, true) + 18);
  const x = rightX - w;
  return `<rect x="${x}" y="${y}" width="${w}" height="18" rx="9" fill="${bg}" stroke="${fg}" stroke-opacity=".35"/><text x="${x + w / 2}" y="${y + 13}" text-anchor="middle" class="fg" fill="${fg}">${esc(text)}</text>`;
}

function roundPath(pts, r = 10) {
  // A corner between two identical points has no direction (and divides by zero).
  pts = pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 0.01);
  if (pts.length < 2) pts = [pts[0], pts[0]];
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py), l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx - (cx - px) / l1 * rr, ay = cy - (cy - py) / l1 * rr;
    const bx = cx + (nx - cx) / l2 * rr, by = cy + (ny - cy) / l2 * rr;
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${cx} ${cy} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return d + ` L${lx} ${ly}`;
}

class Board {
  constructor(w, h, label) { this.w = w; this.h = h; this.label = label; this.heads = []; this.groups = []; this.cards = []; this.edges = []; this.extras = []; this.top = []; this.nodes = {}; }
  header(x, y, title, sub, tag) { this.heads.push({ x, y, title, sub, tag }); return this; }
  group(g) { g.color = g.color || 'slate'; this.groups.push(g); this.nodes[g.id] = g; return g; }
  card(c) {
    c.w = c.w || 260;
    const tx = c.icon ? 52 : 16, avail = c.w - tx - 14;
    c._t = wrap(c.title, 13, avail, true); c._s = wrap(c.sub, 10.8, avail);
    if (c._s.length > 3) c._s = c._s.slice(0, 3);
    c.h = c.h || Math.max(54, 20 + c._t.length * 16 + c._s.length * 14 + 6);
    this.cards.push(c); this.nodes[c.id] = c; return c;
  }
  // Place cards in a column inside a group (or at a point), sizing the group to fit.
  stack(gid, list, { top = 58, gap = 16, pad = 20, x, y, w } = {}) {
    const g = gid ? this.nodes[gid] : null;
    let cy = g ? g.y + top : y;
    const cx = g ? g.x + pad : x, cw = g ? g.w - pad * 2 : w;
    for (const c of list) { c.x = cx; c.y = cy; c.w = c.w || cw; this.card(c); cy += c.h + gap; }
    if (g && !g.fixedH) g.h = Math.max(g.h || 0, cy - gap - g.y + pad);
    return list;
  }
  // Place cards in a row inside a group.
  row(gid, list, { top = 58, gap = 16, pad = 20 } = {}) {
    const g = this.nodes[gid];
    const cw = (g.w - pad * 2 - gap * (list.length - 1)) / list.length;
    let cx = g.x + pad, maxH = 0;
    for (const c of list) { c.x = cx; c.y = g.y + top; c.w = c.w || cw; this.card(c); cx += c.w + gap; maxH = Math.max(maxH, c.h); }
    if (!g.fixedH) g.h = Math.max(g.h || 0, top + maxH + pad);
    return list;
  }
  edge(e) { this.edges.push(e); return this; }
  pill(x, y, text, color = 'red') { const p = PAL[color]; this.top.push(`<rect x="${x}" y="${y}" width="${tw(text, 10, true) + 20}" height="21" rx="10.5" fill="${p.fill}" stroke="${p.tab}" stroke-opacity=".5"/><text x="${x + (tw(text, 10, true) + 20) / 2}" y="${y + 14.5}" text-anchor="middle" class="fg" fill="${p.tab}">${esc(text)}</text>`); return this; }
  raw(s, onTop) { (onTop ? this.top : this.extras).push(s); return this; }
  note(x, y, w, text, color = 'gold') {
    const lines = wrap(text, 12, w - 28); const h = lines.length * 16 + 22; const p = PAL[color];
    this.top.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${p.fill}" stroke="${p.stroke}"/>` + lines.map((l, i) => `<text x="${x + 14}" y="${y + 24 + i * 16}" class="fn">${esc(l)}</text>`).join(''));
    return this;
  }

  anchor(n, side, at, abs) {
    if (side === 'top') return [abs != null ? abs : n.x + n.w * at, n.y];
    if (side === 'bottom') return [abs != null ? abs : n.x + n.w * at, n.y + n.h];
    if (side === 'left') return [n.x, abs != null ? abs : n.y + n.h * at];
    return [n.x + n.w, abs != null ? abs : n.y + n.h * at];
  }
  route(e) {
    const a = this.nodes[e.from], b = this.nodes[e.to];
    if (!a || !b) throw new Error('edge node missing ' + e.from + ' ' + e.to);
    let fs = e.fs, ts = e.ts;
    if (!fs || !ts) {
      if (b.y >= a.y + a.h - 2) { fs = fs || 'bottom'; ts = ts || 'top'; }
      else if (a.y >= b.y + b.h - 2) { fs = fs || 'top'; ts = ts || 'bottom'; }
      else if (b.x >= a.x + a.w) { fs = fs || 'right'; ts = ts || 'left'; }
      else { fs = fs || 'left'; ts = ts || 'right'; }
    }
    const vert = s => s === 'top' || s === 'bottom';
    let fx = e.fx, tx = e.tx, fy = e.fy, ty = e.ty;
    if (vert(fs) && vert(ts) && fx == null && tx == null) {
      const lo = Math.max(a.x, b.x), hi = Math.min(a.x + a.w, b.x + b.w);
      if (hi - lo > 24) fx = tx = Math.round((lo + hi) / 2);
    }
    if (!vert(fs) && !vert(ts) && fy == null && ty == null) {
      const lo = Math.max(a.y, b.y), hi = Math.min(a.y + a.h, b.y + b.h);
      if (hi - lo > 16) fy = ty = Math.round((lo + hi) / 2);
    }
    const p0 = this.anchor(a, fs, e.fat ?? 0.5, vert(fs) ? fx : fy);
    const p1 = this.anchor(b, ts, e.tat ?? 0.5, vert(ts) ? tx : ty);
    let pts = [p0];
    if (e.via) pts.push(...e.via);
    else if (vert(fs) && vert(ts) && p0[0] !== p1[0]) { const my = e.midY ?? Math.round((p0[1] + p1[1]) / 2); pts.push([p0[0], my], [p1[0], my]); }
    else if (!vert(fs) && !vert(ts) && p0[1] !== p1[1]) { const mx = e.midX ?? Math.round((p0[0] + p1[0]) / 2); pts.push([mx, p0[1]], [mx, p1[1]]); }
    else if (vert(fs) && !vert(ts)) pts.push([p0[0], p1[1]]);
    else if (!vert(fs) && vert(ts)) pts.push([p1[0], p0[1]]);
    pts.push(p1);
    return pts;
  }
  renderEdge(e) {
    const col = (PAL[e.color] || PAL.slate).arrow;
    const pts = this.route(e);
    const dash = e.dashed ? ' stroke-dasharray="6 5"' : '';
    const both = e.both ? ` marker-start="url(#m-${e.color || 'slate'})"` : '';
    const end = e.noArrow ? '' : ` marker-end="url(#m-${e.color || 'slate'})"`;
    const link = e.from ? ` data-from="${esc(e.from)}" data-to="${esc(e.to)}"` : '';
    let s = `<path${link} d="${roundPath(pts)}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"${dash}${end}${both}/>`;
    let lab = '';
    if (e.label) {
      let best = 0, bi = 0;
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (l > best) { best = l; bi = i; } }
      const [ax, ay] = pts[bi - 1], [bx, by] = pts[bi];
      let lx = (ax + bx) / 2, ly = (ay + by) / 2, anchor = 'middle';
      if (Math.abs(ax - bx) < 1) { lx += 10; ly += 4; anchor = 'start'; } else { ly -= 9; }
      if (e.lx != null) lx = e.lx; if (e.ly != null) ly = e.ly; if (e.anchor) anchor = e.anchor;
      const lines = String(e.label).split('\n');
      lab = lines.map((l, i) => `<text${link} x="${lx}" y="${ly + i * 14}" class="fl" text-anchor="${anchor}"${e.labelColor ? ` style="fill:${e.labelColor};font-weight:600"` : ''}>${esc(l)}</text>`).join('');
    }
    return { path: s, label: lab };
  }
  renderCard(c) {
    const col = (PAL[c.color] || PAL.slate).arrow;
    const dash = c.dashed ? ' stroke-dasharray="6 4"' : '';
    let s = c.id ? `<g class="node" data-node="${esc(c.id)}">` : '<g>';
    if (!c.dashed) s += `<rect x="${c.x + 5}" y="${c.y + 5}" width="${c.w}" height="${c.h}" rx="8" fill="#FFFFFF" stroke="#334155" stroke-width="1.2"/>`;
    s += `<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="8" fill="${c.fill || '#FFFFFF'}" stroke="${c.dashed ? '#64748B' : '#334155'}" stroke-width="1.5"${dash}/>`;
    const tx = c.icon ? 52 : 16;
    if (c.icon) s += `<use href="#i-${c.icon}" x="${c.x + 12}" y="${c.y + (c.h - 30) / 2}" width="30" height="30" color="${col}"/>`;
    const block = c._t.length * 16 + c._s.length * 14;
    let y = c.y + (c.h - block) / 2 + 12;
    for (const l of c._t) { s += `<text x="${c.x + tx}" y="${y}" class="ft">${esc(l)}</text>`; y += 16; }
    y += 1;
    for (const l of c._s) { s += `<text x="${c.x + tx}" y="${y}" class="fs">${esc(l)}</text>`; y += 14; }
    if (c.tag) s += tagSvg(c.tag, c.x + c.w - 12, c.y - 9);
    return s + '</g>';
  }
  renderGroup(g) {
    const p = PAL[g.color];
    const lw = Math.round(tw(g.label, 15, true) + 30);
    let s = `<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="14" fill="${p.fill}" stroke="${p.stroke}" stroke-width="1.4"${g.dashed ? ' stroke-dasharray="7 5"' : ''}/>`;
    s += `<rect x="${g.x + 16}" y="${g.y - 15}" width="${lw}" height="30" rx="8" fill="${p.tab}"/><text x="${g.x + 31}" y="${g.y + 5.5}" class="fp" fill="#FFFFFF">${esc(g.label)}</text>`;
    if (g.tag) s += tagSvg(g.tag, g.x + g.w - 14, g.y - 9);
    if (g.note) wrap(g.note, 12, g.w - 40).slice(0, 2).forEach((l, i) => { s += `<text x="${g.x + 18}" y="${g.y + 36 + i * 15}" class="fc">${esc(l)}</text>`; });
    return s;
  }
  svg(aria) {
    for (const c of this.cards) if (c.h == null) this.card(c);
    const maxY = Math.max(...this.groups.map(g => g.y + g.h), ...this.cards.map(c => c.y + c.h + 5), 0);
    const H = this.h || Math.ceil(maxY + 30);
    let s = `<svg class="fx" viewBox="0 0 ${this.w} ${H}" role="img" aria-label="${esc(aria || this.label || 'Diagram')}"><rect width="${this.w}" height="${H}" fill="#FFFFFF"/>`;
    for (const h of this.heads) {
      s += `<text x="${h.x}" y="${h.y}" class="fh">${esc(h.title)}</text>`;
      if (h.sub) s += `<text x="${h.x}" y="${h.y + 21}" class="fhs">${esc(h.sub)}</text>`;
    }
    s += this.extras.join('');
    for (const g of this.groups) s += this.renderGroup(g);
    const rendered = this.edges.map(e => this.renderEdge(e));
    s += rendered.map(r => r.path).join('');
    for (const c of this.cards) s += this.renderCard(c);
    s += rendered.map(r => r.label).join('');
    s += this.top.join('');
    return s + '</svg>';
  }
}

// ---------------------------------------------------------------- sequence
function sequence({ participants, steps, colW = 176, aria }) {
  const n = participants.length, left = 24, W = left * 2 + n * colW;
  const cx = i => left + i * colW + colW / 2;
  const idx = {}; participants.forEach((p, i) => { idx[p.id] = i; });
  let body = '', labels = '', frames = '', num = 0;
  let y = 128;
  const msg = st => {
    const a = idx[st.from], b = idx[st.to];
    if (a == null || b == null) throw new Error('seq participant ' + st.from + ' ' + st.to);
    const color = (PAL[st.color || participants[a].color] || PAL.slate).arrow;
    num++;
    if (a === b) {
      const lines = wrap(st.text, 11.5, colW * 1.6);
      const x = cx(a), h = 26;
      body += `<path d="M${x + 4} ${y} H${x + 34} Q${x + 42} ${y} ${x + 42} ${y + 8} V${y + h - 8} Q${x + 42} ${y + h} ${x + 34} ${y + h} H${x + 8}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" marker-end="url(#m-${st.color || participants[a].color})"${st.dashed ? ' stroke-dasharray="5 4"' : ''}/>`;
      body += `<circle cx="${x - 14}" cy="${y}" r="9" fill="${color}"/><text x="${x - 14}" y="${y + 3.6}" text-anchor="middle" class="fnum">${num}</text>`;
      lines.forEach((l, i) => { labels += `<text x="${x + 52}" y="${y + 9 + i * 14}" class="fl">${esc(l)}</text>`; });
      y += Math.max(h, lines.length * 14) + 22;
      return;
    }
    const x1 = cx(a), x2 = cx(b), dir = x2 > x1 ? 1 : -1;
    const span = Math.abs(x2 - x1) - 30;
    const lines = wrap(st.text, 11.5, Math.max(span, 150));
    const ly = y + lines.length * 14 - 4;
    lines.forEach((l, i) => { labels += `<text x="${(x1 + x2) / 2}" y="${y + 10 + i * 14}" text-anchor="middle" class="fl">${esc(l)}</text>`; });
    const ay = ly + 12;
    body += `<path d="M${x1 + dir * 14} ${ay} H${x2 - dir * 4}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" marker-end="url(#m-${st.color || participants[a].color})"${st.dashed ? ' stroke-dasharray="6 5"' : ''}/>`;
    body += `<circle cx="${x1}" cy="${ay}" r="9" fill="${color}"/><text x="${x1}" y="${ay + 3.6}" text-anchor="middle" class="fnum">${num}</text>`;
    y = ay + 26;
  };
  const run = list => {
    for (const st of list) {
      if (st.alt) {
        const top = y; y += 30;
        const divs = [];
        st.alt.forEach((br, i) => {
          if (i > 0) { divs.push(y - 8); y += 18; }
          const by = y - 14;
          labels += `<text x="${left + 96}" y="${by + (i === 0 ? -6 : 8)}" class="falt">${esc(br.label)}</text>`;
          y += 10;
          run(br.steps);
        });
        const bottom = y - 6;
        frames += `<rect x="${left + 6}" y="${top}" width="${W - left * 2 - 12}" height="${bottom - top}" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.3"/>`;
        frames += `<rect x="${left + 6}" y="${top}" width="72" height="24" rx="8" fill="#64748B"/><text x="${left + 42}" y="${top + 16}" text-anchor="middle" class="fg" fill="#FFFFFF">${esc(st.kind || 'If')}</text>`;
        divs.forEach(dy => { frames += `<path d="M${left + 6} ${dy} H${W - left - 6}" stroke="#CBD5E1" stroke-width="1.3" stroke-dasharray="6 5"/>`; });
        y += 14;
      } else if (st.note) {
        const a = idx[st.over[0]], b = idx[st.over[1] || st.over[0]];
        const x = left + Math.min(a, b) * colW + 12, w = (Math.abs(b - a) + 1) * colW - 24;
        const lines = wrap(st.note, 12, w - 28), h = lines.length * 16 + 18;
        labels += `<rect x="${x}" y="${y - 6}" width="${w}" height="${h}" rx="8" fill="#FFFBEB" stroke="#FBBF24"/>` + lines.map((l, i) => `<text x="${x + w / 2}" y="${y + 13 + i * 16}" text-anchor="middle" class="fn">${esc(l)}</text>`).join('');
        y += h + 18;
      } else msg(st);
    }
  };
  run(steps);
  const H = y + 20;
  let head = '';
  participants.forEach((p, i) => {
    const w = colW - 18, x = cx(i) - w / 2, col = (PAL[p.color] || PAL.slate).arrow;
    const t = wrap(p.title, 12.5, w - 56, true).slice(0, 2), sb = wrap(p.sub, 10.3, w - 56).slice(0, 2);
    const h = 62;
    head += `<path d="M${cx(i)} ${20 + h} V${H - 12}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    head += `<rect x="${x + 4}" y="${24}" width="${w}" height="${h}" rx="8" fill="#FFFFFF" stroke="#334155" stroke-width="1.1"/><rect x="${x}" y="20" width="${w}" height="${h}" rx="8" fill="#FFFFFF" stroke="#334155" stroke-width="1.5"/>`;
    head += `<rect x="${x}" y="20" width="5" height="${h}" rx="2" fill="${col}"/>`;
    if (p.icon) head += `<use href="#i-${p.icon}" x="${x + 12}" y="${20 + (h - 28) / 2}" width="28" height="28" color="${col}"/>`;
    const tx = x + (p.icon ? 46 : 16);
    const block = t.length * 15 + sb.length * 13;
    let ty = 20 + (h - block) / 2 + 11;
    t.forEach(l => { head += `<text x="${tx}" y="${ty}" class="ft" style="font-size:12.5px">${esc(l)}</text>`; ty += 15; });
    sb.forEach(l => { head += `<text x="${tx}" y="${ty}" class="fs" style="font-size:10.3px">${esc(l)}</text>`; ty += 13; });
  });
  return `<svg class="fx seq" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria || 'Sequence diagram')}"><rect width="${W}" height="${H}" fill="#FFFFFF"/>${frames}${head}${body}${labels}</svg>`;
}

// ---------------------------------------------------------------- ERD
function erd({ w: W, tables, rels, aria, notes = [] }) {
  const T = {};
  const RH = 23, HH = 40;
  let s = '', lines = '', labels = '';
  for (const t of tables) { t.w = t.w || 272; t.h = HH + t.rows.length * RH + 10; T[t.id] = t; }
  const H = Math.max(...tables.map(t => t.y + t.h)) + 40 + (notes.length ? 0 : 0);
  const side = (t, sd, at) => sd === 'left' ? [t.x, t.y + at] : sd === 'right' ? [t.x + t.w, t.y + at] : sd === 'top' ? [t.x + at, t.y] : [t.x + at, t.y + t.h];
  const rowY = (t, name) => { const i = t.rows.findIndex(r => r[1] === name); return i < 0 ? t.h / 2 : HH + i * RH + RH / 2 + 4; };
  for (const r of rels) {
    const a = T[r.from], b = T[r.to];
    const fs = r.fs || (b.x > a.x + a.w ? 'right' : b.x + b.w < a.x ? 'left' : b.y > a.y ? 'bottom' : 'top');
    const ts = r.ts || (fs === 'right' ? 'left' : fs === 'left' ? 'right' : fs === 'bottom' ? 'top' : 'bottom');
    const fa = r.fat != null ? r.fat : (fs === 'left' || fs === 'right') ? rowY(a, r.fcol) : a.w / 2;
    const ta = r.tat != null ? r.tat : (ts === 'left' || ts === 'right') ? rowY(b, r.tcol) : b.w / 2;
    const p0 = side(a, fs, fa), p1 = side(b, ts, ta);
    const horiz = fs === 'left' || fs === 'right';
    let pts;
    if (r.via) pts = [p0, ...r.via, p1];
    else if (horiz && (ts === 'left' || ts === 'right')) { const mx = r.midX ?? (p0[0] + p1[0]) / 2; pts = [p0, [mx, p0[1]], [mx, p1[1]], p1]; }
    else if (!horiz && !(ts === 'left' || ts === 'right')) { const my = r.midY ?? (p0[1] + p1[1]) / 2; pts = [p0, [p0[0], my], [p1[0], my], p1]; }
    else if (horiz) pts = [p0, [p1[0], p0[1]], p1];
    else pts = [p0, [p0[0], p1[1]], p1];
    lines += `<path d="${roundPath(pts, 8)}" fill="none" stroke="#64748B" stroke-width="1.6"${r.dashed ? ' stroke-dasharray="5 4"' : ''}/>`;
    const glyph = (p, q, kind) => {
      const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const at = d => [p[0] + ux * d, p[1] + uy * d];
      let g = '';
      const tick = d => { const [x, y] = at(d); g += `<path d="M${x + nx * 7} ${y + ny * 7} L${x - nx * 7} ${y - ny * 7}" stroke="#334155" stroke-width="1.6"/>`; };
      if (kind === 'many') { const [x, y] = at(14); g += `<path d="M${p[0] + nx * 8} ${p[1] + ny * 8} L${x} ${y} L${p[0] - nx * 8} ${p[1] - ny * 8}" fill="none" stroke="#334155" stroke-width="1.6"/>`; tick(18); }
      else if (kind === 'one') { tick(8); tick(14); }
      else if (kind === 'zero-one') { tick(8); const [x, y] = at(19); g += `<circle cx="${x}" cy="${y}" r="4.5" fill="#FFFFFF" stroke="#334155" stroke-width="1.5"/>`; }
      else if (kind === 'zero-many') { const [x, y] = at(14); g += `<path d="M${p[0] + nx * 8} ${p[1] + ny * 8} L${x} ${y} L${p[0] - nx * 8} ${p[1] - ny * 8}" fill="none" stroke="#334155" stroke-width="1.6"/>`; const [cx2, cy2] = at(24); g += `<circle cx="${cx2}" cy="${cy2}" r="4.5" fill="#FFFFFF" stroke="#334155" stroke-width="1.5"/>`; }
      return g;
    };
    lines += glyph(p0, pts[1], r.a || 'one') + glyph(p1, pts[pts.length - 2], r.b || 'many');
    if (r.label) {
      let best = 0, bi = 1;
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (l > best) { best = l; bi = i; } }
      const [ax, ay] = pts[bi - 1], [bx, by] = pts[bi];
      const lx = r.lx ?? (ax + bx) / 2, ly = r.ly ?? (ay + by) / 2;
      const lw = tw(r.label, 10.5) + 16;
      if (r.lx == null && best < lw + 12) continue;
      labels += `<rect x="${lx - lw / 2}" y="${ly - 10}" width="${lw}" height="19" rx="9.5" fill="#FFFFFF" stroke="#CBD5E1"/><text x="${lx}" y="${ly + 3.5}" text-anchor="middle" class="frel">${esc(r.label)}</text>`;
    }
  }
  const KEY = { pk: ['PK', '#FEF3C7', '#92400E'], fk: ['FK', '#DBEAFE', '#1E40AF'], uk: ['UK', '#F1F5F9', '#475569'], pkfk: ['PK FK', '#FEF3C7', '#92400E'] };
  for (const t of tables) {
    const p = PAL[t.color || 'slate'];
    s += `<g><rect x="${t.x + 5}" y="${t.y + 5}" width="${t.w}" height="${t.h}" rx="9" fill="#FFFFFF" stroke="#334155" stroke-width="1.1"/>`;
    s += `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="9" fill="#FFFFFF" stroke="#334155" stroke-width="1.5"${t.dashed ? ' stroke-dasharray="6 4"' : ''}/>`;
    s += `<path d="M${t.x + 1} ${t.y + HH} V${t.y + 9} Q${t.x + 1} ${t.y + 1} ${t.x + 9} ${t.y + 1} H${t.x + t.w - 9} Q${t.x + t.w - 1} ${t.y + 1} ${t.x + t.w - 1} ${t.y + 9} V${t.y + HH} Z" fill="${p.fill}"/>`;
    s += `<path d="M${t.x} ${t.y + HH} H${t.x + t.w}" stroke="${p.stroke}" stroke-width="1.3"/>`;
    s += `<rect x="${t.x + 12}" y="${t.y + 12}" width="6" height="16" rx="3" fill="${p.tab}"/>`;
    s += `<text x="${t.x + 26}" y="${t.y + 25}" class="ftab">${esc(t.name)}</text>`;
    if (t.tag) s += tagSvg(t.tag, t.x + t.w - 10, t.y + 11);
    t.rows.forEach((r, i) => {
      const y = t.y + HH + i * RH + 4;
      if (i % 2 === 1) s += `<rect x="${t.x + 1.5}" y="${y}" width="${t.w - 3}" height="${RH}" fill="#F8FAFC"/>`;
      const [k, name, type, flag] = r;
      let x = t.x + 12;
      if (k && KEY[k]) { const [kt, bg, fg] = KEY[k]; const kw = tw(kt, 9, true) + 10; s += `<rect x="${x}" y="${y + 5}" width="${kw}" height="14" rx="3" fill="${bg}"/><text x="${x + kw / 2}" y="${y + 15}" text-anchor="middle" class="fkey" fill="${fg}">${kt}</text>`; }
      x = t.x + 58;
      s += `<text x="${x}" y="${y + 16}" class="fcol">${esc(name)}</text>`;
      let rx = t.x + t.w - 12;
      if (flag) { const [ft, bg, fg] = tagOf(flag); const fw = tw(ft, 9, true) + 12; s += `<rect x="${rx - fw}" y="${y + 4}" width="${fw}" height="15" rx="7.5" fill="${bg}"/><text x="${rx - fw / 2}" y="${y + 15}" text-anchor="middle" class="fkey" fill="${fg}">${esc(ft)}</text>`; rx -= fw + 8; }
      if (type) s += `<text x="${rx}" y="${y + 16}" text-anchor="end" class="ftype">${esc(type)}</text>`;
    });
    s += '</g>';
  }
  let n = '';
  for (const no of notes) { const ls = wrap(no.text, 12, no.w - 28); const h = ls.length * 16 + 20; n += `<rect x="${no.x}" y="${no.y}" width="${no.w}" height="${h}" rx="8" fill="#FFFBEB" stroke="#FBBF24"/>` + ls.map((l, i) => `<text x="${no.x + 14}" y="${no.y + 23 + i * 16}" class="fn">${esc(l)}</text>`).join(''); }
  const HH2 = Math.max(H, ...notes.map(no => no.y + 120));
  return `<svg class="fx erd" viewBox="0 0 ${W} ${HH2}" role="img" aria-label="${esc(aria || 'Entity relationship diagram')}"><rect width="${W}" height="${HH2}" fill="#FFFFFF"/>${lines}${s}${labels}${n}</svg>`;
}

function defs() {
  const base = fs.readFileSync(path.join(__dirname, 'icons.svg'), 'utf8');
  const g = inner => `<g fill="none" stroke="#334155" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  const F = 'fill="currentColor" fill-opacity=".22"';
  const extra = {
    shield: `<path d="M16 4l10 4v7c0 6.5-4.3 11-10 13-5.7-2-10-6.5-10-13V8z" ${F}/><path d="M12 16l3 3 5-6"/>`,
    key: `<circle cx="11" cy="16" r="5.5" ${F}/><path d="M16.5 16H28M24 16v4.5M20.5 16v3.5"/>`,
    branch: `<circle cx="10" cy="8" r="3" ${F}/><circle cx="10" cy="24" r="3" ${F}/><circle cx="22" cy="12" r="3" ${F}/><path d="M10 11v10M22 15c0 4.5-4 5.5-11.5 6.5"/>`,
    bolt: `<path d="M18 3L7 18h8l-2 11 12-16h-8z" ${F}/>`,
    bug: `<rect x="10" y="10" width="12" height="16" rx="6" ${F}/><path d="M16 12v14M10 17H5M27 17h-5M11 13L7 9M21 13l4-4M11 23l-4 3M21 23l4 3M13 10a3 3 0 0 1 6 0"/>`,
    calendar: `<rect x="5" y="7" width="22" height="20" rx="2" ${F}/><path d="M5 13h22M11 4v6M21 4v6"/>`,
    box: `<path d="M16 4l11 6v12l-11 6-11-6V10z" ${F}/><path d="M5 10l11 6 11-6M16 16v12"/>`,
    layers: `<path d="M16 5l12 6-12 6-12-6z" ${F}/><path d="M4 16.5l12 6 12-6M4 22l12 6 12-6"/>`,
    code: `<rect x="3" y="6" width="26" height="20" rx="3" ${F}/><path d="M12.5 12l-4 4 4 4M19.5 12l4 4-4 4"/>`,
    cloud: `<path d="M9 24h15a5 5 0 0 0 .5-10A7 7 0 0 0 11 12.5 5.5 5.5 0 0 0 9 24z" ${F}/>`,
    refresh: `<circle cx="16" cy="16" r="11" ${F} stroke="none"/><path d="M24.5 12A9 9 0 0 0 8.2 10.5M7.5 20a9 9 0 0 0 16.3 1.5"/><path d="M8 5.5v5h5M24 26.5v-5h-5"/>`,
    eye: `<path d="M3 16s5-9 13-9 13 9 13 9-5 9-13 9-13-9-13-9z" ${F}/><circle cx="16" cy="16" r="4"/>`,
    tag: `<path d="M4 14V5h9l14 14-9 9z" ${F}/><circle cx="9.5" cy="9.5" r="1.6"/>`,
    upload: `<rect x="5" y="19" width="22" height="8" rx="2" ${F}/><path d="M16 22V5M10 11l6-6 6 6"/>`,
    gear: `<circle cx="16" cy="16" r="8" ${F}/><circle cx="16" cy="16" r="3"/><path d="M16 3.5v4M16 24.5v4M3.5 16h4M24.5 16h4M7.2 7.2l2.8 2.8M22 22l2.8 2.8M7.2 24.8L10 22M22 10l2.8-2.8"/>`,
    warn: `<path d="M16 4l13 22H3z" ${F}/><path d="M16 12v6M16 22v.5"/>`,
    server: `<rect x="5" y="5" width="22" height="9" rx="2" ${F}/><rect x="5" y="18" width="22" height="9" rx="2" ${F}/><path d="M9 9.5h.5M9 22.5h.5M14 9.5h8M14 22.5h8"/>`,
    gem: `<path d="M8 6h16l5 7-13 14L3 13z" ${F}/><path d="M3 13h26M12 6l-3 7 7 14 7-14-3-7"/>`,
    home: `<path d="M5 15L16 5l11 10v12H5z" ${F}/><path d="M13 27v-7h6v7"/>`,
    list: `<rect x="4" y="5" width="24" height="22" rx="3" ${F}/><path d="M10 11h12M10 16h12M10 21h8"/>`,
    return: `<circle cx="16" cy="16" r="11" ${F} stroke="none"/><path d="M11 12h9a5 5 0 0 1 0 10h-7"/><path d="M14 8l-4 4 4 4"/>`,
    phone: `<rect x="9" y="3" width="14" height="26" rx="3" ${F}/><path d="M14 7h4M15.5 24.5h1"/>`,
  };
  const syms = Object.entries(extra).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 32 32">${g(v)}</symbol>`).join('');
  const markers = Object.entries(PAL).map(([k, p]) => `<marker id="m-${k}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke="${p.arrow}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>`).join('');
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${base}${syms}${markers}</defs></svg>`;
}

module.exports = { Board, sequence, erd, defs, PAL, TAG, esc };
