/**
 * Controller delle estensioni del browser finto.
 * Gestisce i pulsanti in toolbar, il popover ancorato, focus e chiusura.
 */
import { $, $$, h } from '../dom.js';
import { icon } from '../icons.js';
import { push, getLog, subscribe } from '../datalayer.js';
import datalayer from './datalayer.js';
import seo from './seo.js';
import stack from './stack.js';
import contact from './contact.js';
import manager from './manager.js';

const registry = { datalayer, seo, stack, contact, manager };
const listed = [datalayer, seo, stack, contact];

let popover;
let current = null; // { id, cleanup, trigger }
let askIntent = () => {};

const buttonFor = (id) => $(`.ext-btn[data-ext="${id}"]`);

function position(button) {
  const win = $('#browser');
  if (window.matchMedia('(max-width: 720px)').matches) {
    popover.style.removeProperty('right');
    return;
  }
  const w = win.getBoundingClientRect();
  const b = button.getBoundingClientRect();
  const width = popover.offsetWidth;
  let right = w.right - b.right - 8;
  right = Math.max(10, Math.min(right, w.width - width - 10));
  popover.style.right = `${right}px`;
  const caret = w.right - right - (b.left + b.width / 2);
  popover.style.setProperty('--caret', `${caret}px`);
}

export function close({ restoreFocus = false } = {}) {
  if (!current) return;
  current.cleanup?.();
  const trigger = buttonFor(current.id);
  trigger?.setAttribute('aria-expanded', 'false');
  popover.hidden = true;
  popover.classList.remove('is-open');
  if (restoreFocus) trigger?.focus();
  current = null;
}

export function open(id, { source = 'toolbar', expand, anchor } = {}) {
  const ext = registry[id];
  if (!ext) return;
  if (current?.id === id && source === 'toolbar') return close({ restoreFocus: true });
  close();

  const button = buttonFor(id) || anchor;
  const titleEl = $('#ext-title', popover);
  const subEl = $('#ext-subtitle', popover);
  const body = $('.ext-popover__body', popover);
  $('.ext-popover__icon', popover).innerHTML = icon(ext.icon, 18);
  titleEl.textContent = ext.title;
  subEl.textContent = ext.description;
  body.replaceChildren();
  body.scrollTop = 0;

  popover.hidden = false;
  const cleanup = ext.render({
    body,
    options: { expand },
    setSubtitle: (text) => { subEl.textContent = text; },
    api: {
      ask: (intentId) => { close(); askIntent(intentId); },
      open: (nextId, opts) => open(nextId, opts),
      list: () => listed,
    },
  });

  current = { id, cleanup };
  buttonFor(id)?.setAttribute('aria-expanded', 'true');
  if (button) position(button);
  requestAnimationFrame(() => popover.classList.add('is-open'));
  if (source !== 'intro') $('.ext-popover__close', popover).focus({ preventScroll: true });

  push({ event: 'extension_open', extension_id: id, extension_name: ext.title, open_source: source });
}

export const isOpen = (id) => current?.id === id;

export function initExtensions({ onAsk }) {
  askIntent = onAsk;
  popover = $('#ext-popover');

  $$('.ext-btn').forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => open(btn.dataset.ext, { source: 'toolbar' }));
  });

  $('.ext-popover__close', popover).addEventListener('click', () => close({ restoreFocus: true }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current) close({ restoreFocus: true });
  });
  document.addEventListener('pointerdown', (e) => {
    if (!current || !e.isTrusted) return;
    if (popover.contains(e.target) || e.target.closest('.ext-btn')) return;
    close();
  });
  window.addEventListener('resize', () => {
    if (current) position(buttonFor(current.id));
  });

  // Badge con il numero di eventi nel dataLayer.
  const badge = $('.ext-btn[data-ext="datalayer"] .ext-btn__badge');
  const update = () => {
    if (!badge) return;
    badge.textContent = getLog().length;
    badge.classList.remove('is-bumped');
    void badge.offsetWidth; // riavvia l'animazione
    badge.classList.add('is-bumped');
  };
  update();
  subscribe(update);
}
