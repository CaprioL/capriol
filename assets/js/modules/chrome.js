/**
 * Comportamenti della "cornice": barra dei menu macOS, finestra Safari,
 * sidebar della chat, selettore del modello e condivisione.
 */
import { $, copyText, toast } from './dom.js';
import { analytics } from './analytics.js';

function startClock() {
  const el = $('#menubar-clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const tick = () => { el.textContent = fmt.format(new Date()).replace(',', ''); };
  tick();
  setInterval(tick, 15_000);
}

/** Barra di caricamento nella barra degli indirizzi; riparte a ogni "navigazione". */
export function loadingBar() {
  const bar = $('#load-progress');
  if (!bar) return;
  bar.classList.remove('is-loading', 'is-done');
  void bar.offsetWidth;
  requestAnimationFrame(() => bar.classList.add('is-loading'));
  setTimeout(() => bar.classList.add('is-done'), 700);
}

/** Aggiorna l'URL mostrato. `path` vuoto = pagina della chat. */
export function setAddress(path = '') {
  const el = $('#address-text');
  if (!el) return;
  el.textContent = path ? `${el.dataset.host}/${path}` : el.dataset.home;
}

export function initChrome({ displayUrl, modelName, release, onBack, onNewChat, onReplayIntro, onConsent, onOpenDoc }) {
  startClock();
  loadingBar();

  const address = $('#address-text');
  address.dataset.home = displayUrl;
  address.dataset.host = displayUrl.split('/')[0];
  address.textContent = displayUrl;
  document.querySelectorAll('[data-model-name]').forEach((el) => { el.textContent = modelName; });

  // Easter egg: versione del "modello" = revisione del portfolio (MM.AA).
  document.querySelectorAll('[data-model-version]').forEach((el) => { el.textContent = release.version; });
  document.querySelectorAll('[data-model-release]').forEach((el) => { el.textContent = release.label; });
  const notes = $('#model-notes-list');
  if (notes) notes.replaceChildren(...release.notes.map((n) => Object.assign(document.createElement('li'), { textContent: n })));
  $('#model-notes')?.addEventListener('toggle', (e) => {
    if (e.currentTarget.open) analytics.releaseNotesOpen(release.version);
  });

  const browser = $('#browser');
  const app = $('#app');

  // Pulsante verde: ingrandisce la finestra.
  $('#btn-zoom')?.addEventListener('click', (e) => {
    const zoomed = browser.classList.toggle('is-zoomed');
    e.currentTarget.setAttribute('aria-pressed', String(zoomed));
    analytics.windowZoom(zoomed);
  });

  // Sidebar della chat.
  const sidebarBtn = $('#btn-sidebar');
  const mobile = window.matchMedia('(max-width: 900px)');
  const setSidebar = (open) => {
    app.classList.toggle('sidebar-open', open);
    app.classList.toggle('sidebar-closed', !open);
    sidebarBtn.setAttribute('aria-expanded', String(open));
  };
  setSidebar(!mobile.matches);
  mobile.addEventListener('change', (e) => setSidebar(!e.matches));
  sidebarBtn.addEventListener('click', () => setSidebar(!app.classList.contains('sidebar-open')));
  $('#sidebar-scrim')?.addEventListener('click', () => setSidebar(false));
  const closeOnMobile = () => { if (mobile.matches) setSidebar(false); };

  // Navigazione: indietro = nuova chat.
  $('#btn-back')?.addEventListener('click', onBack);
  $('#btn-new-chat')?.addEventListener('click', () => { closeOnMobile(); onNewChat(); });
  $('#btn-reload')?.addEventListener('click', () => location.reload());
  $('#btn-replay')?.addEventListener('click', () => { closeOnMobile(); onReplayIntro(); });
  $('#btn-consent')?.addEventListener('click', () => { closeOnMobile(); onConsent(); });
  document.querySelectorAll('[data-open-doc]').forEach((btn) =>
    btn.addEventListener('click', () => { closeOnMobile(); onOpenDoc(btn.dataset.openDoc, btn); }));

  // Condividi.
  const share = async () => {
    const data = { title: document.title, url: location.href };
    analytics.share(navigator.share ? 'native' : 'copy_link');
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* annullato */ }
    } else if (await copyText(location.href)) {
      toast('Link copiato negli appunti');
    }
  };
  $('#btn-share')?.addEventListener('click', share);
  $('#btn-share-toolbar')?.addEventListener('click', share);

  // Selettore del modello.
  const model = $('#model-menu');
  model?.addEventListener('toggle', () => { if (model.open) analytics.modelInfoOpen(release.version); });
  document.addEventListener('pointerdown', (e) => {
    if (model?.open && !model.contains(e.target)) model.open = false;
  });

  return { closeSidebarOnMobile: closeOnMobile };
}
