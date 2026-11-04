/**
 * Wrapper attorno al vero window.dataLayer.
 * Ogni push (nostro, di GTM o di gtag) viene registrato con un timestamp
 * relativo al caricamento, così l'estensione "DataLayer Inspector" può
 * mostrarlo in tempo reale.
 */
window.dataLayer = window.dataLayer || [];

const listeners = new Set();
const log = [];

/** Rende serializzabile un push di gtag (che usa l'oggetto `arguments`). */
function toPlain(entry) {
  if (entry && typeof entry === 'object' && !Array.isArray(entry) && typeof entry.length === 'number' && !('event' in entry)) {
    return { gtag: Array.from(entry) };
  }
  return entry;
}

function record(entry) {
  const item = { index: log.length, time: performance.now(), data: toPlain(entry) };
  log.push(item);
  listeners.forEach((fn) => fn(item));
}

// Registra ciò che era già presente prima del nostro script.
window.dataLayer.forEach(record);

// Intercetta i push futuri, da qualunque sorgente.
const originalPush = window.dataLayer.push.bind(window.dataLayer);
window.dataLayer.push = (...entries) => {
  const result = originalPush(...entries);
  entries.forEach(record);
  return result;
};

export const push = (entry) => window.dataLayer.push(entry);
export const getLog = () => log;
export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
