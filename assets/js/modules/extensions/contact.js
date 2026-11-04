/** Estensione "Fai la tua mossa": contatti diretti. Il cavallo richiama la scacchiera del brand. */
import { h } from '../dom.js';
import { profile } from '../../data/profile.js';
import { contactCard } from '../blocks.js';

export default {
  id: 'contact',
  title: 'Fai la tua mossa',
  description: 'Email e telefono di Giacomo, a un clic.',
  icon: 'knight',

  render({ body, setSubtitle }) {
    const p = profile.person;
    setSubtitle('Contatti diretti');
    body.append(
      h('div', { class: 'mini-profile' },
        h('picture', {},
          h('source', { srcset: p.photo, type: 'image/webp' }),
          h('img', { src: p.photoFallback, alt: '', width: 56, height: 56 })),
        h('div', {},
          h('p', { class: 'mini-profile__name' }, p.name),
          h('p', { class: 'mini-profile__role' }, p.role)),
      ),
      contactCard(profile, { compact: true }),
    );
  },
};
