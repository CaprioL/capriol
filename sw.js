/**
 * Service worker: rende il sito installabile e consultabile offline.
 *
 * Strategia "network first" per tutte le risorse dello stesso dominio:
 * online si scarica sempre la versione aggiornata (nessun rischio di
 * contenuti vecchi dopo un deploy); offline si usa l'ultima copia salvata.
 * Le richieste verso altri domini (es. Google Tag Manager) non passano dalla cache.
 */
const CACHE = 'capriol-v1';

// Il minimo per aprire la pagina offline al primo avvio dell'app installata.
const PRECACHE = [
  './',
  'index.html',
  'site.webmanifest',
  'assets/css/tokens.css',
  'assets/css/base.css',
  'assets/css/desktop.css',
  'assets/css/browser.css',
  'assets/css/chat.css',
  'assets/css/blocks.css',
  'assets/css/extensions.css',
  'assets/js/main.js',
  'assets/fonts/montserrat-var-latin.woff2',
  'assets/img/brand/monogram.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: request.mode === 'navigate' })
        .then((hit) => hit || caches.match('./'))),
  );
});
