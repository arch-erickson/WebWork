// Diagram viewer for the blueprint page: every diagram gets a "Full screen"
// button. Full screen: drag to pan, wheel or pinch to zoom (toward the
// pointer), double-click to zoom in, + / - / 0 / arrows / Esc on the keyboard.
// Anywhere: click a card to highlight the arrows into and out of it; click it
// again, or empty space, to clear.
const css = `
.dg-bar{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin:.9rem 0 -.5rem;font-size:.74rem;color:var(--ink-3)}
.dg-btn{font:600 .72rem/1 var(--sans);letter-spacing:.02em;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:6px;padding:.45rem .7rem;cursor:pointer;display:inline-flex;align-items:center;gap:.35rem}
.dg-btn:hover{background:var(--tile)}
.dg-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.fx .node{cursor:pointer}
.fx.focus [data-from]{opacity:.1;transition:opacity .15s}
.fx.focus .node{opacity:.28;transition:opacity .15s}
.fx.focus [data-from].hot,.fx.focus .node.hot{opacity:1}
.fx.focus path.hot{stroke-width:3.6}
.fx.focus .node.sel > rect:nth-child(2){stroke:#0F172A;stroke-width:3}
.dg-full{position:fixed;inset:0;z-index:1000;background:#fff;display:flex;flex-direction:column}
.dg-full[hidden]{display:none}
.dg-top{display:flex;align-items:center;gap:.5rem;padding:.6rem .8rem;padding-top:calc(.6rem + env(safe-area-inset-top,0px));border-bottom:1px solid var(--line);background:#fff;flex-wrap:wrap}
.dg-top .dg-title{font:600 .82rem var(--sans);color:var(--ink);margin-right:auto}
.dg-top .dg-pct{font:500 .74rem var(--mono);min-width:3.6rem;text-align:center;color:var(--ink-2)}
.dg-top .dg-hint{font-size:.72rem;color:var(--ink-3)}
.dg-stage{position:relative;flex:1;overflow:hidden;cursor:grab;touch-action:none;background:#F8FAFC}
.dg-stage.drag{cursor:grabbing}
.dg-stage svg{position:absolute;left:0;top:0;transform-origin:0 0;max-width:none!important;min-width:0!important;background:#fff;box-shadow:0 8px 30px rgba(15,23,42,.08)}
body.dg-lock{overflow:hidden}
@media (max-width:620px){.dg-top .dg-hint{display:none}}
`;

const js = `(function(){
  var full, stage, pct, title, svg, home, s = 1, x = 0, y = 0, W = 0, H = 0;
  function build() {
    full = document.createElement('div'); full.className = 'dg-full'; full.hidden = true;
    full.setAttribute('role', 'dialog'); full.setAttribute('aria-modal', 'true'); full.setAttribute('aria-label', 'Diagram, full screen');
    full.innerHTML = '<div class="dg-top"><span class="dg-title"></span><span class="dg-hint">Drag to move, scroll or pinch to zoom, click a card to trace its arrows</span>' +
      '<button type="button" class="dg-btn" data-z="out" aria-label="Zoom out">\\u2212</button><span class="dg-pct" aria-live="polite"></span>' +
      '<button type="button" class="dg-btn" data-z="in" aria-label="Zoom in">+</button><button type="button" class="dg-btn" data-z="fit">Fit</button>' +
      '<button type="button" class="dg-btn" data-z="close">Close</button></div><div class="dg-stage" tabindex="0"></div>';
    document.body.appendChild(full);
    stage = full.querySelector('.dg-stage'); pct = full.querySelector('.dg-pct'); title = full.querySelector('.dg-title');
    full.addEventListener('click', function (e) {
      var b = e.target.closest('[data-z]'); if (!b) return;
      var z = b.getAttribute('data-z');
      if (z === 'close') close(); else if (z === 'fit') fit(); else zoomAt(z === 'in' ? 1.5 : 1 / 1.5, stage.clientWidth / 2, stage.clientHeight / 2);
    });
    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      var r = stage.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022)), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
    stage.addEventListener('dblclick', function (e) { var r = stage.getBoundingClientRect(); zoomAt(2, e.clientX - r.left, e.clientY - r.top); });
    // Pointers: one drags, two pinch.
    var pts = {}, last = null, moved = 0;
    stage.addEventListener('pointerdown', function (e) { stage.setPointerCapture(e.pointerId); pts[e.pointerId] = [e.clientX, e.clientY]; moved = 0; last = snap(); stage.classList.add('drag'); });
    stage.addEventListener('pointermove', function (e) {
      if (!pts[e.pointerId]) return;
      var prev = pts[e.pointerId]; pts[e.pointerId] = [e.clientX, e.clientY];
      var ids = Object.keys(pts);
      if (ids.length === 1) { x += e.clientX - prev[0]; y += e.clientY - prev[1]; moved += Math.abs(e.clientX - prev[0]) + Math.abs(e.clientY - prev[1]); apply(); }
      else if (ids.length === 2) {
        var a = pts[ids[0]], b = pts[ids[1]], now = snap();
        if (last && last.d) { var r = stage.getBoundingClientRect(); zoomAt(now.d / last.d, now.cx - r.left, now.cy - r.top); x += now.cx - last.cx; y += now.cy - last.cy; apply(); }
        last = now; moved = 99;
      }
    });
    function snap() { var ids = Object.keys(pts); if (ids.length < 2) return null; var a = pts[ids[0]], b = pts[ids[1]]; return { d: Math.hypot(a[0] - b[0], a[1] - b[1]), cx: (a[0] + b[0]) / 2, cy: (a[1] + b[1]) / 2 }; }
    function up(e) { delete pts[e.pointerId]; last = snap(); if (!Object.keys(pts).length) stage.classList.remove('drag'); stage.dataset.moved = moved > 5 ? '1' : ''; }
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    document.addEventListener('keydown', function (e) {
      if (full.hidden) return;
      var k = e.key, c = [stage.clientWidth / 2, stage.clientHeight / 2];
      if (k === 'Escape') close();
      else if (k === '+' || k === '=') zoomAt(1.5, c[0], c[1]);
      else if (k === '-' || k === '_') zoomAt(1 / 1.5, c[0], c[1]);
      else if (k === '0') fit();
      else if (k.indexOf('Arrow') === 0) { var d = 80; if (k === 'ArrowLeft') x += d; if (k === 'ArrowRight') x -= d; if (k === 'ArrowUp') y += d; if (k === 'ArrowDown') y -= d; apply(); }
      else return;
      e.preventDefault();
    });
  }
  function apply() { svg.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')'; pct.textContent = Math.round(s * 100) + '%'; }
  function zoomAt(f, px, py) {
    var fitS = Math.min(stage.clientWidth / W, stage.clientHeight / H) * 0.5, ns = Math.max(fitS, Math.min(6, s * f));
    x = px - (px - x) * (ns / s); y = py - (py - y) * (ns / s); s = ns; apply();
  }
  function fit() {
    var cw = stage.clientWidth, ch = stage.clientHeight;
    s = Math.min(cw / W, ch / H) * 0.96; x = (cw - W * s) / 2; y = Math.max(8, (ch - H * s) / 2); apply();
  }
  function open(box) {
    if (!full) build();
    svg = box.querySelector('svg'); home = box;
    var vb = svg.viewBox.baseVal; W = vb.width; H = vb.height;
    svg.dataset.style = svg.getAttribute('style') || '';
    svg.setAttribute('style', 'width:' + W + 'px;height:' + H + 'px');
    // The nearest heading above the diagram names it.
    var h = box; do { h = h.previousElementSibling; } while (h && !/^H[2-4]$/.test(h.tagName));
    if (!h) { var sec = box.closest('section'); h = sec && sec.querySelector('h2'); }
    title.textContent = h ? h.textContent.replace(/^\\s*\\d+\\s*/, '') : 'Diagram';
    stage.appendChild(svg); full.hidden = false; document.body.classList.add('dg-lock');
    fit(); stage.focus();
  }
  function close() {
    svg.setAttribute('style', svg.dataset.style || ''); home.appendChild(svg);
    full.hidden = true; document.body.classList.remove('dg-lock');
    var b = home.previousElementSibling && home.previousElementSibling.querySelector('.dg-btn'); if (b) b.focus();
  }
  // A button above every diagram.
  document.querySelectorAll('.diagram').forEach(function (box, i) {
    var bar = document.createElement('div'); bar.className = 'dg-bar';
    var clickable = box.querySelector('.node') ? 'Click a card to trace its arrows.' : '';
    bar.innerHTML = '<span>' + clickable + '</span><button type="button" class="dg-btn"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>Full screen</button>';
    bar.querySelector('button').addEventListener('click', function () { open(box); });
    box.parentNode.insertBefore(bar, box);
  });
  // Trace a card's arrows.
  document.addEventListener('click', function (e) {
    var root = e.target.closest('svg.fx'); if (!root) return;
    if (stage && stage.contains(root) && stage.dataset.moved === '1') return;
    var node = e.target.closest('.node'), id = node && node.getAttribute('data-node');
    var was = root.querySelector('.node.sel');
    root.querySelectorAll('.hot,.sel').forEach(function (el) { el.classList.remove('hot', 'sel'); });
    if (!node || (was && was === node)) { root.classList.remove('focus'); return; }
    root.classList.add('focus'); node.classList.add('hot', 'sel');
    root.querySelectorAll('[data-from]').forEach(function (el) {
      var f = el.getAttribute('data-from'), t = el.getAttribute('data-to');
      if (f !== id && t !== id) return;
      el.classList.add('hot');
      var other = root.querySelector('.node[data-node="' + (f === id ? t : f) + '"]'); if (other) other.classList.add('hot');
    });
  });
})();`;

module.exports = { css, js };
