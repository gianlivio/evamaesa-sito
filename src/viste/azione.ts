"use server";

export type Esito = {
  stato: "vuoto" | "ok" | "errore";
  codice?: "mancano" | "email";
  campi?: Record<string, string>;
};

/*
 * DA COMPLETARE prima della messa online: invio email.
 * Per ora valida i dati e li scrive nel log del server.
 * Opzioni da decidere: Resend (chiave in RESEND_API_KEY), SMTP, Formspree.
 * I messaggi all'utente sono tradotti nel modulo, qui si restituisce solo un codice.
 */
export async function inviaRichiesta(_prec: Esito, dati: FormData): Promise<Esito> {
  const campi = Object.fromEntries(
    ["nome", "email", "telefono", "tipo", "opera", "data", "luogo", "messaggio", "lingua"].map((k) => [
      k,
      String(dati.get(k) ?? "").trim(),
    ]),
  );

  // campo esca per i bot: un umano lo lascia vuoto
  if (String(dati.get("sito") ?? "") !== "") return { stato: "ok" };

  if (!campi.nome || !campi.email || !campi.messaggio) return { stato: "errore", codice: "mancano", campi };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campi.email)) return { stato: "errore", codice: "email", campi };

  console.log("[contatti] nuova richiesta", campi);
  return { stato: "ok" };
}
