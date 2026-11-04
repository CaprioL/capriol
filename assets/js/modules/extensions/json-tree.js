/** Albero JSON navigabile con <details>, come nei DevTools. */
import { h } from '../dom.js';

function primitive(value) {
  if (value === null) return h('span', { class: 'j-null' }, 'null');
  switch (typeof value) {
    case 'string': return h('span', { class: 'j-str' }, `"${value}"`);
    case 'number': return h('span', { class: 'j-num' }, String(value));
    case 'boolean': return h('span', { class: 'j-bool' }, String(value));
    case 'function': return h('span', { class: 'j-null' }, 'ƒ()');
    default: return h('span', { class: 'j-null' }, String(value));
  }
}

function preview(value) {
  return Array.isArray(value) ? `Array(${value.length})` : `{…} ${Object.keys(value).length}`;
}

function node(key, value, depth, openDepth) {
  const label = key === null ? null : h('span', { class: 'j-key' }, typeof key === 'number' ? String(key) : key);
  if (value && typeof value === 'object') {
    const entries = Array.isArray(value) ? value.map((v, i) => [i, v]) : Object.entries(value);
    return h('li', {},
      h('details', { open: depth < openDepth },
        h('summary', {}, label, label ? ': ' : null, h('span', { class: 'j-preview' }, preview(value))),
        h('ul', { class: 'j-children' }, entries.map(([k, v]) => node(k, v, depth + 1, openDepth))),
      ),
    );
  }
  return h('li', { class: 'j-leaf' }, label, label ? ': ' : null, primitive(value));
}

/** Renderizza le chiavi di primo livello di un oggetto. */
export function jsonTree(value, { openDepth = 1 } = {}) {
  const entries = Array.isArray(value) ? value.map((v, i) => [i, v]) : Object.entries(value ?? {});
  return h('ul', { class: 'j-tree' }, entries.map(([k, v]) => node(k, v, 0, openDepth)));
}
