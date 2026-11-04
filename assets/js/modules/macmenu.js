/**
 * Menu "Aiuto" della barra dei menu macOS.
 * Rende consultabili robots.txt, llms.txt e sitemap.xml anche a chi non sa
 * dove cercarli, più qualche scorciatoia (intro, preferenze cookie).
 * Pattern ARIA "menu button": frecce per muoversi, Esc per chiudere.
 */
import { $, h } from './dom.js';
import { analytics } from './analytics.js';
import { DOCS } from './docview.js';

export function initHelpMenu({ onOpenDoc, onReplayIntro, onConsent, onInstall }) {
  const button = $('#menu-help');
  if (!button) return;

  const item = (label, hint, action) => h('button', {
    type: 'button',
    role: 'menuitem',
    tabindex: '-1',
    class: 'mac-menu__item',
    onclick: () => { close(); action(); },
  }, h('span', {}, label), hint ? h('span', { class: 'mac-menu__hint' }, hint) : null);

  const menu = h('div', { class: 'mac-menu', id: 'menu-help-list', role: 'menu', 'aria-labelledby': 'menu-help', hidden: true },
    h('p', { class: 'mac-menu__label', role: 'presentation' }, 'File per crawler e AI'),
    DOCS.map((doc) => item(doc.title, doc.text, () => onOpenDoc(doc.path, button))),
    h('hr', { class: 'mac-menu__sep', role: 'separator' }),
    item('Rivedi l’intro', null, onReplayIntro),
    item('Preferenze cookie', null, onConsent),
    h('hr', { class: 'mac-menu__sep', role: 'separator' }),
    item('Installa come app', 'Aggiungi capriol. alla schermata Home o al Dock', onInstall),
  );
  button.after(menu);
  button.setAttribute('aria-controls', 'menu-help-list');

  const items = () => [...menu.querySelectorAll('[role="menuitem"]')];
  const isOpen = () => !menu.hidden;

  function open(focusIndex = 0) {
    menu.hidden = false;
    menu.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    button.classList.add('is-active');
    items()[focusIndex]?.focus();
    analytics.menuOpen('aiuto');
  }

  function close({ focusButton = false } = {}) {
    if (!isOpen()) return;
    menu.hidden = true;
    menu.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    button.classList.remove('is-active');
    if (focusButton) button.focus();
  }

  button.addEventListener('click', () => (isOpen() ? close() : open()));
  button.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); open(0); }
    if (e.key === 'ArrowUp') { e.preventDefault(); open(items().length - 1); }
  });

  menu.addEventListener('keydown', (e) => {
    const list = items();
    const i = list.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
    if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
    if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
    if (e.key === 'Escape') { e.preventDefault(); close({ focusButton: true }); }
    if (e.key === 'Tab') close();
  });

  document.addEventListener('pointerdown', (e) => {
    if (isOpen() && !menu.contains(e.target) && e.target !== button) close();
  });
}
