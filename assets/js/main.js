/**
 * Entry point. Collega dati, chat, estensioni e intro.
 * L'ordine conta: il dataLayer deve esistere prima di ogni push.
 */
import { config } from './config.js';
import { profile } from './data/profile.js';
import { intents } from './data/intents.js';
import { $, reducedMotion, isTouch } from './modules/dom.js';
import './modules/datalayer.js';
import { analytics } from './modules/analytics.js';
import { askConsentIfNeeded, openConsent } from './modules/consent.js';
import { startMetrics } from './modules/metrics.js';
import { initChrome } from './modules/chrome.js';
import * as chat from './modules/chat.js';
import * as extensions from './modules/extensions/index.js';
import { createDemo } from './modules/cursor-demo.js';

startMetrics();
document.documentElement.classList.add('js');

/* GTM e Consent Mode v2 sono inizializzati in index.html, prima di questo modulo. */

/* ---------- Eventi iniziali ---------- */
analytics.pageView();

analytics.profileLoaded({
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
  onConsent: openConsent,
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

/* ---------- Intro e consenso ---------- */
// La richiesta di consenso aspetta che nessuna estensione sia aperta, per non coprirla.
const askConsentWhenFree = () => (extensions.isAnyOpen()
  ? setTimeout(askConsentWhenFree, 800)
  : askConsentIfNeeded());

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
  // La richiesta di consenso arriva dopo l'intro, per non coprirla.
  (document.fonts?.ready ?? Promise.resolve()).then(() => setTimeout(async () => {
    await demo.run();
    askConsentWhenFree();
  }, 700));
} else {
  setTimeout(askConsentWhenFree, 1200);
}
