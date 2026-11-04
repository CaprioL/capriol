/**
 * Configurazione del sito.
 * Tutto ciò che cambia da un deploy all'altro sta qui: nessun altro file
 * contiene URL, ID di tracciamento o interruttori di funzionalità.
 */
export const config = {
  /** URL mostrato nella barra degli indirizzi del browser finto. Solo estetica. */
  displayUrl: 'capriol.ai/chat',

  /** Nome del "modello" mostrato nel selettore in alto. */
  modelName: 'capriol.',

  /**
   * Google Tag Manager è installato direttamente in index.html (GTM-T5VM84TV),
   * così parte prima di qualsiasi modulo. Qui restano solo i parametri GA4.
   */
  ga4: {
    /** Valuta e valore attribuiti a ogni generate_lead (contatto). 0 = non valorizzato. */
    currency: 'EUR',
    leadValue: 0,
  },

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
