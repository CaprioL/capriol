/**
 * Icone SVG inline (24×24, tratto currentColor).
 * Inline per evitare richieste extra e per ereditare il colore dal contesto.
 */
const paths = {
  sidebar: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9.5 4v16"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  reload: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
  share: '<path d="M12 3v12"/><path d="m8 7 4-4 4 4"/><path d="M6 12H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  braces: '<path d="M8 3.5c-2 0-3 1-3 3v2.2c0 1.2-.8 2.3-2 2.8 1.2.5 2 1.6 2 2.8v2.2c0 2 1 3 3 3"/><path d="M16 3.5c2 0 3 1 3 3v2.2c0 1.2.8 2.3 2 2.8-1.2.5-2 1.6-2 2.8v2.2c0 2-1 3-3 3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.6-4.6"/>',
  layers: '<path d="m12 3 9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
  knight: '<path d="M6 21h12"/><path d="M7.5 18h9.5"/><path d="M9 18c.3-2.6 1.7-4.3 3.6-6.1l-3.9 1.5-2.2-1.9c.5-2.8 2.4-4.9 5-5.9L11 3.4l2.4 1.4C16.5 5.5 18 8.5 18 12.2V18"/><circle cx="12.7" cy="8.4" r=".7" fill="currentColor" stroke="none"/>',
  puzzle: '<path d="M10 4.5a2 2 0 0 1 4 0V6h3a1 1 0 0 1 1 1v3h1.5a2 2 0 0 1 0 4H18v3a1 1 0 0 1-1 1h-3v-1.5a2 2 0 0 0-4 0V18H7a1 1 0 0 1-1-1v-3h1.5a2 2 0 0 0 0-4H6V7a1 1 0 0 1 1-1h3z"/>',
  send: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  stop: '<rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  thumbUp: '<path d="M7 11v9H4.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/><path d="M7 11l4-7.5a2 2 0 0 1 2.5 2.3L12.8 10H18a2 2 0 0 1 2 2.3l-1.1 6A2 2 0 0 1 17 20H7"/>',
  thumbDown: '<path d="M17 13V4h2.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z"/><path d="M17 13l-4 7.5a2 2 0 0 1-2.5-2.3l.7-4.2H6a2 2 0 0 1-2-2.3l1.1-6A2 2 0 0 1 7 4h10"/>',
  regenerate: '<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5"/><path d="M4 20v-4.5h4.5"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  phone: '<path d="M5 4h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.4 6.4l1.3-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  compose: '<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M18.4 3.6a2 2 0 0 1 2.8 2.8L12 15.6l-3.6.8.8-3.6z"/>',
  play: '<path d="M7 5v14l12-7z"/>',
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.3a9.5 9.5 0 0 1 13 0"/><path d="M8.6 15.6a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2.5"/><rect x="4" y="9" width="12" height="6" rx="1" fill="currentColor" stroke="none"/><path d="M22 10.5v3"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
};

export function icon(name, size = 18, extraClass = '') {
  return `<svg class="icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || ''}</svg>`;
}
