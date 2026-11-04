/** Estensione "Tech Stack": competenze di Giacomo + tecnologie di questa pagina. */
import { h } from '../dom.js';
import { profile } from '../../data/profile.js';

const initials = (name) => name.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function item(name) {
  return h('li', { class: 'tech' },
    h('span', { class: 'tech__badge', 'aria-hidden': 'true' }, initials(name)),
    h('span', { class: 'tech__name' }, name));
}

export default {
  id: 'stack',
  title: 'Tech Stack',
  description: 'Competenze e strumenti di Giacomo, raggruppati per area.',
  icon: 'layers',

  render({ body, setSubtitle, api }) {
    const total = profile.skills.reduce((n, g) => n + g.items.length, 0);
    setSubtitle(`${total} tecnologie rilevate su Giacomo`);

    const groups = profile.skills.map((g) =>
      h('section', { class: 'ext-section' },
        h('h3', { class: 'ext-section__title' }, g.group, h('span', { class: 'count' }, String(g.items.length))),
        h('ul', { class: 'tech-list' }, g.items.map(item)),
      ));

    const page = ['HTML semantico', 'CSS custom properties', 'JavaScript (ES modules)', 'Schema.org JSON-LD', 'window.dataLayer', 'GA4 recommended events', 'Consent Mode v2', 'GitHub Pages'];
    if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) page.splice(5, 0, 'Google Tag Manager');
    const thisPage = h('section', { class: 'ext-section ext-section--muted' },
      h('h3', { class: 'ext-section__title' }, 'Questa pagina usa'),
      h('ul', { class: 'tech-list' }, page.map(item)),
    );

    const footer = h('div', { class: 'ext-cta' },
      h('p', {}, 'Vuoi sapere come le combina in un progetto?'),
      h('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => api.ask('stack') }, 'Chiedi a capriol.'),
    );

    body.append(...groups, thisPage, footer);
  },
};
