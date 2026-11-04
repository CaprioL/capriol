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

function loadingBar() {
  const bar = $('#load-progress');
  if (!bar) return;
  requestAnimationFrame(() => bar.classList.add('is-loading'));
  setTimeout(() => bar.classList.add('is-done'), 900);
}

export function initChrome({ displayUrl, modelName, onNewChat, onReplayIntro, onConsent }) {
  startClock();
  loadingBar();

  $('#address-text').textContent = displayUrl;
  document.querySelectorAll('[data-model-name]').forEach((el) => { el.textContent = modelName; });

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
  $('#btn-back')?.addEventListener('click', onNewChat);
  $('#btn-new-chat')?.addEventListener('click', () => { closeOnMobile(); onNewChat(); });
  $('#btn-reload')?.addEventListener('click', () => location.reload());
  $('#btn-replay')?.addEventListener('click', () => { closeOnMobile(); onReplayIntro(); });
  $('#btn-consent')?.addEventListener('click', () => { closeOnMobile(); onConsent(); });

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
  model?.addEventListener('toggle', () => { if (model.open) analytics.modelInfoOpen(); });
  document.addEventListener('pointerdown', (e) => {
    if (model?.open && !model.contains(e.target)) model.open = false;
  });

  return { closeSidebarOnMobile: closeOnMobile };
}
