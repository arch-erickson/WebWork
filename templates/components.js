/* Shared components.

   HOUSE RULE: anything that appears more than once is built here, once. No
   page file hand-rolls a media frame, a card, a status label, an empty state
   or an icon. A variation is a parameter added here, never a second copy
   written there. Every existing caller then inherits the fix.

   This file is a starting point in plain template strings, so it works with any
   generator. In a framework project the same rule applies to the component
   directory: one definition, parameters for variation.  */

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- icons ----------
   One grid, stroke only, no fill. Size and stroke weight come from CSS, never
   from the markup, so an icon can never arrive oversized. */
const ICONS = {
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  back:  '<path d="M15 5l-7 7 7 7"/>',
  next:  '<path d="M9 5l7 7-7 7"/>',
  plus:  '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
};
const icon = (name, cls = '') =>
  `<svg viewBox="0 0 24 24"${cls ? ` class="${cls}"` : ''} aria-hidden="true">${ICONS[name] || ''}</svg>`;

/* ---------- the media frame ----------
   THE single frame for any image, everywhere it appears.

   Sources are mixed on most projects: cutouts on no background, and full
   photographs as tall as 9:16. A frame that contains everything letterboxes
   the tall ones into slivers; a frame that covers everything crops the
   cutouts. So the record says which it is, and this decides.

   size: 'sm' | 'md' | 'lg' | 'full'   ratio: any CSS aspect-ratio */
const frame = ({ src, alt = '', cutout = false, size = 'md', ratio = '1', badge = '' }) => `
<div class="frame frame--${size}" style="aspect-ratio:${ratio}">
  ${badge}
  ${src
    ? `<img src="${esc(src)}" alt="${esc(alt)}"${cutout ? ' data-cutout' : ''} loading="lazy">`
    : '<span class="frame__none" aria-hidden="true"></span>'}
</div>`;

/* ---------- an item, as a card in a grid ---------- */
const card = ({ href = '#', src, alt, cutout, name, meta = '', action = '', ratio = '1' }) => `
<a class="card" href="${esc(href)}">
  ${frame({ src, alt: alt || name, cutout, size: 'lg', ratio })}
  <div class="card__body">
    <h3 class="card__name">${esc(name)}</h3>
    ${meta ? `<p class="card__meta">${esc(meta)}</p>` : ''}
  </div>
  ${action}
</a>`;

/* ---------- the same item, as a row in a list ---------- */
const row = ({ src, alt, cutout, name, meta = '', sub = '', actions = '' }) => `
<div class="row">
  ${frame({ src, alt: alt || name, cutout, size: 'sm' })}
  <div class="row__body">
    <h4 class="row__name">${esc(name)}</h4>
    ${meta ? `<p class="row__meta">${esc(meta)}</p>` : ''}
    ${sub ? `<p class="row__sub">${esc(sub)}</p>` : ''}
  </div>
  ${actions ? `<div class="row__act">${actions}</div>` : ''}
</div>`;

/* ---------- status ----------
   One vocabulary of states across the whole project, so the same state reads
   the same way to a visitor and to staff. */
const STATUS = {
  available: 'Available',
  pending: 'Awaiting payment',
  paid: 'Paid',
  transit: 'In transit',
  done: 'Delivered',
  draft: 'Draft',
  archived: 'Archived',
};
const status = (kind, label) =>
  `<span class="status status--${kind}">${esc(label || STATUS[kind] || kind)}</span>`;

/* ---------- empty state ----------
   Every list has one. It says what will appear here, and what to do next. */
const empty = (title, body, action = '') => `
<div class="empty">
  <h3>${esc(title)}</h3>
  <p>${esc(body)}</p>
  ${action}
</div>`;

/* ---------- field ----------
   Label, control, help and error in one place, so a form cannot invent its own
   spacing or its own way of marking a required field. */
const field = ({ label, name, type = 'text', value = '', help = '', required = false, optional = false, control = '' }) => `
<label class="field">
  <span class="field__label">${esc(label)}${optional ? '<em class="field__opt">Optional</em>' : ''}</span>
  ${control || `<input type="${type}" name="${esc(name)}" value="${esc(value)}"${required ? ' required' : ''}>`}
  ${help ? `<small class="field__help">${esc(help)}</small>` : ''}
</label>`;

module.exports = { esc, icon, ICONS, frame, card, row, status, STATUS, empty, field };
