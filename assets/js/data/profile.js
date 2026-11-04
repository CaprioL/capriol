/**
 * Profilo: unica fonte di verità per i contenuti del sito.
 * Chat, estensioni e dataLayer leggono tutti da qui.
 * Per aggiornare il sito di solito basta modificare questo file.
 */
const IMG = 'assets/img';

export const profile = {
  person: {
    name: 'Giacomo Caprioli',
    brand: 'capriol.',
    tagline: 'Leaps beyond known',
    role: 'Consulente di Digital Marketing',
    experience: 'Oltre 10 anni',
    photo: `${IMG}/brand/giacomo-caprioli.webp`,
    photoFallback: `${IMG}/brand/giacomo-caprioli.jpg`,
    motto: 'Nessuna sfida è troppo grande da non poter essere affrontata.',
    bio: [
      'Consulente marketing con più di un decennio di esperienza nel digital marketing.',
      'Aiuta i brand a incrementare le performance delle loro piattaforme e a capitalizzare sugli investimenti digitali.',
    ],
    focus: ['Strategia', 'SEO', 'Digital Analytics', 'AI & Agentic AI'],
  },

  /** Metodo di lavoro: è una sequenza reale, per questo viene numerata. */
  process: [
    { name: 'Conosciamoci', text: 'Obiettivi, contesto, vincoli. Prima le domande giuste, poi le risposte.' },
    { name: 'Analisi account', text: 'Audit di piattaforme, dati e campagne per capire dove si perde valore.' },
    { name: 'Progetto di digital marketing', text: 'Un piano su misura, con priorità, KPI e responsabilità chiare.' },
  ],

  services: [
    {
      id: 'advisory',
      area: 'Advisory',
      name: 'Consulting',
      icon: `${IMG}/icons/services/advisory.png`,
      text: 'Strategia digitale, audit e affiancamento al team, dalla domanda giusta al piano operativo.',
    },
    {
      id: 'communications',
      area: 'Communications & Content',
      name: 'Comunicazione',
      icon: `${IMG}/icons/services/communications.png`,
      text: 'Messaggi, contenuti e identità visiva coerenti su ogni touchpoint.',
    },
    {
      id: 'seo',
      area: 'Web Optimization',
      name: 'SEO',
      icon: `${IMG}/icons/services/seo.png`,
      text: 'SEO tecnica e on-page, architettura dei contenuti e visibilità nelle risposte delle AI.',
    },
    {
      id: 'analytics',
      area: 'MarTech & Data',
      name: 'Digital Intelligence & Analytics',
      icon: `${IMG}/icons/services/analytics.png`,
      text: 'Tracking plan, dataLayer, GA4 e BigQuery: dati affidabili per decidere.',
    },
    {
      id: 'advertising',
      area: 'Digital Marketing',
      name: 'Online Advertising',
      icon: `${IMG}/icons/services/advertising.png`,
      text: 'Campagne a performance, gestione del budget e misurazione dei risultati.',
    },
  ],

  values: [
    { name: 'Relazione', icon: `${IMG}/icons/values/relazione.png`, text: 'Si lavora fianco a fianco, non da fornitore esterno.' },
    { name: 'Trasparenza', icon: `${IMG}/icons/values/trasparenza.png`, text: 'Numeri, scelte e risultati sempre visibili.' },
    { name: 'Proattività', icon: `${IMG}/icons/values/proattivita.png`, text: 'Le proposte arrivano prima che servano.' },
    { name: 'Approcci su misura', icon: `${IMG}/icons/values/su-misura.png`, text: 'Nessun pacchetto standard: si parte dal tuo contesto.' },
  ],

  /** Competenze e strumenti. Alimentano la chat e l'estensione "Tech Stack". */
  skills: [
    { group: 'Design & Comunicazione', items: ['Brand identity', 'Graphic design', 'UX / UI', 'Copywriting', 'Content strategy'] },
    { group: 'SEO', items: ['SEO tecnica', 'SEO on-page', 'Google Search Console', 'Dati strutturati', 'AI search visibility'] },
    { group: 'Digital Analytics', items: ['Google Analytics 4', 'Google Tag Manager', 'DataLayer design', 'Tracking plan', 'Consent Mode'] },
    { group: 'Data & Programmazione', items: ['SQL', 'BigQuery', 'JavaScript', 'HTML & CSS', 'Dashboarding'] },
    { group: 'AI & Agentic AI', items: ['LLM', 'Prompt engineering', 'Agentic workflows', 'MCP', 'Automazioni'] },
    { group: 'Advertising', items: ['Google Ads', 'Meta Ads', 'Performance measurement'] },
  ],

  clients: [
    { name: 'TEDxVerona', logo: `${IMG}/clients/tedx-verona.webp` },
    { name: 'Croce Rossa Italiana', logo: `${IMG}/clients/croce-rossa-italiana.webp` },
    { name: 'Rampi', logo: `${IMG}/clients/rampi.webp` },
    { name: 'MIDJ', logo: `${IMG}/clients/midj.webp` },
    { name: 'NimbleBit', logo: `${IMG}/clients/nimblebit.webp` },
    { name: 'LifeBites', logo: `${IMG}/clients/lifebites.webp` },
    { name: 'Radio Iusve', logo: `${IMG}/clients/radio-iusve.webp` },
  ],

  contact: {
    email: 'giacomo.caprioli@gmail.com',
    /** Placeholder: sostituisci con il numero reale quando vuoi pubblicarlo. */
    phone: '+39 347 0000000',
    /** Lascia vuoto per nascondere LinkedIn ovunque. */
    linkedin: 'https://www.linkedin.com/in/giacomo-caprioli/',
    cta: 'E ora fai la tua mossa ;)',
  },
};
