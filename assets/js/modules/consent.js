/**
 * Consenso ai cookie di analisi, in stile richiesta di permesso di Safari.
 *
 * I default di Consent Mode v2 sono impostati in index.html prima di GTM:
 * - ad_storage, ad_user_data, ad_personalization: sempre "denied" (il sito non fa pubblicità)
 * - analytics_storage: "denied" finché il visitatore non accetta
 * Qui si raccoglie la scelta, la si salva e la si comunica a GTM.
 */
import { $, h } from './dom.js';
import { icon } from './icons.js';
import { analytics } from './analytics.js';

export const CONSENT_KEY = 'capriol:consent';

function stored() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

function save(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* storage non disponibile */ }
}

let prompt;

function apply(value) {
  save(value);
  window.gtag?.('consent', 'update', { analytics_storage: value });
  analytics.consent(value);
  close();
}

function close() {
  if (!prompt) return;
  prompt.classList.remove('is-open');
  setTimeout(() => { prompt.hidden = true; }, 200);
}

function build() {
  prompt = h('div', {
    class: 'consent',
    role: 'dialog',
    'aria-labelledby': 'consent-title',
    'aria-describedby': 'consent-text',
    hidden: true,
  },
  h('div', { class: 'consent__head' },
    h('span', { class: 'consent__icon', html: icon('braces', 16) }),
    h('p', { class: 'consent__title', id: 'consent-title' }, 'capriol.ai vorrebbe usare cookie di analisi'),
  ),
  h('p', { class: 'consent__text', id: 'consent-text' },
    'Servono solo a capire come viene usata questa pagina, tramite Google Analytics 4. Nessuna pubblicità, nessuna profilazione.'),
  h('div', { class: 'consent__actions' },
    h('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => apply('denied') }, 'Non consentire'),
    h('button', { type: 'button', class: 'btn btn--gold btn--sm', onclick: () => apply('granted') }, 'Consenti'),
  ));
  $('#browser').append(prompt);
}

/** Come in Safari, la richiesta scende dal bordo sinistro della barra degli indirizzi. */
function position() {
  if (window.matchMedia('(max-width: 720px)').matches) {
    prompt.style.removeProperty('left');
    return;
  }
  const win = $('#browser').getBoundingClientRect();
  const address = $('.address').getBoundingClientRect();
  prompt.style.left = `${Math.max(12, address.left - win.left)}px`;
}

export function openConsent() {
  if (!prompt) build();
  prompt.hidden = false;
  position();
  requestAnimationFrame(() => prompt.classList.add('is-open'));
}

/** Mostra la richiesta solo se il visitatore non ha ancora scelto. */
export function askConsentIfNeeded() {
  if (!stored()) openConsent();
}
