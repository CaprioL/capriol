/**
 * Configurazione del sito.
 * Tutto ciò che cambia da un deploy all'altro sta qui: nessun altro file
 * contiene URL, ID di tracciamento o interruttori di funzionalità.
 */
export const config = {
  /** URL mostrato nella barra degli indirizzi del browser finto. Solo estetica. */
  displayUrl: 'capriol.ai/chat',

  /** Nome del "modello" mostrato nel selettore in alto. */
  modelName: 'capriol. 10+',

  /**
   * Google Tag Manager. Lascia vuoto per non caricare nulla.
   * Se lo attivi, il sito parte con Consent Mode v2 su "denied":
   * aggiungi una CMP prima di andare in produzione (vedi README).
   */
  gtmId: '',

  /** Intro animata con il cursore. Viene saltata con prefers-reduced-motion e su touch. */
  demo: {
    enabled: true,
    /** Mostra l'intro una sola volta per sessione di navigazione. */
    oncePerSession: true,
    prompt: 'Chi è Giacomo?',
  },

  /** Velocità di "streaming" delle risposte, in millisecondi per parola. */
  streamDelay: [14, 34],
};
