/**
 * Intro animata: un cursore macOS scrive una domanda alla chat,
 * poi apre l'estensione DataLayer per mostrare il profilo in formato dati.
 * Qualsiasi click o tasto dell'utente interrompe l'intro e restituisce il controllo.
 */
import { $, sleep } from './dom.js';
import * as chat from './chat.js';
import * as extensions from './extensions/index.js';
import { analytics } from './analytics.js';

class Aborted extends Error {}

export function createDemo({ prompt }) {
  const cursor = $('#cursor');
  const skipBtn = $('#skip-intro');
  const input = $('#composer-input');
  const sendBtn = $('#composer-send');
  let aborted = false;
  let running = false;
  let pos = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.8 };

  const guard = () => { if (aborted) throw new Aborted(); };
  const wait = async (ms) => { await sleep(ms); guard(); };

  function place(x, y, duration) {
    cursor.style.setProperty('--dur', `${duration}ms`);
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    pos = { x, y };
  }

  async function moveTo(el, { dx = 0.5, dy = 0.5 } = {}) {
    guard();
    const r = el.getBoundingClientRect();
    const x = r.left + r.width * dx;
    const y = r.top + r.height * dy;
    const distance = Math.hypot(x - pos.x, y - pos.y);
    const duration = Math.round(Math.min(950, Math.max(380, distance * 1.1)));
    place(x, y, duration);
    await wait(duration + 60);
  }

  async function click() {
    cursor.classList.add('is-clicking');
    await wait(140);
    cursor.classList.remove('is-clicking');
  }

  async function type(text) {
    input.focus({ preventScroll: true });
    for (const char of text) {
      guard();
      input.value += char;
      input.dispatchEvent(new Event('input'));
      await sleep(55 + Math.random() * 60);
    }
  }

  function stop() {
    if (!running) return;
    aborted = true;
    chat.finishNow();
    finish();
    analytics.introSkipped();
  }

  function finish() {
    running = false;
    cursor.classList.remove('is-visible');
    skipBtn.hidden = true;
    document.removeEventListener('pointerdown', onUser, true);
    document.removeEventListener('keydown', onUser, true);
  }

  function onUser(e) {
    if (e.isTrusted) stop();
  }

  async function run() {
    if (running) return;
    aborted = false;
    running = true;
    extensions.close();
    if (chat.isBusy()) await chat.whenIdle();
    chat.reset();
    input.value = '';

    skipBtn.hidden = false;
    // Il listener in fase di cattura intercetta il primo gesto dell'utente.
    document.addEventListener('pointerdown', onUser, true);
    document.addEventListener('keydown', onUser, true);

    place(pos.x, pos.y, 0);
    cursor.classList.add('is-visible');
    analytics.introStart();

    try {
      await wait(500);
      await moveTo(input, { dx: 0.12, dy: 0.5 });
      await click();
      await type(prompt);
      await wait(250);
      await moveTo(sendBtn);
      await click();
      input.value = '';
      input.dispatchEvent(new Event('input'));
      const answered = chat.ask(prompt, { source: 'intro' });
      await wait(400);
      await answered;
      guard();
      await wait(700);

      const dlButton = $('.ext-btn[data-ext="datalayer"]');
      await moveTo(dlButton);
      await click();
      extensions.open('datalayer', { source: 'intro', expand: 'profile_loaded' });
      await wait(900);

      const row = $('#ext-popover .dl-row details[open] summary');
      if (row) await moveTo(row, { dx: 0.35 });
      await wait(1600);

      finish();
      analytics.introComplete();
    } catch (err) {
      if (!(err instanceof Aborted)) throw err;
    }
  }

  skipBtn.addEventListener('click', stop);
  return { run, stop };
}
