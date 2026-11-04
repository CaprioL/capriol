/** Estensione "SEO Inspector": analizza davvero il documento corrente. */
import { h } from '../dom.js';
import { getVitals } from '../metrics.js';

const meta = (selector) => document.querySelector(selector)?.getAttribute('content') ?? '';

function jsonLdTypes() {
  const types = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try {
      const data = JSON.parse(s.textContent);
      const nodes = data['@graph'] ?? [data];
      nodes.forEach((n) => types.push(...[].concat(n['@type'] ?? [])));
    } catch { /* JSON-LD non valido */ }
  });
  return types;
}

function checks() {
  const title = document.title;
  const desc = meta('meta[name="description"]');
  const h1s = document.querySelectorAll('h1');
  const canonical = document.querySelector('link[rel="canonical"]')?.href ?? '';
  const og = document.querySelectorAll('meta[property^="og:"]').length;
  const types = jsonLdTypes();
  const imgs = [...document.images];
  const noAlt = imgs.filter((img) => !img.hasAttribute('alt')).length;
  const robots = meta('meta[name="robots"]') || 'index, follow';

  const inRange = (n, min, max) => (n >= min && n <= max ? 'good' : 'warn');
  return [
    { label: 'Title', value: title, note: `${title.length} caratteri`, status: inRange(title.length, 30, 65) },
    { label: 'Meta description', value: desc || 'Assente', note: `${desc.length} caratteri`, status: desc ? inRange(desc.length, 70, 160) : 'bad' },
    { label: 'H1', value: h1s[0]?.textContent.trim() || 'Assente', note: `${h1s.length} nella pagina`, status: h1s.length === 1 ? 'good' : 'warn' },
    { label: 'Canonical', value: canonical || 'Assente', status: canonical ? 'good' : 'warn' },
    { label: 'Robots', value: robots, status: /noindex/.test(robots) ? 'bad' : 'good' },
    { label: 'Lingua', value: document.documentElement.lang || 'Non dichiarata', status: document.documentElement.lang ? 'good' : 'warn' },
    { label: 'Open Graph', value: `${og} tag`, status: og >= 4 ? 'good' : 'warn' },
    { label: 'Dati strutturati', value: types.length ? types.join(', ') : 'Nessuno', note: 'JSON-LD', status: types.length ? 'good' : 'warn' },
    { label: 'Testo alternativo', value: noAlt ? `${noAlt} immagini senza alt` : 'Tutte le immagini hanno alt', status: noAlt ? 'warn' : 'good' },
    { label: 'HTTPS', value: location.protocol === 'https:' ? 'Attivo' : 'Non attivo in locale', status: location.protocol === 'https:' ? 'good' : 'warn' },
  ];
}

const dot = (status) => h('span', { class: `status status--${status}`, 'aria-hidden': 'true' });
const statusText = { good: 'Ok', warn: 'Da rivedere', bad: 'Problema', na: 'Non disponibile' };

export default {
  id: 'seo',
  title: 'SEO Inspector',
  description: 'Meta tag, dati strutturati e Core Web Vitals misurati dal vivo su questa pagina.',
  icon: 'search',

  render({ body, setSubtitle, api }) {
    const results = checks();
    const passed = results.filter((r) => r.status === 'good').length;
    setSubtitle(`${passed} controlli su ${results.length} superati`);

    const vitals = h('section', { class: 'ext-section' },
      h('h3', { class: 'ext-section__title' }, 'Performance misurate ora'),
      h('ul', { class: 'vitals' }, getVitals().map((v) =>
        h('li', { class: `vital vital--${v.status}` },
          h('span', { class: 'vital__label' }, v.label),
          h('span', { class: 'vital__value' }, v.display),
          h('span', { class: 'sr-only' }, statusText[v.status]),
        ))),
    );

    const list = h('section', { class: 'ext-section' },
      h('h3', { class: 'ext-section__title' }, 'On-page'),
      h('ul', { class: 'seo-checks' }, results.map((r) =>
        h('li', { class: 'seo-check' },
          dot(r.status),
          h('div', {},
            h('p', { class: 'seo-check__label' }, r.label, h('span', { class: 'sr-only' }, `: ${statusText[r.status]}`),
              r.note ? h('span', { class: 'seo-check__note' }, r.note) : null),
            h('p', { class: 'seo-check__value' }, r.value),
          ),
        ))),
    );

    const footer = h('div', { class: 'ext-cta' },
      h('p', {}, 'Audit SEO e visibilità nelle AI sono tra i servizi di Giacomo.'),
      h('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => api.ask('seo') }, 'Chiedi a capriol.'),
    );

    body.append(vitals, list, footer);
  },
};
