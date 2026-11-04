/**
 * Estensione "DataLayer Inspector": mostra window.dataLayer in tempo reale.
 * Gli eventi GA4 (automatici o consigliati) hanno un badge e il link alla
 * documentazione Google; gli eventi custom mostrano il loro gemello GA4.
 */
import { h, copyText, toast } from '../dom.js';
import { icon } from '../icons.js';
import { getLog, subscribe } from '../datalayer.js';
import { GA4_EVENTS, isGa4Event } from '../analytics.js';
import { jsonTree } from './json-tree.js';

function eventName(data) {
  if (data?.event) return data.event;
  if (data?.gtag) return `gtag: ${data.gtag[0]}${typeof data.gtag[1] === 'string' ? ` ${data.gtag[1]}` : ''}`;
  if (data && 'ecommerce' in data && data.ecommerce === null) return 'ecommerce: null';
  return 'push';
}

/** Categoria della riga: ga4 | custom | system (GTM, gtag, reset ecommerce). */
function kind(data) {
  if (isGa4Event(data?.event)) return 'ga4';
  if (data?.event && !data.event.startsWith('gtm.')) return 'custom';
  return 'system';
}

const labels = { ga4: 'GA4', custom: 'Custom', system: 'GTM' };

function ga4Note(data) {
  const name = isGa4Event(data?.event) ? data.event : data?.ga4_event;
  if (!name || !GA4_EVENTS[name]) return null;
  const ref = GA4_EVENTS[name];
  const text = isGa4Event(data.event)
    ? `Evento GA4 ${ref.type}. `
    : `Gemello GA4: ${name}, evento ${ref.type}. `;
  return h('p', { class: 'dl-ga4' },
    h('span', {}, text),
    h('a', { href: ref.docs, target: '_blank', rel: 'noopener' }, 'Documentazione Google'),
  );
}

function row(item, { open = false, fresh = false } = {}) {
  const k = kind(item.data);
  return h('li', { class: `dl-row${fresh ? ' is-fresh' : ''}`, dataset: { kind: k } },
    h('details', { open },
      h('summary', {},
        h('span', { class: 'dl-row__index' }, String(item.index)),
        h('code', { class: 'dl-row__event' }, eventName(item.data)),
        h('span', { class: `dl-badge dl-badge--${k}` }, labels[k]),
        h('span', { class: 'dl-row__time' }, `+${(item.time / 1000).toFixed(2)} s`),
      ),
      h('div', { class: 'dl-row__body' }, ga4Note(item.data), jsonTree(item.data, { openDepth: 1 })),
    ),
  );
}

export default {
  id: 'datalayer',
  title: 'DataLayer Inspector',
  description: 'Gli eventi di questa pagina e il profilo di Giacomo, in formato dati.',
  icon: 'braces',

  render({ body, setSubtitle, options }) {
    let filter = 'all';
    const list = h('ol', { class: 'dl-list', reversed: true });
    const log = getLog();
    const openTarget = options.expand
      ? [...log].reverse().find((item) => item.data?.event === options.expand)
      : log[log.length - 1];

    const subtitle = () => {
      const all = getLog();
      const ga4 = all.filter((i) => kind(i.data) === 'ga4').length;
      setSubtitle(`${all.length} push in window.dataLayer, ${ga4} eventi GA4`);
    };

    const applyFilter = () => {
      list.querySelectorAll('.dl-row').forEach((li) => {
        li.hidden = filter !== 'all' && li.dataset.kind !== filter;
      });
    };

    let targetRow = null;
    [...log].reverse().forEach((item) => {
      const el = row(item, { open: item === openTarget });
      if (item === openTarget) targetRow = el;
      list.append(el);
    });
    subtitle();

    const filters = h('div', { class: 'segmented', role: 'group', 'aria-label': 'Filtra eventi' },
      [['all', 'Tutti'], ['ga4', 'GA4'], ['custom', 'Custom'], ['system', 'GTM']].map(([value, label]) =>
        h('button', {
          type: 'button',
          'aria-pressed': String(value === filter),
          onclick: (e) => {
            filter = value;
            filters.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
            e.currentTarget.setAttribute('aria-pressed', 'true');
            applyFilter();
          },
        }, label)),
    );

    const tools = h('div', { class: 'ext-tools' },
      filters,
      h('button', {
        type: 'button',
        class: 'btn btn--ghost btn--sm',
        html: `${icon('copy', 14)}<span>Copia JSON</span>`,
        onclick: async () => {
          if (await copyText(JSON.stringify(window.dataLayer, null, 2))) toast('dataLayer copiato negli appunti');
        },
      }),
    );

    const hint = h('p', { class: 'ext-hint' },
      'Ogni azione genera un evento custom e, dove esiste, il suo equivalente GA4 con parametri standard. Usa la chat: i nuovi eventi compaiono in cima.');

    body.append(tools, hint, list);
    if (targetRow && options.expand) {
      requestAnimationFrame(() => { body.scrollTop = targetRow.offsetTop - 12; });
    }

    return subscribe((item) => {
      const el = row(item, { fresh: true });
      list.prepend(el);
      if (filter !== 'all' && el.dataset.kind !== filter) el.hidden = true;
      subtitle();
    });
  },
};
