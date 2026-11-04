/**
 * Entry point. Collega dati, chat, estensioni e intro.
 * L'ordine conta: il dataLayer deve esistere prima di ogni push.
 */
import { config } from './config.js';
import { profile } from './data/profile.js';
import { intents } from './data/intents.js';
import { $, reducedMotion, isTouch } from './modules/dom.js';
import { push } from './modules/datalayer.js';
import { startMetrics } from './modules/metrics.js';
import { initChrome } from './modules/chrome.js';
import * as chat from './modules/chat.js';
import * as extensions from './modules/extensions/index.js';
import { createDemo } from './modules/cursor-demo.js';

startMetrics();
document.documentElement.classList.add('js');

/* ---------- Google Tag Manager (opzionale) ---------- */
if (config.gtmId) {
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`;
  document.head.append(s);
}

/* ---------- Eventi iniziali ---------- */
push({
  event: 'page_view',
  page: { title: document.title, path: location.pathname, language: document.documentElement.lang },
});

push({
  event: 'profile_loaded',
  person: {
    name: profile.person.name,
    brand: profile.person.brand,
    role: profile.person.role,
    experience: profile.person.experience,
    tagline: profile.person.tagline,
    motto: profile.person.motto,
  },
  services: profile.services.map(({ area, name }) => ({ area, name })),
  skills: Object.fromEntries(profile.skills.map((g) => [g.group, g.items])),
  values: profile.values.map((v) => v.name),
  clients: profile.clients.map((c) => c.name),
  process: profile.process.map((s) => s.name),
  contact: { email: profile.contact.email, phone: profile.contact.phone, linkedin: profile.contact.linkedin || null },
  open_to_work: true,
});

/* ---------- Moduli ---------- */
const byId = Object.fromEntries(intents.map((i) => [i.id, i]));

const ui = initChrome({
  displayUrl: config.displayUrl,
  modelName: config.modelName,
  onNewChat: () => { extensions.close(); chat.reset(); },
  onReplayIntro: () => demo.run(),
});

extensions.initExtensions({
  onAsk: (id) => chat.ask(byId[id].prompt, { source: 'extension', intentId: id }),
});

chat.initChat({
  thread: $('#thread'),
  form: $('#composer'),
  input: $('#composer-input'),
  send: $('#composer-send'),
  list: $('#history-list'),
  openExtension: extensions.open,
  onNavigate: ui.closeSidebarOnMobile,
});

const demo = createDemo({ prompt: config.demo.prompt });

/* ---------- Intro ---------- */
const SEEN_KEY = 'capriol:intro-seen';
let seen = false;
try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage non disponibile */ }

const shouldRunDemo = config.demo.enabled
  && !reducedMotion()
  && !isTouch()
  && !(config.demo.oncePerSession && seen);

if (shouldRunDemo) {
  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* ignora */ }
  // Attende font e layout stabili prima di calcolare le posizioni del cursore.
  (document.fonts?.ready ?? Promise.resolve()).then(() => setTimeout(demo.run, 700));
}
