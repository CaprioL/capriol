/**
 * Raccoglie dal vivo alcune metriche di performance con PerformanceObserver.
 * Le legge l'estensione "SEO Inspector". Nessun dato lascia il browser.
 */
const vitals = { lcp: null, cls: 0, fcp: null, ttfb: null };

function observe(type, callback) {
  try {
    const po = new PerformanceObserver((list) => list.getEntries().forEach(callback));
    po.observe({ type, buffered: true });
  } catch {
    /* tipo non supportato dal browser */
  }
}

export function startMetrics() {
  observe('largest-contentful-paint', (e) => { vitals.lcp = e.startTime; });
  observe('layout-shift', (e) => { if (!e.hadRecentInput) vitals.cls += e.value; });
  observe('paint', (e) => { if (e.name === 'first-contentful-paint') vitals.fcp = e.startTime; });
  const nav = performance.getEntriesByType('navigation')[0];
  if (nav) vitals.ttfb = nav.responseStart;
}

/** Soglie ufficiali di web.dev: [buono, da migliorare]. */
const thresholds = {
  lcp: [2500, 4000],
  cls: [0.1, 0.25],
  fcp: [1800, 3000],
  ttfb: [800, 1800],
};

export function getVitals() {
  return Object.entries(vitals).map(([key, value]) => {
    const [good, poor] = thresholds[key];
    const status = value === null ? 'na' : value <= good ? 'good' : value <= poor ? 'warn' : 'bad';
    const display = value === null
      ? 'n.d.'
      : key === 'cls' ? value.toFixed(3) : `${(value / 1000).toFixed(2)} s`;
    return { key, label: key.toUpperCase(), value, display, status };
  });
}
