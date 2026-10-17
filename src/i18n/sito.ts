/*
 * Indirizzo pubblico e interruttore dell'indicizzazione.
 * Finché il sito è in anteprima resta fuori dai motori di ricerca.
 * Alla messa online su evamaesa.it: impostare SITO_ONLINE=1 nelle variabili d'ambiente di Vercel
 * (Settings → Environment Variables, ambiente Production) e rifare il deploy.
 */
export const SITO_URL = (process.env.NEXT_PUBLIC_SITO_URL ?? "https://www.evamaesa.it").replace(/\/$/, "");
export const ONLINE = process.env.SITO_ONLINE === "1";
export const IMMAGINE_SOCIAL = "/og.jpg";
