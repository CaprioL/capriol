/**
 * Tassonomia degli eventi.
 *
 * Ogni interazione produce un evento custom che descrive cosa è successo
 * nell'interfaccia. Quando esiste un equivalente GA4 (automatico o
 * consigliato da Google), viene inviato subito dopo un secondo push con il nome
 * e i parametri standard GA4. L'evento custom contiene `ga4_event`, il
 * rimando al suo gemello.
 *
 * In GTM basta un unico tag "GA4 Event" con nome evento {{Event}} e un
 * trigger sugli eventi elencati in GA4_EVENTS.
 */
import { push } from './datalayer.js';
import { config } from '../config.js';
import { profile } from '../data/profile.js';

const DOCS = 'https://developers.google.com/analytics/devguides/collection/ga4/reference/events';

/** Eventi GA4 usati dal sito, con tipo e link alla documentazione ufficiale. */
export const GA4_EVENTS = {
  page_view: { type: 'automatico', docs: 'https://support.google.com/analytics/answer/9234069' },
  search: { type: 'consigliato', docs: `${DOCS}#search` },
  select_content: { type: 'consigliato', docs: `${DOCS}#select_content` },
  view_item_list: { type: 'consigliato', docs: `${DOCS}#view_item_list` },
  generate_lead: { type: 'consigliato', docs: `${DOCS}#generate_lead` },
  share: { type: 'consigliato', docs: `${DOCS}#share` },
  tutorial_begin: { type: 'consigliato', docs: `${DOCS}#tutorial_begin` },
  tutorial_complete: { type: 'consigliato', docs: `${DOCS}#tutorial_complete` },
};

export const isGa4Event = (name) => Object.hasOwn(GA4_EVENTS, name);

/**
 * Invia un evento custom e, se indicato, il suo equivalente GA4.
 * @param {string} name   nome dell'evento custom (snake_case)
 * @param {object} params parametri dell'evento custom
 * @param {{event: string, params?: object, ecommerce?: object}} [ga4]
 */
export function track(name, params = {}, ga4) {
  push({ event: name, ...params, ...(ga4 ? { ga4_event: ga4.event } : {}) });
  if (!ga4) return;
  if (ga4.ecommerce) push({ ecommerce: null }); // reset consigliato da Google prima di ogni oggetto ecommerce
  push({
    event: ga4.event,
    ...(ga4.params || {}),
    ...(ga4.ecommerce ? { ecommerce: ga4.ecommerce } : {}),
  });
}

/* ---------- Liste di "item" GA4 ---------- */

const BRAND = profile.person.brand;

const lists = {
  services: () => ({
    item_list_id: 'services',
    item_list_name: 'Servizi',
    items: profile.services.map((s, index) => ({
      item_id: s.id,
      item_name: s.name,
      item_brand: BRAND,
      item_category: 'Servizio',
      item_category2: s.area,
      item_list_id: 'services',
      item_list_name: 'Servizi',
      index,
    })),
  }),
  clients: () => ({
    item_list_id: 'clients',
    item_list_name: 'Clienti',
    items: profile.clients.map((c, index) => ({
      item_id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      item_name: c.name,
      item_brand: BRAND,
      item_category: 'Cliente',
      item_list_id: 'clients',
      item_list_name: 'Clienti',
      index,
    })),
  }),
  skills: () => {
    let index = 0;
    return {
      item_list_id: 'skills',
      item_list_name: 'Competenze',
      items: profile.skills.flatMap((g) => g.items.map((name) => ({
        item_id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        item_name: name,
        item_brand: BRAND,
        item_category: 'Competenza',
        item_category2: g.group,
        item_list_id: 'skills',
        item_list_name: 'Competenze',
        index: index++,
      }))),
    };
  },
};

/** Intento della chat → lista GA4 mostrata nella risposta. */
const intentLists = { services: 'services', about: 'clients', clients: 'clients', stack: 'skills' };

/* ---------- Eventi del sito ---------- */

export const analytics = {
  pageView() {
    push({
      event: 'page_view',
      page_title: document.title,
      page_location: location.href,
      page_path: location.pathname,
      ...(document.referrer ? { page_referrer: document.referrer } : {}),
      language: document.documentElement.lang,
      screen_resolution: `${screen.width}x${screen.height}`,
      content_group: 'Portfolio',
    });
  },

  profileLoaded(data) {
    track('profile_loaded', data);
  },

  /** Domanda scritta = search; domanda scelta tra i suggerimenti = select_content. */
  chatPrompt({ source, text, intent }) {
    const typed = source === 'typed';
    track('chat_prompt', { prompt_source: source, prompt_text: text, intent }, typed
      ? { event: 'search', params: { search_term: text } }
      : { event: 'select_content', params: { content_type: 'chat_suggestion', content_id: intent } });
  },

  chatResponse({ intent, tool, blocks }) {
    const listId = intentLists[intent];
    track('chat_response', { intent, tool, blocks }, listId
      ? { event: 'view_item_list', ecommerce: lists[listId]() }
      : undefined);
  },

  chatFeedback({ intent, feedback }) {
    track('chat_feedback', { intent, feedback });
  },

  chatReset() {
    track('chat_reset');
  },

  extensionOpen({ id, name, source }) {
    track('extension_open', { extension_id: id, extension_name: name, open_source: source }, {
      event: 'select_content',
      params: { content_type: 'browser_extension', content_id: id },
    });
  },

  /** Ogni contatto è un lead: lead_source è il parametro standard GA4. */
  contact(method) {
    track('contact_click', { contact_method: method }, {
      event: 'generate_lead',
      params: { lead_source: method, currency: config.ga4.currency, value: config.ga4.leadValue },
    });
  },

  clientClick(client) {
    const url = new URL(client.url);
    track('client_click', { client_name: client.name, link_url: client.url, link_domain: url.hostname, outbound: true }, {
      event: 'select_content',
      params: { content_type: 'client', content_id: client.name },
    });
  },

  share(method) {
    track('share_click', { method }, {
      event: 'share',
      params: { method, content_type: 'page', item_id: location.pathname },
    });
  },

  introStart() {
    track('intro_start', {}, { event: 'tutorial_begin' });
  },

  introComplete() {
    track('intro_complete', {}, { event: 'tutorial_complete' });
  },

  introSkipped() {
    track('intro_skipped');
  },

  windowZoom(zoomed) {
    track('window_zoom', { zoomed });
  },

  modelInfoOpen() {
    track('model_info_open');
  },

  consent(analyticsStorage) {
    track('consent_update', { analytics_storage: analyticsStorage });
  },
};
