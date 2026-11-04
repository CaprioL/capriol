/**
 * Visualizzatore di file di testo: il browser finto "naviga" su robots.txt,
 * llms.txt e sitemap.xml e li mostra come farebbe Safari, con la barra
 * degli indirizzi aggiornata. "Indietro" riporta alla chat.
 */
import { $, h, copyText, toast } from './dom.js';
import { icon } from './icons.js';
import { analytics } from './analytics.js';

/** File consultabili dal menu Aiuto. I percorsi sono relativi: funzionano anche su /capriol/. */
export const DOCS = [
  { path: 'robots.txt', title: 'robots.txt', text: 'Le regole per i crawler, con una sorpresa in cima.' },
  { path: 'llms.txt', title: 'llms.txt', text: 'Il profilo di Giacomo scritto per gli LLM.' },
  { path: 'sitemap.xml', title: 'sitemap.xml', text: 'La mappa del sito per i motori di ricerca.' },
];

let view;
let current = null;
let opts = {};
let returnFocus = null;

function build() {
  const title = h('h2', { class: 'doc-view__title', id: 'doc-title', tabindex: '-1' });
  const desc = h('p', { class: 'doc-view__desc' });
  const original = h('a', { class: 'btn btn--ghost btn--sm', target: '_blank', rel: 'noopener', html: `${icon('external', 14)}<span>Apri il file originale</span>` });
  const copy = h('button', {
    type: 'button',
    class: 'btn btn--ghost btn--sm',
    html: `${icon('copy', 14)}<span>Copia</span>`,
    onclick: async () => { if (await copyText(view.querySelector('code').textContent)) toast('Contenuto copiato'); },
  });
  const back = h('button', { type: 'button', class: 'btn btn--gold btn--sm', html: `${icon('chevronLeft', 14)}<span>Torna alla chat</span>`, onclick: () => closeDoc() });

  view = h('section', { class: 'doc-view', 'aria-labelledby': 'doc-title', hidden: true },
    h('header', { class: 'doc-view__bar' },
      h('span', { class: 'doc-view__icon', html: icon('braces', 16), 'aria-hidden': 'true' }),
      h('div', { class: 'doc-view__meta' }, title, desc),
      h('div', { class: 'doc-view__actions' }, original, copy, back),
    ),
    h('pre', { class: 'doc-view__text' }, h('code')),
  );
  view.refs = { title, desc, original };
  $('.viewport').append(view);
}

export const isDocOpen = () => current !== null;

export async function openDoc(path, { source = 'menu', trigger } = {}) {
  const doc = DOCS.find((d) => d.path === path);
  if (!doc) return;
  if (!view) build();
  returnFocus = trigger || document.activeElement;
  current = doc;

  const code = view.querySelector('code');
  view.refs.title.textContent = doc.title;
  view.refs.desc.textContent = doc.text;
  view.refs.original.href = doc.path;
  code.textContent = 'Caricamento…';
  view.hidden = false;
  view.classList.add('is-open');
  opts.onNavigate?.(doc.path);

  try {
    const res = await fetch(doc.path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    code.textContent = await res.text();
  } catch {
    code.textContent = `Impossibile caricare ${doc.path}.\nSe stai aprendo il sito come file locale, avvialo con un piccolo server (vedi docs/handover.md).`;
  }
  view.querySelector('.doc-view__text').scrollTop = 0;
  view.refs.title.focus({ preventScroll: true });
  analytics.fileView(doc.path, source);
}

export function closeDoc() {
  if (!current) return;
  current = null;
  view.classList.remove('is-open');
  view.hidden = true;
  opts.onClose?.();
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
}

export function initDocViewer(options) {
  opts = options;
  document.addEventListener('keydown', (e) => {
    // Altri livelli (popover, menu) chiamano preventDefault: si chiude un livello alla volta.
    if (e.key === 'Escape' && current && !e.defaultPrevented) closeDoc();
  });
}
