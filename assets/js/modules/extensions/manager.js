/** Menu "Estensioni" (icona puzzle): elenca e apre tutte le estensioni. */
import { h } from '../dom.js';
import { icon } from '../icons.js';

export default {
  id: 'manager',
  title: 'Estensioni',
  description: 'Gestisci le estensioni installate.',
  icon: 'puzzle',

  render({ body, setSubtitle, api }) {
    const list = api.list();
    setSubtitle(`${list.length} estensioni attive su questo browser`);
    body.append(h('ul', { class: 'ext-manager' }, list.map((ext) =>
      h('li', {},
        h('button', {
          type: 'button',
          class: 'ext-manager__item',
          onclick: () => api.open(ext.id, { source: 'manager' }),
        },
        h('span', { class: 'ext-manager__icon', html: icon(ext.icon, 18) }),
        h('span', { class: 'ext-manager__text' },
          h('span', { class: 'ext-manager__name' }, ext.title),
          h('span', { class: 'ext-manager__desc' }, ext.description)),
        h('span', { class: 'ext-manager__open', html: icon('chevronRight', 16) }),
        )))));
  },
};
