# Handover: capriol. (sito portfolio di Giacomo Caprioli)

> **Per chi riprende il lavoro (persona o AI):** leggi questo file per intero prima di modificare qualsiasi cosa. Contiene il concept, l'architettura, le convenzioni e le decisioni già prese, con le loro motivazioni. Se una richiesta nuova contraddice una decisione qui registrata, segnalalo prima di procedere. A fine lavoro aggiorna questo file: sezioni toccate, [registro delle decisioni](#11-registro-delle-decisioni) e [cronologia](#14-cronologia).

Ultimo aggiornamento: novembre 2026, versione del portfolio **11.26**.

---

## 1. In una frase

Un sito statico su GitHub Pages: un **finto browser Safari su desktop macOS** che naviga su un'**interfaccia da LLM** addestrata su Giacomo. Le **estensioni del browser** (DataLayer, SEO, Tech Stack, Contatti) mostrano le sue competenze lavorando davvero sulla pagina stessa. Il repository è anche il **README del suo profilo GitHub** e funziona come materiale di recruiting.

## 2. Persona e contenuti

| Campo | Valore |
|---|---|
| Nome | Giacomo Caprioli |
| Brand | **capriol.** (con il punto), claim *Leaps beyond known* |
| Ruolo | Consulente di Digital Marketing, oltre 10 anni di esperienza |
| Competenze | Strategia, SEO, Digital Analytics (GA4, GTM, dataLayer, Consent Mode, server side tracking su Cloud Run e App Engine), CMP (Iubenda, Cookiebot, Consent Manager, OneTrust), Data & BI (BigQuery, SQL, Funnel.io, Looker Studio), Python e JavaScript, Shopify (solo codice delle pagine in Liquid e tracciamenti con Customer Events), AI e Agentic AI (OpenAI, Anthropic, OpenRouter, n8n, MCP), infrastruttura (Proxmox, Hetzner), Notion, Advertising, Design e comunicazione |
| Email | giacomo.caprioli@gmail.com |
| Telefono | (+39) 347 0348852 (formato scelto da Giacomo; `href` = `tel:+393470348852`) |
| LinkedIn | https://www.linkedin.com/in/giacomo-caprioli/ |
| GitHub | utente `CaprioL`, repository `capriol` |
| Motto | "Nessuna sfida è troppo grande da non poter essere affrontata." |
| Chiusura | "E ora fai la tua mossa ;)" |
| Versione del portfolio | **11.26** (formato MM.AA = novembre 2026), in `config.release` |

- **Servizi** (dal deck "Proposta progetto"):
  - Advisory → Consulting
  - Communications & Content → Comunicazione
  - Web Optimization → SEO
  - MarTech & Data → Digital Intelligence & Analytics
  - Digital Marketing → Online Advertising
- **Metodo** (sequenza reale, per questo numerato): Conosciamoci → Analisi account → Progetto di digital marketing.
- **Valori:** Relazione, Trasparenza, Proattività, Approcci su misura.
- **Clienti:**

  | Cliente | Sito |
  |---|---|
  | TEDxVerona | |
  | Croce Rossa Italiana | |
  | Fondazione Architetti Mantova (FAM) | fondazionearchitettimantova.it |
  | The Vice | the-vice.it |
  | Rampi | |
  | MIDJ | |
  | Radio Iusve | |
  | Portobello Vintage & Riuso | |
  | NimbleBit | |
  | LifeBites | |
  | *…e molti altri* | Voluto: alone di mistero (`clientsNote`, `clientsTeaser`) |

- **Fonti:** due deck di Giacomo ("[ProjectName] Project Proposal" in PPTX e "Fondazione Architetti Mantova – Project Proposal" in SVG). Loghi, foto, icone di servizi e valori sono stati estratti da lì.

**Competenze confermate da Giacomo** (novembre 2026): n8n, Proxmox, Hetzner, OpenRouter, OpenAI, Anthropic, Funnel.io (ETL), Looker Studio, BigQuery, SQL, Python, JavaScript, Shopify, Notion, CMP (Iubenda, Cookiebot, Consent Manager, OneTrust), Server Side Tracking (Cloud Run, App Engine).

> ⚠️ **Perimetro Shopify, da rispettare in ogni testo:** Giacomo si occupa **solo** del codice delle pagine in Liquid e dei tracciamenti (Liquid e Customer Events). **Non** sviluppa temi e **non** gestisce e-commerce o store. Non scrivere mai il contrario, in nessun testo: chat, README, llms.txt, JSON-LD.

**Contenuti da far verificare a Giacomo** (scritti o dedotti dall'AI, non confermati):
- Le frasi brevi sotto ogni valore e ogni servizio.
- I punti elenco degli intenti `shopify` e `ai`. Per Shopify il perimetro è stato corretto da Giacomo: vedi l'avviso sopra.
- Parte dello stack: GA4, GTM, Consent Mode, Google/Meta Ads.

## 3. Identità visiva

| Token | Valore | Uso |
|---|---|---|
| `--ink` | `#252528` | Colore brand: sfondo della pagina (dal deck) |
| `--gold` | `#DEC79B` | Accento brand: link, badge, CTA, focus |
| `--ink-2` / `--ink-3` / `--ink-4` | `#1e1e21` / `#2d2d31` / `#37373c` | Sidebar / card e toolbar / hover e bolle utente |
| `--desk` | `#18181a` | Sfondo del desktop macOS |
| Stati | `#8ccb9a` / `#e8b45f` / `#e8806f` | Ok / da rivedere / problema (SEO Inspector) |

- **Font:** tre ruoli, ognuno motivato.
  - **Montserrat** è la voce del brand (contenuti).
  - Il **font di sistema** è usato per la cornice del browser, così sembra un vero Safari.
  - **JetBrains Mono** compare solo dove il contenuto è codice o dati.
  - Montserrat e JetBrains Mono sono self-hosted in `assets/fonts/` (subset latino, woff2 variabili).
- **Tema:** solo scuro. È l'identità del brand: niente modalità chiara.
- **Tono del copy:**
  - Italiano, seconda persona verso il visitatore, terza persona quando la chat parla di Giacomo.
  - Sentence case.
  - Apostrofi tipografici (’).
  - Niente maiuscolo per le etichette, salvo il logotipo "LEAPS BEYOND KNOWN", che fa parte del marchio.
  - Ironia leggera da LLM: "capriol. potrebbe essere un po’ di parte…".
- **Nome del modello:** solo **"capriol."**. Il suffisso "10+" è stato rimosso su richiesta: non reintrodurlo.
- **Versione del modello (easter egg):** nel menu a tendina del selettore c'è il chip **11.26**, con la riga "Versione 11.26" e le "Novità della 11.26". È la revisione del portfolio in formato MM.AA.
  - Mostra **solo** "Versione 11.26", senza mese né data: Giacomo l'ha chiesto esplicitamente. Il significato resta un segreto, spiegato solo nelle note di rilascio.
  - Le note di rilascio **non** vanno aggiornate a ogni batch di modifiche: le decide Giacomo. Le modifiche della v4 (§14) sono state escluse su sua richiesta.
  - A una nuova revisione (nuovo MM.AA) aggiorna `config.release` (`version`, `notes`), la cronologia del §14 e il README, che cita 11.26.
- **Etichette in sidebar:** ogni parola principale va maiuscola: "Competenze e Stack", "AI e Agenti", "Dati e Analytics". Gli articoli e le congiunzioni restano minuscoli. È una scelta di Giacomo ed è un'eccezione voluta al sentence case. I prompt mostrati in chat ("Come usa l’AI e gli agenti?") restano frasi normali.

## 4. Hosting e URL

- Repository **`CaprioL/capriol`**. Il nome coincide con l'utente, quindi il `README.md` compare sul **profilo GitHub**. Per questo il README è scritto per il recruiting e non contiene istruzioni tecniche: quelle stanno qui.
- **GitHub Pages:** project site da *Settings → Pages → Deploy from a branch → `main` / `(root)`*. URL pubblico: **https://capriol.github.io/capriol/**.
- **Conseguenze del sottopercorso `/capriol/`:**
  - `index.html` usa solo percorsi relativi, quindi funziona ovunque.
  - `404.html` usa percorsi assoluti `/capriol/…`, perché viene servito su URL arbitrari.
  - Canonical, `og:url`, `og:image`, JSON-LD, `sitemap.xml`, `robots.txt` e `llms.txt` contengono `https://capriol.github.io/capriol/`.
  - ⚠️ `robots.txt` e `llms.txt` vengono letti dai crawler **solo alla radice del dominio**. Su un sottopercorso non vengono letti, e Giacomo ne è consapevole: per renderli efficaci servono un **dominio personalizzato** (file `CNAME` + DNS) oppure un repository `CaprioL.github.io`. Intanto la sitemap va inviata da Google Search Console.
  - Per il visitatore medio i tre file sono consultabili **dentro il browser finto**: menu **Aiuto** della barra macOS su desktop, voci in fondo alla sidebar su mobile (vedi §7).
- **Web app installabile** (dettagli al §7 bis): `site.webmanifest`, `sw.js` e i meta Apple in `index.html`. Il service worker vive in `/capriol/sw.js`, quindi il suo scope è `/capriol/`. Con un dominio personalizzato funziona senza modifiche, perché tutti i percorsi sono relativi.
- **Se si passa a un dominio personalizzato,** sostituisci `https://capriol.github.io/capriol/` ovunque e riporta i percorsi di `404.html` a `/assets/…`. In `404.html` va tolto anche il `.replace(/^\/capriol/, '')` nello script.

## 5. Struttura dei file

```
index.html            Unica pagina. Contiene: GTM + Consent Mode (in testa), meta SEO/OG,
                      JSON-LD, markup statico della cornice e del benvenuto, <noscript>.
404.html              Errore in stile Safari (percorsi /capriol/…).
robots.txt            ASCII art "capriol" in testa + regole (crawler AI consentiti).
sitemap.xml, llms.txt, .nojekyll, .editorconfig, .gitignore, LICENSE
site.webmanifest      Manifest PWA: icone any + maskable, scorciatoie (?ask=), screenshot
sw.js                 Service worker "network first" (offline + installabilità)
README.md             Profilo GitHub / recruiting (NON istruzioni tecniche).
docs/                 Screenshot del README (home, datalayer, seo, clients, robots) + questo handover.

assets/css/           Caricati in quest'ordine da index.html:
  tokens.css          Variabili e @font-face
  base.css            Reset, pulsanti, chip, toast, accessibilità, reduced motion
  desktop.css         Sfondo macOS, barra dei menu
  browser.css         Finestra Safari, toolbar, estensioni, cursore dell'intro
  chat.css            Interfaccia LLM (sidebar, thread, composer, model menu)
  blocks.css          Card nelle risposte (profilo, servizi 3+2, steps, clienti…)
  extensions.css      Popover estensioni, inspector, SEO, stack, consenso

assets/js/
  main.js             Entry point: eventi iniziali, init moduli, intro, consenso
  config.js           URL mostrato, nome modello, parametri GA4, intro, velocità streaming
  data/profile.js     ✏️ UNICA fonte dei contenuti su Giacomo
  data/intents.js     ✏️ Intenti della chat (keyword, prompt, tool, blocchi, follow-up)
  modules/
    analytics.js      Tassonomia eventi: track() custom + gemello GA4, liste item
    datalayer.js      Intercetta window.dataLayer.push e notifica i sottoscrittori
    consent.js        Richiesta di consenso stile Safari + gtag('consent','update')
    chat.js           Matching intenti, streaming, tool call, azioni messaggio
    blocks.js         Renderer dei blocchi ricchi + card contatti
    chrome.js         Orologio, zoom, sidebar, share, model menu e versione, barra indirizzi
    docview.js        Vista dei file di testo (robots.txt, llms.txt, sitemap.xml) nel browser
    macmenu.js        Menu "Aiuto" della barra macOS (pattern ARIA menu button)
    pwa.js            Registrazione del service worker, installazione, display mode
    cursor-demo.js    Intro animata col cursore
    metrics.js        LCP/CLS/FCP/TTFB via PerformanceObserver
    icons.js          Set di icone SVG inline
    dom.js            Helper (h(), sleep, normalize, toast, copyText…)
    extensions/
      index.js        Controller del popover (apertura, posizione, focus, Esc, badge)
      datalayer.js    DataLayer Inspector (badge GA4/Custom/GTM, filtro, link docs)
      seo.js          SEO Inspector (analisi reale del DOM + Web Vitals)
      stack.js        Tech Stack (da profile.skills + tecnologie della pagina)
      contact.js      "Fai la tua mossa" (contatti)
      manager.js      Menu "Estensioni" (icona puzzle)
      json-tree.js    Albero JSON con <details>

assets/img/brand/     monogram.png, logo-capriol.png, giacomo-caprioli.(webp|jpg) (foto 400×400, aggiornata nella v4)
assets/img/clients/   Loghi in WebP, altezza ~120 px, grigio chiaro su trasparente
assets/img/icons/     Icone di servizi e valori dal deck (PNG bianche, 128 px)
assets/img/pwa/       maskable-192/512, shortcut-*.png (96 px), screenshot-wide/narrow.webp,
                      splash/ (12 splash screen iOS: iPhone e iPad, verticale)
assets/img/og-image.png  1200×630
assets/favicon/       ico, 32, 180 (apple), 192, 512
assets/fonts/         woff2 subset + README licenze
```

**Nessun build step.** I file sono serviti così come sono.

**Nota sulle icone.** Le icone nell'HTML statico (`index.html`) sono SVG già incollati nel markup, generati una tantum da `icons.js`. Per aggiungerne una nell'HTML, copia il markup prodotto da `icon(name, size)` in `icons.js`. Nei moduli JS usa direttamente `icon()`.

## 6. Come si modificano i contenuti

- **Testi, clienti, servizi, valori, competenze, contatti:** `assets/js/data/profile.js`.
  - **Nuovo cliente:** aggiungi il logo WebP in `assets/img/clients/` e una riga `{ name, logo, url? }`. Con `url` il logo diventa un link esterno tracciato (`client_click` → `select_content`).
  - **Mistero sui clienti:** `clientsNote` ("E molti altri.") chiude ogni elenco, sia nella striscia piccola sia nella griglia grande. `clientsTeaser` è la riga sotto, nella griglia. L'intento `clients` aggiunge una frase che invita alla call. Mantieni questo tono anche quando aggiungi clienti.
  - **Telefono ed email** compaiono anche in `index.html`: nel JSON-LD (`telephone`, `email`) e nel `<noscript>`. Vanno in `llms.txt` e nel README. Aggiorna tutti i punti.
- **Domande e risposte della chat:** `assets/js/data/intents.js`.
  - **Matching:** testo normalizzato (minuscolo, senza accenti). Il punteggio è la somma delle lunghezze delle keyword trovate. Keyword di 3 caratteri o meno = parola intera; più lunghe = prefisso di parola.
  - **Saluti:** hanno peso dimezzato.
  - **Nessun match:** se compaiono "giacomo", "caprioli" o "lui" risponde `about`, altrimenti con il `fallback`.
  - **Blocchi:** `text` (supporta `**grassetto**`), `profile`, `services`, `process`, `skills`, `values`, `quote`, `clients` (`size: sm|lg`, `caption`), `list`, `contact`, `action` (apre un'estensione).
  - **Nuovo intento:** compare in automatico nella sidebar. Se deve generare un `view_item_list`, aggiungilo a `intentLists` in `analytics.js`.
- **Competenze con sotto-voci:** in `profile.skills` una voce può essere una stringa oppure `{ name, items }`. Per esempio `{ name: 'Server Side Tracking', items: ['Cloud Run', 'App Engine'] }` diventa una chip contenitore con chip figlie, nella chat e nell'estensione Tech Stack. Per conteggi, item GA4 e liste piatte usa sempre `skillNames(items)` da `profile.js`.
- **Configurazione:** `assets/js/config.js` contiene `displayUrl`, `modelName`, `release` (versione e note di rilascio), `ga4.currency`, `ga4.leadValue`, `demo.*` e `streamDelay`.
- **File del menu Aiuto:** elenco in `DOCS` dentro `modules/docview.js` (percorso, titolo, descrizione). Aggiungi lì un nuovo file di testo. Su mobile aggiungi anche il pulsante `data-open-doc` nella sidebar di `index.html`.

## 7. Comportamenti dell'interfaccia

- **Intro:** si avvia solo con queste condizioni.
  - `config.demo.enabled` attivo, nessun `prefers-reduced-motion` e nessun dispositivo touch.
  - Una volta per sessione (`sessionStorage` `capriol:intro-seen`).
  - Sequenza: il cursore scrive `config.demo.prompt` → invia → risposta `about` → clic su DataLayer → apre `profile_loaded`.
  - Qualsiasi `pointerdown` o `keydown` reale interrompe l'intro e completa subito la risposta. "Rivedi l’intro" nella sidebar la rilancia.
- **Consenso:**
  - La richiesta compare dopo l'intro e **solo quando nessuna estensione è aperta**, per non coprire la dimostrazione.
  - La scelta è salvata in `localStorage` `capriol:consent` (`granted|denied`) e si riapre da "Preferenze cookie" nella sidebar.
  - Su desktop scende dal bordo sinistro della barra degli indirizzi, su mobile è un bottom sheet.
- **Estensioni:**
  - Un solo popover alla volta, che si chiude con `Esc`, clic esterno o ✕. Su schermi ≤ 720 px diventa un bottom sheet.
  - Il badge su `{ }` conta i push nel dataLayer.
- **Chat:**
  - Lo streaming segue il fondo finché l'utente non scorre verso l'alto.
  - Il pulsante di invio diventa "stop", che completa subito la risposta.
  - Azioni sotto ogni risposta: copia, 👍/👎 (evento `chat_feedback`), rigenera.
- **Finestra:**
  - Il semaforo verde ingrandisce la finestra; rosso e giallo sono decorativi e non interattivi.
  - "Indietro": se è aperto un file torna alla chat, altrimenti apre una nuova chat.
- **Menu Aiuto e vista file:**
  - Nella barra dei menu macOS solo **Aiuto** è interattivo; le altre voci sono decorative (`aria-hidden`).
  - Contenuto del menu: robots.txt, llms.txt, sitemap.xml, poi "Rivedi l’intro" e "Preferenze cookie".
  - Tastiera: frecce, Home/End, Esc e Tab.
  - Un file aperto sostituisce la chat nel viewport (`.doc-view`) e l'URL diventa `capriol.ai/<file>`. Il contenuto è caricato con `fetch` relativo. Ci sono le azioni "Apri il file originale", "Copia" e "Torna alla chat".
  - `Esc` chiude un livello alla volta (menu → popover → file), coordinato con `preventDefault`.
  - Su mobile la barra dei menu non c'è: robots.txt e llms.txt compaiono in fondo alla sidebar (`.sidebar__docs`, visibile solo ≤ 720 px).
- **Link diretti a un argomento:** `?ask=<id intento>` (per esempio `./?ask=services`) apre la chat già su quell'argomento e salta l'intro. Lo usano le scorciatoie dell'app installata, e si può usare nei link condivisi. Il `prompt_source` è `shortcut`.
- **Easter egg:**
  - La versione del modello è nel selettore in cima alla chat (§3).
  - In console compare un messaggio firmato capriol. con la versione e l'email.
  - Il robots.txt ha l'ASCII art.
- **Responsive:**
  - ≤ 900 px: la sidebar diventa off-canvas.
  - ≤ 720 px: niente barra dei menu, finestra a tutto schermo, semafori e navigazione nascosti.

## 7 bis. Web app installabile (PWA)

- **Android / Chrome / Edge:**
  - `site.webmanifest` con `id`, `start_url` e `scope` relativi (`./`), `display: standalone` e colori `#252528`.
  - Icone `any` (192, 512, in `assets/favicon/`) e `maskable` (192, 512, glifo dentro la zona sicura all'80 %).
  - Tre **scorciatoie** (pressione prolungata sull'icona): Chi è Giacomo, Servizi, Fai la tua mossa, che puntano a `?ask=`.
  - Due **screenshot** (`wide` e `narrow`) per la finestra di installazione arricchita.
- **iOS / iPadOS:** `apple-touch-icon` (180 px), meta `apple-mobile-web-app-capable`, `-title` ("capriol.") e `-status-bar-style` (`black-translucent`), più 12 `apple-touch-startup-image` con media query per dispositivo (iPhone da SE a 16 Pro Max, iPad Air e Pro 12,9″, verticale).
- **Service worker (`sw.js`):**
  - Strategia **network first** su tutte le richieste GET dello stesso dominio: online è sempre aggiornato, offline usa l'ultima copia. Nessun rischio di contenuti vecchi dopo un deploy.
  - Precache minimo per il primo avvio offline. Le richieste di terze parti (GTM) non passano dalla cache.
  - Il nome della cache è `capriol-v1`. Cambialo solo se modifichi la logica del service worker: i contenuti si aggiornano da soli.
- **Installazione guidata:** voce "Installa come app" nel menu Aiuto (desktop) e "Installa l’app" in fondo alla sidebar (mobile).
  - Dove esiste usa il prompt nativo (`beforeinstallprompt`, salvato senza `preventDefault`, così il browser può mostrare anche il suo invito).
  - Su iOS mostra le istruzioni: Condividi → Aggiungi alla schermata Home.
- **In modalità app:** `html[data-display-mode="standalone"]` e il parametro `display_mode` su `page_view`. Su iPad la safe area superiore è gestita con una media query `display-mode: standalone`. La cornice da browser resta anche nell'app installata: fa parte del concept.
- **Verifica:** in Chrome DevTools → Application → Manifest, oppure via CDP `Page.getInstallabilityErrors`, che deve restituire una lista vuota (verificato nella v4). Le splash e le icone sono state generate con Playwright da HTML con Montserrat. Per rigenerarle, ricrea uno script simile: non è nel repository.

## 8. Analytics

### Installazione
- **GTM:** container **`GTM-T5VM84TV`**, in `<head>` di `index.html`, prima di ogni altro script, più `<noscript>` iframe dopo `<body>`. Lo snippet fornito da Giacomo (`gtag('js', new Date())`) è incluso così com'è.
  - È stato aggiunto il push standard `{ 'gtm.start', event: 'gtm.js' }`, necessario perché i trigger "All Pages / Container Loaded" funzionino come con lo snippet ufficiale.
- **Consent Mode v2 (default, prima di GTM):**
  - `ad_storage`, `ad_user_data`, `ad_personalization` sono **sempre `denied`**: il sito non fa pubblicità.
  - `analytics_storage` vale `granted` solo se il visitatore ha già accettato in una visita precedente, altrimenti `denied`.
  - All'accettazione: `gtag('consent','update',{analytics_storage})` + evento `consent_update`.

### Tassonomia
Tutto passa da `analytics.js`. La regola: **evento custom** (descrive l'interfaccia) + **gemello GA4** inviato subito dopo, quando esiste un evento automatico o consigliato. Il custom contiene `ga4_event` come rimando. Prima di ogni push con `ecommerce` c'è `{ ecommerce: null }`.

| Custom | GA4 | Parametri GA4 | Note |
|---|---|---|---|
| — | `page_view` | `page_title`, `page_location`, `page_path`, `page_referrer`*, `language`, `screen_resolution`, `content_group: Portfolio`, `display_mode` (browser, standalone) | *solo se presente; `display_mode` è custom |
| `profile_loaded` | — | — | Profilo completo, solo custom |
| `chat_prompt` | `search` | `search_term` | Domanda scritta (`prompt_source: typed`) |
| `chat_prompt` | `select_content` | `content_type: chat_suggestion`, `content_id: <intent>` | Sidebar, suggerimenti, follow-up, rigenera, estensione, intro |
| `chat_response` | `view_item_list` | `item_list_id`, `item_list_name`, `items[]` | Per gli intenti `services`, `about`/`clients` (clienti), `stack` (competenze) |
| `chat_feedback` | — | — | `feedback: positive/negative` |
| `chat_reset` | — | — | |
| `extension_open` | `select_content` | `content_type: browser_extension`, `content_id` | |
| `client_click` | `select_content` | `content_type: client`, `content_id` | Custom con `link_url`, `link_domain`, `outbound` |
| `contact_click` | `generate_lead` | `lead_source`, `currency`, `value` | `lead_source`: email, email_cta, phone, linkedin, copy_email |
| `share_click` | `share` | `method`, `content_type: page`, `item_id` | |
| `file_view` | `select_content` | `content_type: file`, `content_id: <file>` | Custom con `file_name`, `file_extension`, `open_source` |
| `intro_start` / `intro_complete` | `tutorial_begin` / `tutorial_complete` | — | |
| `intro_skipped`, `window_zoom`, `consent_update`, `menu_open` (`menu_name`) | — | — | Solo custom |
| `model_info_open`, `release_notes_open` | — | — | Solo custom, con `model_version` |
| `app_install_prompt` (`outcome`: accepted, dismissed, ios_instructions, browser_instructions), `app_installed` | — | — | Solo custom |

**Item:** campi `item_id`, `item_name`, `item_brand: capriol.`, `item_category` (Servizio / Cliente / Competenza), `item_category2` (area o gruppo), `item_list_id`, `item_list_name`, `index`.

### Configurazione GTM consigliata (da fare nel container, non nel codice)
1. **Google tag** (ID GA4) su *Initialization – All Pages*. Raccoglie il `page_view` automatico.
2. **Tag "GA4 Event":**
   - Nome evento `{{Event}}`.
   - Trigger *Custom Event* con regex `^(search|select_content|view_item_list|generate_lead|share|tutorial_begin|tutorial_complete)$`. Escludi `page_view` per evitare duplicati con il Google tag.
   - Attiva *Send Ecommerce data → Data Layer* per `view_item_list`.
   - Parametri mappati con variabili *Data Layer* (`search_term`, `content_type`, `content_id`, `lead_source`, `method`, `item_id`, `currency`, `value`).
3. **`generate_lead`:** segnalo come **evento chiave** in GA4.
4. **Eventi custom:** se servono in GA4, uno o più tag dedicati. Di norma bastano per il debug e per la dimostrazione nell'Inspector.

### DataLayer Inspector
- Mostra tutto `window.dataLayer`, compresi i push di GTM e gtag, con badge **GA4** / **Custom** / **GTM**.
- Ha un filtro segmentato e, per ogni evento GA4 o custom con gemello, un link alla **documentazione Google**. Gli URL sono in `GA4_EVENTS` in `analytics.js`.

## 9. SEO e AI visibility

- **Title:** "Giacomo Caprioli | Consulente Digital Marketing, SEO, Data e AI" (63 caratteri).
- **Description:** 152 caratteri, da tenere sotto 160. Il SEO Inspector la segnala se sfora.
- **H1:** unico, "Giacomo Caprioli", nel benvenuto statico. Quando parte la chat il benvenuto viene nascosto con `hidden`, non rimosso, così l'H1 resta nel DOM.
- **JSON-LD:** `ProfilePage` → `mainEntity` `Person`, con `knowsAbout`, `makesOffer` (i 5 servizi), `sameAs` (LinkedIn), `brand`.
- **Open Graph:** tipo `profile`, immagine 1200×630.
- **Crawler AI:** `robots.txt` consente GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot e Google-Extended. Vedi la nota del §4 sui sottopercorsi.
- **`<noscript>`:** contiene il riassunto completo per chi non esegue JavaScript.

## 10. Standard di qualità (da mantenere)

- **Accessibilità:**
  - Tutto è usabile da tastiera, con focus visibile in oro e skip link.
  - Le estensioni hanno `aria-expanded`; i popover sono `role="dialog"`.
  - Il thread è `role="log"` con `aria-busy` durante lo streaming.
  - Icone decorative con `aria-hidden`; testo alternativo su ogni immagine con contenuto.
- **Movimento:**
  - Con `prefers-reduced-motion`: niente intro, risposte istantanee, animazioni ridotte.
  - Un solo momento orchestrato, l'intro; le altre animazioni rispondono solo ad azioni dell'utente.
- **Performance:**
  - Nessuna dipendenza, nessuna richiesta a terzi tranne GTM. Immagini in WebP, font subset.
  - Peso totale circa 600 KB, screenshot di `docs/` esclusi.
- **Codice:**
  - Vanilla JS con ES modules e selettori CSS a una classe. Commenti in italiano.
  - Niente `localStorage` per i contenuti, solo per il consenso. `sessionStorage` solo per l'intro.

## 11. Registro delle decisioni

| # | Decisione | Motivo |
|---|---|---|
| 1 | Nessun framework né build step | GitHub Pages senza CI; codice leggibile in una repo pubblica che fa da portfolio |
| 2 | Chat deterministica (intenti + keyword), senza API LLM | Hosting statico, zero costi e chiavi, risposte controllate sul brand |
| 3 | Contenuti centralizzati in `profile.js` | Una sola fonte per chat, estensioni, dataLayer |
| 4 | Le estensioni lavorano sulla pagina reale (dataLayer vero, analisi SEO vera, Web Vitals veri) | Dimostrare le competenze invece di descriverle |
| 5 | Font self-hosted, niente Google Fonts | GDPR (trasferimento IP) e performance |
| 6 | Tre famiglie tipografiche con ruoli distinti | Cornice browser credibile, voce brand, dati leggibili |
| 7 | Solo tema scuro | Identità del brand dal deck |
| 8 | Welcome allineato a sinistra | Richiama le slide del deck (titoli a sinistra) |
| 9 | Unica sequenza numerata = metodo in 3 fasi | La numerazione si usa solo per sequenze reali |
| 10 | Nome modello "capriol." senza "10+" | Richiesta esplicita di Giacomo |
| 11 | Ogni evento custom + gemello GA4 con parametri standard e `ga4_event` di rimando | Richiesta di Giacomo; GTM semplice (un tag, una regex); leggibile per chi fa analytics |
| 12 | `{ ecommerce: null }` prima di ogni `view_item_list` | Best practice Google per evitare il merge di oggetti ecommerce |
| 13 | Prompt in chat = `search`; suggerimento cliccato = `select_content` | Distingue l'intento libero dalla navigazione guidata |
| 14 | `generate_lead` con `currency` e `value` da config (`value` 0) | Parametri standard completi; il valore economico lo decide Giacomo |
| 15 | Snippet GTM fornito da Giacomo incluso tal quale, più il push `gtm.start` | Senza `gtm.js` i trigger "All Pages / Container Loaded" non scattano come previsto |
| 16 | Consent Mode v2 con default `denied` e richiesta in stile Safari | Obbligo GDPR/Garante per GA4 in Italia; coerente col concept del browser |
| 17 | Richiesta di consenso dopo l'intro e con estensioni chiuse | Non coprire la dimostrazione del DataLayer |
| 18 | Repo `capriol` (= utente) e Pages su `/capriol/` | Scelta di Giacomo: il README diventa il profilo GitHub |
| 19 | README orientato al recruiting, istruzioni tecniche solo qui | Richiesta di Giacomo |
| 20 | `robots.txt` con ASCII art "capriol" (font figlet *big*) | Richiesta di Giacomo; easter egg per chi lavora nel settore |
| 21 | Il logo cliente diventa un link solo se c'è `url` | Si linkano solo i siti forniti da Giacomo (FAM, The Vice) |
| 22 | Griglia servizi 3+2 con container query | Evita la cella vuota con 5 elementi |
| 23 | robots.txt, llms.txt e sitemap consultabili dal menu **Aiuto** della barra macOS, aperti dentro il browser finto | Richiesta di Giacomo: renderli leggibili anche al visitatore medio, sfruttando la metafora del browser |
| 24 | Solo "Aiuto" è interattivo nella barra dei menu | Le altre voci senza funzione sarebbero controlli finti; Aiuto è il posto dove un utente Mac cerca informazioni |
| 25 | Su mobile, robots.txt e llms.txt in fondo alla sidebar | La barra dei menu è nascosta sotto i 720 px |
| 26 | Lettura di un file = `file_view` + `select_content` (`content_type: file`) | GA4 non ha un evento per "leggere un file"; `file_download` non è corretto perché non si scarica nulla |
| 27 | Versione del modello = revisione del portfolio (MM.AA), con note di rilascio | Easter egg chiesto da Giacomo, coerente con il linguaggio dei modelli AI |
| 28 | "E molti altri" in coda a ogni elenco clienti, griglia grande con riga dedicata a tutta larghezza | Alone di mistero voluto; la riga a tutta larghezza evita celle vuote con qualsiasi numero di loghi |
| 29 | Nuovo intento `shopify` | Shopify è un'area di competenza esplicita di Giacomo, merita una risposta dedicata |
| 30 | Competenze riorganizzate in 9 gruppi (Data & BI, Programmazione, E-commerce, Infrastruttura & Tool…) | Ospitare i nuovi strumenti senza gruppi sovraffollati |
| 31 | Gruppo "E-commerce" rinominato "Shopify" e testi riscritti: solo codice delle pagine e tracciamenti | Correzione di Giacomo: non sviluppa temi né gestisce store |
| 32 | Nuovo gruppo CMP; Server Side Tracking come voce con sotto-voci (Cloud Run, App Engine) | Richiesta di Giacomo; struttura `{ name, items }` generica e riusabile |
| 33 | Nel menu del modello solo "Versione 11.26" | Richiesta di Giacomo |
| 34 | Le modifiche della v4 non entrano nelle note di rilascio | Richiesta di Giacomo: le note di rilascio le decide lui |
| 35 | Etichette della sidebar con le parole principali maiuscole ("Dati e Analytics") | Richiesta di Giacomo |
| 36 | PWA completa (manifest, maskable, scorciatoie, screenshot, splash iOS, service worker network first) | Richiesta di Giacomo: salvataggio come web app su iOS e Android, senza rischio di cache vecchie |
| 37 | Parametro `?ask=` per aprire un argomento | Serve alle scorciatoie dell'app e permette link condivisibili; il canonical evita contenuti duplicati |
| 38 | Installazione con prompt nativo se disponibile, istruzioni su iOS | iOS non espone un'API di installazione |

## 12. Come testare in locale

```bash
# Emula il sottopercorso di GitHub Pages
mkdir -p /tmp/srv && ln -s "$(pwd)" /tmp/srv/capriol
cd /tmp/srv && python3 -m http.server 8000
# apri http://localhost:8000/capriol/ (e /capriol/404.html)
```

Checklist dopo ogni modifica:
- [ ] Console senza errori (in locale `gtm.js` può fallire se la rete lo blocca: è previsto).
- [ ] Intro completa: risposta `about` → DataLayer aperto su `profile_loaded` → alla chiusura compare il consenso.
- [ ] Sequenza nel dataLayer: `chat_prompt` → `select_content`/`search`; `chat_response` → `ecommerce: null` → `view_item_list`.
- [ ] Inspector: filtri GA4/Custom/GTM e link alla documentazione funzionanti.
- [ ] SEO Inspector: title tra 30 e 65 caratteri, description tra 70 e 160, un solo H1, JSON-LD rilevato.
- [ ] Mobile a 390 px: sidebar off-canvas, estensioni e consenso come bottom sheet, composer visibile.
- [ ] Con `prefers-reduced-motion` niente intro e risposte istantanee.
- [ ] Il thread scorre dentro la finestra: il composer non deve mai uscire dallo schermo. È già successo: la griglia `.app` richiede `grid-template-rows: minmax(0, 1fr)` e `min-height: 0` su `.chat`.
- [ ] Menu Aiuto: si apre con clic e con ↓ da tastiera. Ogni file si apre con l'URL aggiornato; "Indietro" e `Esc` tornano alla chat.
- [ ] Mobile: in fondo alla sidebar ci sono robots.txt e llms.txt, e il testo va a capo senza scroll orizzontale.
- [ ] Selettore del modello: chip 11.26, riga "Versione 11.26" (senza data), note di rilascio invariate.
- [ ] PWA: `Page.getInstallabilityErrors` vuoto, service worker attivo, cache `capriol-v1` popolata. `?ask=services` apre i servizi senza intro.
- [ ] Sidebar: etichette con le parole principali maiuscole.
- [ ] Testi Shopify coerenti col perimetro (solo Liquid e tracciamenti).

Gli screenshot in `docs/` sono stati fatti con Playwright a 1440×900. Rigenerali se l'interfaccia cambia in modo visibile.

## 13. Limiti noti e possibili sviluppi

- `robots.txt` e `llms.txt` non sono efficaci finché il sito vive su `/capriol/` (vedi §4).
- Il container GTM va configurato secondo il §8: il codice si limita a fornire un dataLayer pulito.
- Il testo della richiesta di consenso è minimale. Se servono, aggiungi un link a una privacy policy e i tempi di conservazione.
- `leadValue` è 0: valorizzalo se Giacomo vuole attribuire un valore ai contatti.
- **Idee non ancora realizzate:**
  - Versione inglese (toggle lingua).
  - Case study per cliente come nuovi intenti.
  - Pagina privacy.
  - Dominio personalizzato.
  - Un intento "Disponibilità" con le tipologie di collaborazione.
  - Altre voci della barra macOS rese funzionanti (per esempio "capriol. → Informazioni su capriol." con la versione).
  - Case study Shopify con eventi ecommerce GA4 completi (`view_item`, `add_to_cart`, `purchase`) come demo nell'Inspector.

## 14. Cronologia

- **v1:** concept, cornice macOS/Safari, chat LLM con 9 intenti, 4 estensioni + gestore, intro col cursore, SEO tecnica, asset dal deck, README tecnico.
- **v2:**
  - Tassonomia GA4 completa con gemelli e link alla documentazione; filtro e badge nell'Inspector.
  - GTM `GTM-T5VM84TV` con Consent Mode v2 e richiesta di consenso.
  - Nome modello "capriol." senza "10+"; telefono reale.
  - Nuovi clienti: FAM, The Vice (con link), Portobello Vintage & Riuso. Radio Iusve nominato.
  - URL su `/capriol/`; ASCII art in `robots.txt`; README riscritto per il recruiting; questo handover.
- **v3 (versione del portfolio 11.26):**
  - Menu **Aiuto** nella barra macOS per aprire robots.txt, llms.txt e sitemap.xml dentro il browser; voci equivalenti su mobile.
  - Easter egg: versione del modello 11.26 con note di rilascio nel selettore; messaggio in console.
  - Etichette "Competenze e Stack" e "AI e Agenti".
  - Nuove competenze (n8n, Proxmox, Hetzner, OpenRouter, OpenAI, Anthropic, Funnel.io, Looker Studio, Python, Shopify, Liquid, Customer Events, Notion) distribuite tra stack, intenti `ai`, `analytics`, `stack`, il nuovo intento `shopify`, `llms.txt` e JSON-LD.
  - "E molti altri" sui clienti; nuovi eventi `file_view`, `menu_open`, `release_notes_open`.
  - README e handover aggiornati.
- **v4** (stessa versione del portfolio 11.26; **non** riportata nelle note di rilascio, su richiesta di Giacomo):
  - Nuova foto profilo.
  - Nel menu del modello solo "Versione 11.26".
  - Perimetro Shopify corretto: solo codice delle pagine in Liquid e tracciamenti.
  - Competenze: gruppo CMP (Iubenda, Cookiebot, Consent Manager, OneTrust); Server Side Tracking con Cloud Run e App Engine in Digital Analytics.
  - Etichette della sidebar con le parole principali maiuscole.
  - Web app installabile su iOS e Android: manifest, icone, scorciatoie, splash, service worker, voce "Installa come app", eventi `app_install_prompt` e `app_installed`, `display_mode`.
  - README e handover aggiornati.
