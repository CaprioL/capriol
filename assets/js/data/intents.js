/**
 * Intenti della chat.
 * Ogni intento ha: le parole chiave che lo attivano, il prompt mostrato nella
 * sidebar, uno "strumento" finto (come i tool call di un LLM) e una lista di
 * blocchi che compongono la risposta. I blocchi sono renderizzati da
 * modules/blocks.js; i testi supportano **grassetto**.
 */
export const intents = [
  {
    id: 'about',
    label: 'Chi è Giacomo',
    prompt: 'Chi è Giacomo?',
    keywords: ['chi e', 'chi sei', 'parlami di lui', 'presentati', 'presentazione', 'bio', 'profilo', 'esperienza', 'about'],
    tool: { name: 'profile.get', args: { id: 'giacomo-caprioli' }, pick: (p) => p.person },
    blocks: [
      { type: 'text', text: 'Giacomo Caprioli è un **consulente di digital marketing** con oltre dieci anni di esperienza. Aiuta i brand a migliorare le **performance** delle loro piattaforme e a far rendere gli **investimenti digitali**.' },
      { type: 'profile' },
      { type: 'text', text: 'Lavora all’incrocio tra comunicazione, SEO, dati e AI: disegna la strategia, mette le mani sul tracciamento e scrive il codice quando serve.' },
      { type: 'clients', size: 'sm', caption: 'Ha collaborato con' },
    ],
    followups: ['services', 'stack', 'contact'],
  },
  {
    id: 'services',
    label: 'Servizi',
    prompt: 'Quali servizi offre?',
    keywords: ['servizi', 'servizio', 'offri', 'offre', 'cosa fa', 'cosa fai', 'consulenza', 'consulting', 'aree', 'aiutarmi', 'aiuto'],
    tool: { name: 'services.list', args: {}, pick: (p) => p.services.map(({ area, name }) => ({ area, name })) },
    blocks: [
      { type: 'text', text: 'Cinque aree, che funzionano da sole o insieme:' },
      { type: 'services' },
      { type: 'text', text: 'Ogni progetto segue lo stesso percorso:' },
      { type: 'process' },
    ],
    followups: ['seo', 'analytics', 'contact'],
  },
  {
    id: 'stack',
    label: 'Competenze e Stack',
    prompt: 'Che competenze e strumenti usa?',
    keywords: ['competenze', 'competenza', 'skill', 'stack', 'strumenti', 'tool', 'tecnologie', 'sa fare', 'programma', 'programmazione', 'codice', 'python', 'javascript', 'design', 'grafica', 'proxmox', 'hetzner', 'notion', 'server', 'infrastruttura'],
    tool: { name: 'stack.scan', args: { target: 'giacomo' }, pick: (p) => Object.fromEntries(p.skills.map((s) => [s.group, s.items.length])) },
    blocks: [
      { type: 'text', text: 'Un profilo ibrido: **designer** quanto basta, **analista** per vocazione, **sviluppatore** quando serve.' },
      { type: 'skills' },
      { type: 'text', text: 'Dati in **BigQuery** e **SQL**, pipeline ETL con **Funnel.io**, dashboard in **Looker Studio**. Codice in **Python** e **JavaScript**, e-commerce su **Shopify**. Server propri su **Proxmox** e **Hetzner**, e tutto documentato in **Notion**.' },
      { type: 'action', label: 'Apri l’estensione Tech Stack', extension: 'stack' },
    ],
    followups: ['ai', 'analytics', 'contact'],
  },
  {
    id: 'ai',
    label: 'AI e Agenti',
    prompt: 'Come usa l’AI e gli agenti?',
    keywords: ['ai', 'intelligenza artificiale', 'agent', 'agenti', 'agentic', 'llm', 'gpt', 'claude', 'openai', 'anthropic', 'openrouter', 'n8n', 'automazione', 'automazioni', 'workflow', 'mcp', 'prompt'],
    tool: { name: 'agents.describe', args: { scope: 'marketing' }, pick: (p) => p.skills.find((s) => s.group.startsWith('AI')).items },
    blocks: [
      { type: 'text', text: 'Per Giacomo l’AI è uno strumento di lavoro, non uno slogan. Progetta **flussi agentici** che collegano i modelli linguistici ai dati reali: analytics, BigQuery, documenti.' },
      { type: 'list', items: [
        'Modelli di OpenAI e Anthropic, anche orchestrati via OpenRouter',
        'Workflow e automazioni con n8n, pure in self-hosting su Proxmox e Hetzner',
        'Connettori MCP tra LLM e strumenti aziendali',
        'Agenti che interrogano i dati e rispondono in linguaggio naturale',
        'Prompt e workflow pensati per il team che li userà',
      ] },
      { type: 'text', text: 'Anche questa pagina è un piccolo esempio: un’interfaccia da LLM costruita a mano, con un **dataLayer vero** sotto il cofano.' },
      { type: 'action', label: 'Ispeziona il dataLayer', extension: 'datalayer' },
    ],
    followups: ['analytics', 'stack', 'contact'],
  },
  {
    id: 'seo',
    label: 'SEO',
    prompt: 'Parlami della SEO',
    keywords: ['seo', 'google', 'posizionamento', 'ricerca', 'search', 'ranking', 'organico', 'geo', 'visibilita', 'serp'],
    tool: { name: 'services.get', args: { id: 'seo' }, pick: (p) => p.services.find((s) => s.id === 'seo') },
    blocks: [
      { type: 'text', text: 'Oggi la SEO ha due fronti: farsi **trovare su Google** e farsi **citare dalle AI**. Giacomo lavora su entrambi.' },
      { type: 'list', items: [
        'Audit tecnico e Core Web Vitals',
        'Strategia di keyword e architettura dei contenuti',
        'Dati strutturati schema.org',
        'Visibilità nelle risposte degli assistenti AI',
      ] },
      { type: 'action', label: 'Analizza questa pagina con l’estensione SEO', extension: 'seo' },
    ],
    followups: ['analytics', 'services', 'contact'],
  },
  {
    id: 'analytics',
    label: 'Dati e analytics',
    prompt: 'Come lavora con i dati?',
    keywords: ['dati', 'data', 'analytics', 'analisi', 'ga4', 'tag manager', 'gtm', 'datalayer', 'tracciamento', 'tracking', 'bigquery', 'sql', 'dashboard', 'looker', 'funnel', 'etl', 'misurazione', 'report', 'kpi'],
    tool: { name: 'services.get', args: { id: 'analytics' }, pick: (p) => p.services.find((s) => s.id === 'analytics') },
    blocks: [
      { type: 'text', text: 'Senza misurazione non c’è ottimizzazione. Giacomo progetta il **tracking plan**, struttura il **dataLayer**, configura GA4 e Tag Manager e porta i dati in **BigQuery** per analisi e dashboard.' },
      { type: 'list', items: [
        'Tracking plan e specifiche del dataLayer',
        'GA4, Google Tag Manager e Consent Mode',
        'Shopify Customer Events per il tracciamento e-commerce',
        'Pipeline ETL con Funnel.io e analisi in BigQuery e SQL',
        'Dashboard in Looker Studio leggibili dal business',
      ] },
      { type: 'action', label: 'Ispeziona il dataLayer di questa pagina', extension: 'datalayer' },
    ],
    followups: ['ai', 'seo', 'contact'],
  },
  {
    id: 'shopify',
    label: 'Shopify',
    prompt: 'Lavora con Shopify?',
    keywords: ['shopify', 'ecommerce', 'e commerce', 'liquid', 'negozio', 'shop', 'store', 'customer events', 'pixel', 'checkout'],
    tool: { name: 'stack.get', args: { group: 'E-commerce' }, pick: (p) => p.skills.find((s) => s.group === 'E-commerce').items },
    blocks: [
      { type: 'text', text: 'Sì, ed è uno dei suoi terreni preferiti. Giacomo è esperto di **Shopify**: lavora sui temi in **Liquid** e sul tracciamento con i **Customer Events**.' },
      { type: 'list', items: [
        'Temi e sezioni personalizzate in Liquid',
        'Customer Events e pixel custom per un tracciamento e-commerce affidabile',
        'Eventi ecommerce GA4 coerenti dal catalogo al checkout',
        'Analisi di funnel e conversioni, fino a BigQuery e Looker Studio',
      ] },
    ],
    followups: ['analytics', 'services', 'contact'],
  },
  {
    id: 'values',
    label: 'Valori',
    prompt: 'Quali sono i suoi valori?',
    keywords: ['valori', 'valore', 'approccio', 'metodo', 'come lavora', 'filosofia', 'principi'],
    tool: { name: 'values.list', args: {}, pick: (p) => p.values.map((v) => v.name) },
    blocks: [
      { type: 'text', text: 'Quattro principi guidano ogni collaborazione:' },
      { type: 'values' },
      { type: 'quote' },
    ],
    followups: ['services', 'clients', 'contact'],
  },
  {
    id: 'clients',
    label: 'Clienti',
    prompt: 'Con chi ha lavorato?',
    keywords: ['clienti', 'cliente', 'collaborato', 'collaborazioni', 'lavorato', 'portfolio', 'brand', 'progetti', 'referenze'],
    tool: { name: 'clients.list', args: {}, pick: (p) => p.clients.map((c) => c.name) },
    blocks: [
      { type: 'text', text: 'Alcune delle realtà con cui ha collaborato:' },
      { type: 'clients', size: 'lg' },
      { type: 'text', text: 'Le altre? Diciamo che non tutti amano comparire nei titoli di coda. Per conoscerle serve una call. ;)' },
    ],
    followups: ['services', 'values', 'contact'],
  },
  {
    id: 'contact',
    label: 'Contatti',
    prompt: 'Come posso contattarlo?',
    keywords: ['contatti', 'contatto', 'contattare', 'contattarlo', 'email', 'mail', 'telefono', 'chiama', 'chiamare', 'scrivi', 'preventivo', 'insieme', 'call', 'linkedin'],
    tool: { name: 'contact.card', args: {}, pick: (p) => ({ email: p.contact.email }) },
    blocks: [
      { type: 'text', text: 'Il modo più rapido è scrivergli. Risponde lui, non un modello.' },
      { type: 'contact' },
    ],
    followups: ['services', 'about'],
  },
];

/** Saluti: risposta breve senza tool call. */
export const greeting = {
  id: 'greeting',
  keywords: ['ciao', 'salve', 'buongiorno', 'buonasera', 'hey', 'hello', 'hi'],
  blocks: [
    { type: 'text', text: 'Ciao! Sono **capriol.**, il modello che conosce Giacomo meglio di chiunque altro, a parte Giacomo. Cosa vuoi sapere?' },
  ],
  followups: ['about', 'services', 'stack'],
};

/** Risposta quando nessun intento corrisponde. */
export const fallback = {
  id: 'fallback',
  blocks: [
    { type: 'text', text: 'Su questo non sono ancora stato addestrato. Posso raccontarti di Giacomo partendo da qui:' },
  ],
  followups: ['about', 'services', 'stack', 'ai', 'contact'],
};
