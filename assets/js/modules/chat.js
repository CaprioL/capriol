/**
 * Motore della chat: riconosce l'intento, mostra la tool call,
 * "streamma" il testo e monta i blocchi ricchi.
 * Nessuna API esterna: tutto è deterministico e funziona su GitHub Pages.
 */
import { h, sleep, normalize, parseBold, copyText, toast, reducedMotion } from './dom.js';
import { icon } from './icons.js';
import { push } from './datalayer.js';
import { renderBlock } from './blocks.js';
import { intents, greeting, fallback } from '../data/intents.js';
import { profile } from '../data/profile.js';
import { config } from '../config.js';

const byId = Object.fromEntries(intents.map((intent) => [intent.id, intent]));

let els = {};
let ctx = {};
let welcome = null;
let busy = false;
let skip = false; // completa la risposta corrente senza animazioni
let follow = true; // segue lo streaming finché l'utente non scorre verso l'alto
let idleWaiters = [];

/* ---------- Matching ---------- */

/** Punteggio = somma delle lunghezze delle keyword trovate (le più specifiche pesano di più). */
export function matchIntent(text) {
  const n = ` ${normalize(text)} `;
  let best = null;
  let bestScore = 0;
  for (const intent of [...intents, greeting]) {
    let score = 0;
    for (const raw of intent.keywords) {
      const k = normalize(raw);
      const hit = k.length <= 3 ? n.includes(` ${k} `) : n.includes(` ${k}`);
      if (hit) score += k.length;
    }
    if (intent === greeting) score *= 0.5;
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  if (best) return best;
  if (/\b(giacomo|caprioli|lui)\b/.test(n)) return byId.about;
  return fallback;
}

/* ---------- Scroll ---------- */

const stick = (force = false) => {
  if (force || follow) els.thread.scrollTop = els.thread.scrollHeight;
};

/* ---------- Rendering ---------- */

function avatar() {
  return h('div', { class: 'msg__avatar', 'aria-hidden': 'true' },
    h('img', { src: 'assets/img/brand/monogram.png', alt: '', width: 28, height: 28 }));
}

function userMessage(text) {
  return h('article', { class: 'msg msg--user', 'aria-label': 'Il tuo messaggio' },
    h('div', { class: 'msg__bubble' }, text));
}

function randomDelay() {
  const [min, max] = config.streamDelay;
  return min + Math.random() * (max - min);
}

async function streamText(p, text) {
  p.classList.add('is-streaming');
  for (const seg of parseBold(text)) {
    const target = seg.bold ? p.appendChild(h('strong')) : p;
    for (const word of seg.text.split(/(\s+)/)) {
      if (!word) continue;
      target.append(word);
      if (!skip && /\S/.test(word)) {
        stick();
        await sleep(randomDelay());
      }
    }
  }
  p.normalize();
  p.classList.remove('is-streaming');
}

function toolCall(tool) {
  const result = tool.pick(profile);
  const call = `${tool.name}(${Object.keys(tool.args).length ? JSON.stringify(tool.args) : ''})`;
  const details = h('details', { class: 'toolcall is-running' },
    h('summary', {},
      h('span', { class: 'toolcall__icon', html: icon('wrench', 14) }),
      h('span', { class: 'toolcall__label' }, 'Ha usato lo strumento '),
      h('code', {}, tool.name),
      h('span', { class: 'toolcall__status', 'aria-hidden': 'true' }),
      h('span', { class: 'toolcall__chevron', html: icon('chevronDown', 14) }),
    ),
    h('pre', { class: 'toolcall__body' },
      h('code', {}, `> ${call}\n${JSON.stringify(result, null, 2)}`)),
  );
  return details;
}

function followups(ids) {
  return h('div', { class: 'followups', role: 'group', 'aria-label': 'Domande suggerite' },
    ids.map((id) => byId[id]).filter(Boolean).map((intent) =>
      h('button', {
        type: 'button',
        class: 'chip chip--action',
        onclick: () => ask(intent.prompt, { source: 'followup', intentId: intent.id }),
      }, intent.prompt)),
  );
}

function messageActions(body, intent, prompt) {
  const feedback = (value) => (e) => {
    const btn = e.currentTarget;
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.parentElement.querySelectorAll('[data-feedback]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', String(!pressed));
    if (!pressed) {
      push({ event: 'chat_feedback', intent: intent.id, feedback: value });
      toast('Grazie, feedback registrato nel dataLayer');
    }
  };
  const btn = (name, label, onclick, extra = {}) =>
    h('button', { type: 'button', class: 'icon-btn icon-btn--sm', 'aria-label': label, title: label, onclick, html: icon(name, 16), ...extra });

  return h('div', { class: 'msg__actions' },
    btn('copy', 'Copia risposta', async () => {
      if (await copyText(body.innerText.trim())) toast('Risposta copiata');
    }),
    btn('thumbUp', 'Risposta utile', feedback('positive'), { 'aria-pressed': 'false', 'data-feedback': '' }),
    btn('thumbDown', 'Risposta non utile', feedback('negative'), { 'aria-pressed': 'false', 'data-feedback': '' }),
    intent.id !== 'fallback'
      ? btn('regenerate', 'Rigenera risposta', () => ask(prompt, { source: 'regenerate', intentId: intent.id }))
      : null,
  );
}

function setBusy(value) {
  busy = value;
  els.form.classList.toggle('is-busy', value);
  els.send.setAttribute('aria-label', value ? 'Completa la risposta' : 'Invia messaggio');
  els.send.innerHTML = icon(value ? 'stop' : 'send', 18);
  updateSendState();
  if (!value) {
    skip = false;
    idleWaiters.forEach((resolve) => resolve());
    idleWaiters = [];
  }
}

function updateSendState() {
  els.send.disabled = !busy && !els.input.value.trim();
}

function markActive(id) {
  els.list?.querySelectorAll('button').forEach((b) =>
    b.toggleAttribute('aria-current', b.dataset.intent === id));
}

/* ---------- API pubblica ---------- */

export async function ask(text, { source = 'typed', intentId } = {}) {
  const prompt = text.trim();
  if (busy || !prompt) return;
  setBusy(true);
  follow = true;
  if (reducedMotion()) skip = true;

  if (welcome) welcome.hidden = true;
  els.thread.append(userMessage(prompt));
  stick(true);

  const intent = intentId ? byId[intentId] : matchIntent(prompt);
  push({ event: 'chat_prompt', prompt_source: source, prompt_text: prompt.slice(0, 100), intent: intent.id });
  markActive(intent.id);

  const body = h('div', { class: 'msg__body' });
  const thinking = h('p', { class: 'thinking' }, 'Sto pensando');
  const msg = h('article', { class: 'msg msg--assistant', 'aria-busy': 'true', 'aria-label': 'Risposta di capriol.' }, avatar(), body);
  body.append(thinking);
  els.thread.append(msg);
  stick(true);
  if (!skip) await sleep(450 + Math.random() * 350);
  thinking.remove();

  if (intent.tool) {
    const call = toolCall(intent.tool);
    body.append(call);
    stick();
    if (!skip) await sleep(520);
    call.classList.remove('is-running');
  }

  for (const block of intent.blocks) {
    if (block.type === 'text') {
      const p = h('p', { class: 'msg__text' });
      body.append(p);
      await streamText(p, block.text);
    } else {
      const el = renderBlock(block, ctx);
      if (!el) continue;
      el.classList.add('block-enter');
      body.append(el);
      stick();
      if (!skip) await sleep(160);
    }
  }

  if (intent.followups?.length) body.append(followups(intent.followups));
  body.append(messageActions(body, intent, prompt));
  msg.setAttribute('aria-busy', 'false');
  stick();

  push({
    event: 'chat_response',
    intent: intent.id,
    tool: intent.tool?.name ?? null,
    blocks: intent.blocks.map((b) => b.type),
  });
  setBusy(false);
}

/** Completa subito la risposta in corso (pulsante stop o interruzione dell'intro). */
export function finishNow() {
  if (busy) skip = true;
}

export function whenIdle() {
  return busy ? new Promise((resolve) => idleWaiters.push(resolve)) : Promise.resolve();
}

export const isBusy = () => busy;

/** Nuova chat: svuota il thread e ripristina la schermata di benvenuto. */
export function reset() {
  if (busy || !welcome || !welcome.hidden) return;
  els.thread.replaceChildren(welcome);
  welcome.hidden = false;
  els.thread.scrollTop = 0;
  markActive(null);
  push({ event: 'chat_reset' });
  els.input.focus();
}

export function initChat({ thread, form, input, send, list, openExtension, onNavigate }) {
  els = { thread, form, input, send, list };
  ctx = { profile, openExtension };
  welcome = thread.querySelector('.welcome');

  // Se l'utente scorre verso l'alto durante una risposta, smettiamo di seguirla.
  thread.addEventListener('wheel', (e) => { if (e.deltaY < 0) follow = false; }, { passive: true });
  thread.addEventListener('touchmove', () => { follow = false; }, { passive: true });

  // Sidebar: una voce per intento.
  list.replaceChildren(...intents.map((intent) =>
    h('li', {}, h('button', {
      type: 'button',
      class: 'history__item',
      dataset: { intent: intent.id },
      onclick: () => {
        onNavigate?.();
        ask(intent.prompt, { source: 'sidebar', intentId: intent.id });
      },
    }, intent.label))));

  // Suggerimenti della schermata di benvenuto.
  welcome?.querySelectorAll('[data-intent]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const intent = byId[btn.dataset.intent];
      ask(intent.prompt, { source: 'suggestion', intentId: intent.id });
    }));

  // Composer.
  const autosize = () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
    updateSendState();
  };
  input.addEventListener('input', autosize);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy) return finishNow();
    const text = input.value;
    input.value = '';
    autosize();
    ask(text, { source: form.dataset.source || 'typed' });
    delete form.dataset.source;
  });
  setBusy(false);
}
