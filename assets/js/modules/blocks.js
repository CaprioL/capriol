/**
 * Renderer dei blocchi "ricchi" delle risposte (card, griglie, liste).
 * I blocchi di testo sono gestiti da chat.js perché vengono "streammati".
 */
import { h, copyText, toast } from './dom.js';
import { icon } from './icons.js';
import { analytics } from './analytics.js';

function picture(src, fallback, alt, attrs = {}) {
  return h('picture', {},
    h('source', { srcset: src, type: 'image/webp' }),
    h('img', { src: fallback || src, alt, loading: 'lazy', decoding: 'async', ...attrs }),
  );
}

const renderers = {
  profile({ profile }) {
    const p = profile.person;
    return h('div', { class: 'card profile-card' },
      h('div', { class: 'profile-card__photo' }, picture(p.photo, p.photoFallback, p.name, { width: 96, height: 96 })),
      h('div', { class: 'profile-card__body' },
        h('p', { class: 'profile-card__name' }, p.name),
        h('p', { class: 'profile-card__role' }, `${p.role}. ${p.experience} di esperienza.`),
        h('ul', { class: 'chips', 'aria-label': 'Aree principali' }, p.focus.map((f) => h('li', { class: 'chip' }, f))),
      ),
    );
  },

  services({ profile }) {
    return h('ul', { class: 'service-grid' }, profile.services.map((s) =>
      h('li', { class: 'service' },
        h('img', { class: 'service__icon', src: s.icon, alt: '', width: 40, height: 40, loading: 'lazy' }),
        h('p', { class: 'service__area' }, s.area),
        h('p', { class: 'service__name' }, s.name),
        h('p', { class: 'service__text' }, s.text),
      ),
    ));
  },

  process({ profile }) {
    return h('ol', { class: 'steps' }, profile.process.map((step) =>
      h('li', { class: 'step' },
        h('p', { class: 'step__name' }, step.name),
        h('p', { class: 'step__text' }, step.text),
      ),
    ));
  },

  skills({ profile }) {
    return h('div', { class: 'skill-groups' }, profile.skills.map((g) =>
      h('section', { class: 'skill-group' },
        h('h3', { class: 'skill-group__title' }, g.group),
        h('ul', { class: 'chips' }, g.items.map((item) => h('li', { class: 'chip' }, item))),
      ),
    ));
  },

  values({ profile }) {
    return h('ul', { class: 'value-grid' }, profile.values.map((v) =>
      h('li', { class: 'value' },
        h('img', { class: 'value__icon', src: v.icon, alt: '', height: 36, loading: 'lazy' }),
        h('p', { class: 'value__name' }, v.name),
        h('p', { class: 'value__text' }, v.text),
      ),
    ));
  },

  quote({ profile }) {
    return h('blockquote', { class: 'motto' }, profile.person.motto);
  },

  clients({ profile }, block) {
    const large = block.size === 'lg';
    // L'ultima voce lascia intendere che la lista non è completa.
    const more = large
      ? h('li', { class: 'clients__more' },
        h('span', { class: 'clients__more-title' }, profile.clientsNote),
        h('span', { class: 'clients__more-text' }, profile.clientsTeaser))
      : h('li', { class: 'clients__more' }, profile.clientsNote.toLowerCase());
    return h('figure', { class: `clients clients--${large ? 'lg' : 'sm'}` },
      block.caption ? h('figcaption', { class: 'clients__caption' }, block.caption) : null,
      h('ul', { class: 'clients__list' }, profile.clients.map((c) => {
        const logo = h('img', { src: c.logo, alt: c.name, title: c.name, loading: 'lazy', decoding: 'async' });
        return h('li', {}, c.url
          ? h('a', { href: c.url, target: '_blank', rel: 'noopener', onclick: () => analytics.clientClick(c) }, logo)
          : logo);
      }), more),
    );
  },

  list(_ctx, block) {
    return h('ul', { class: 'answer-list' }, block.items.map((item) => h('li', {}, item)));
  },

  contact({ profile }) {
    return contactCard(profile);
  },

  action({ openExtension }, block) {
    return h('button', {
      type: 'button',
      class: 'btn btn--ghost answer-action',
      onclick: () => openExtension(block.extension, { source: 'chat' }),
      html: `${icon('puzzle', 16)}<span>${block.label}</span>`,
    });
  },
};

/** Card contatti: usata sia in chat sia nell'estensione "Fai la tua mossa". */
export function contactCard(profile, { compact = false } = {}) {
  const c = profile.contact;
  const tel = c.phone.replace(/[^\d+]/g, '');
  const track = (method) => () => analytics.contact(method);

  const copyBtn = h('button', {
    type: 'button',
    class: 'btn btn--ghost',
    html: `${icon('copy', 16)}<span>Copia email</span>`,
    onclick: async () => {
      if (await copyText(c.email)) toast('Email copiata');
      analytics.contact('copy_email');
    },
  });

  return h('div', { class: `card contact-card${compact ? ' contact-card--compact' : ''}` },
    h('p', { class: 'contact-card__cta' }, c.cta),
    h('dl', { class: 'contact-card__list' },
      h('div', {}, h('dt', { html: icon('mail', 16) + '<span class="sr-only">Email</span>' }),
        h('dd', {}, h('a', { href: `mailto:${c.email}`, onclick: track('email') }, c.email))),
      h('div', {}, h('dt', { html: icon('phone', 16) + '<span class="sr-only">Telefono</span>' }),
        h('dd', {}, h('a', { href: `tel:${tel}`, onclick: track('phone') }, c.phone))),
      c.linkedin ? h('div', {}, h('dt', { html: icon('linkedin', 16) + '<span class="sr-only">LinkedIn</span>' }),
        h('dd', {}, h('a', { href: c.linkedin, target: '_blank', rel: 'noopener', onclick: track('linkedin') }, 'LinkedIn'))) : null,
    ),
    h('div', { class: 'contact-card__actions' },
      h('a', { class: 'btn btn--gold', href: `mailto:${c.email}?subject=${encodeURIComponent('Ciao Giacomo, parliamo di un progetto')}`, onclick: track('email_cta'), html: `${icon('mail', 16)}<span>Scrivi a Giacomo</span>` }),
      copyBtn,
    ),
  );
}

export function renderBlock(block, ctx) {
  const render = renderers[block.type];
  return render ? render(ctx, block) : null;
}
