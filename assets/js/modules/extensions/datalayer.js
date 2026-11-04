/** Estensione "DataLayer Inspector": mostra window.dataLayer in tempo reale. */
import { h, copyText, toast } from '../dom.js';
import { icon } from '../icons.js';
import { getLog, subscribe } from '../datalayer.js';
import { jsonTree } from './json-tree.js';

const eventName = (data) => data?.event ?? (data?.gtag ? `gtag: ${data.gtag[0]}` : 'push');

function row(item, { open = false, fresh = false } = {}) {
  const seconds = `+${(item.time / 1000).toFixed(2)} s`;
  return h('li', { class: `dl-row${fresh ? ' is-fresh' : ''}` },
    h('details', { open },
      h('summary', {},
        h('span', { class: 'dl-row__index' }, String(item.index)),
        h('code', { class: 'dl-row__event' }, eventName(item.data)),
        h('span', { class: 'dl-row__time' }, seconds),
      ),
      h('div', { class: 'dl-row__body' }, jsonTree(item.data, { openDepth: 1 })),
    ),
  );
}

export default {
  id: 'datalayer',
  title: 'DataLayer Inspector',
  description: 'Gli eventi di questa pagina e il profilo di Giacomo, in formato dati.',
  icon: 'braces',

  render({ body, setSubtitle, options }) {
    const list = h('ol', { class: 'dl-list', reversed: true });
    const log = getLog();
    const openTarget = options.expand
      ? [...log].reverse().find((item) => item.data?.event === options.expand)
      : log[log.length - 1];

    const subtitle = () => setSubtitle(`${getLog().length} eventi in window.dataLayer`);
    let targetRow = null;
    [...log].reverse().forEach((item) => {
      const el = row(item, { open: item === openTarget });
      if (item === openTarget) targetRow = el;
      list.append(el);
    });
    subtitle();

    const tools = h('div', { class: 'ext-tools' },
      h('p', { class: 'ext-hint' }, 'Usa la chat: i nuovi eventi compaiono qui in cima.'),
      h('button', {
        type: 'button',
        class: 'btn btn--ghost btn--sm',
        html: `${icon('copy', 14)}<span>Copia JSON</span>`,
        onclick: async () => {
          if (await copyText(JSON.stringify(window.dataLayer, null, 2))) toast('dataLayer copiato negli appunti');
        },
      }),
    );

    body.append(tools, list);
    if (targetRow && options.expand) {
      requestAnimationFrame(() => { body.scrollTop = targetRow.offsetTop - tools.offsetHeight - 12; });
    }

    return subscribe((item) => {
      list.prepend(row(item, { fresh: true }));
      subtitle();
    });
  },
};
