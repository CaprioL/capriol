/**
 * Web app installabile.
 * - Registra il service worker (offline e requisiti di installazione).
 * - Gestisce l'installazione: prompt nativo dove esiste (Chrome, Edge,
 *   Android), istruzioni dove non esiste (Safari iOS, Safari macOS).
 */
import { toast } from './dom.js';
import { analytics } from './analytics.js';

let deferredPrompt = null;

export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

export const displayMode = () => (isStandalone() ? 'standalone' : 'browser');

const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export function initPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => { /* es. file:// o browser senza supporto */ });
    });
  }
  // Salviamo l'evento senza bloccarlo: il browser può comunque mostrare il suo invito.
  window.addEventListener('beforeinstallprompt', (e) => { deferredPrompt = e; });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    analytics.appInstalled();
    toast('capriol. è sulla tua schermata Home');
  });
}

export async function installApp() {
  if (isStandalone()) {
    toast('Stai già usando capriol. come app');
    return;
  }
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    analytics.installPrompt(outcome);
    deferredPrompt = null;
    return;
  }
  analytics.installPrompt(isIOS() ? 'ios_instructions' : 'browser_instructions');
  toast(isIOS()
    ? 'Tocca Condividi, poi “Aggiungi alla schermata Home”'
    : 'Dal menu del browser scegli “Installa app” o “Aggiungi a schermata Home”', 6000);
}
