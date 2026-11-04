/** Piccoli helper DOM, senza dipendenze. */

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/**
 * Crea un elemento.
 * h('button', { class: 'btn', onclick: fn, 'aria-label': 'Chiudi' }, 'Testo', childNode)
 * La chiave `html` imposta innerHTML (solo per markup interno fidato, es. icone).
 */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value === false || value === null || value === undefined) continue;
    if (key === 'class') el.className = value;
    else if (key === 'html') el.innerHTML = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2), value);
    else el.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return el;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Normalizza una stringa per il matching: minuscole, senza accenti né punteggiatura. */
export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Divide un testo con **grassetto** in segmenti { text, bold }. */
export function parseBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) =>
    part.startsWith('**') ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false },
  );
}

/** Rimuove il markup ** dal testo (per copia e dataLayer). */
export const plain = (text) => text.replace(/\*\*/g, '');

/** Toast di conferma, una riga, auto-chiudente. */
let toastTimer;
export function toast(message, duration = 2200) {
  let el = $('#toast');
  if (!el) {
    el = h('div', { id: 'toast', class: 'toast', role: 'status' });
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), duration);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = h('textarea', { 'aria-hidden': 'true', style: 'position:fixed;opacity:0' });
    area.value = text;
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}
