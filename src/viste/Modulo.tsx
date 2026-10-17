"use client";

import { useActionState } from "react";
import { inviaRichiesta, type Esito } from "./azione";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

const TIPI = ["evento", "programmazione", "altro"] as const;

export function Modulo({ lingua, tipoIniziale, opera }: { lingua: Lingua; tipoIniziale?: string; opera?: string }) {
  const [esito, azione, inCorso] = useActionState<Esito, FormData>(inviaRichiesta, { stato: "vuoto" });
  const t = dizionario(lingua).modulo;

  if (esito.stato === "ok") {
    return (
      <div className="esito" role="status">
        <p>{t.ok}</p>
      </div>
    );
  }

  const v = esito.campi ?? {};
  const tipo = v.tipo || ((TIPI as readonly string[]).includes(tipoIniziale ?? "") ? tipoIniziale : "evento");
  const errore = esito.stato === "errore" ? (esito.codice === "email" ? t.emailErrata : t.mancano) : null;

  return (
    <form action={azione} className="modulo" noValidate>
      {errore ? (
        <div className="esito" role="alert" style={{ borderLeftColor: "var(--naso)" }}>
          {errore}
        </div>
      ) : null}

      <fieldset className="campo">
        <legend>{t.tipo}</legend>
        <div className="scelte">
          {TIPI.map((valore) => (
            <label key={valore}>
              <input type="radio" name="tipo" value={valore} defaultChecked={valore === tipo} />
              {t.tipi[valore]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="riga">
        <div className="campo">
          <label htmlFor="nome">{t.nome}</label>
          <input id="nome" name="nome" autoComplete="name" required defaultValue={v.nome} />
        </div>
        <div className="campo">
          <label htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} />
        </div>
      </div>

      <div className="riga">
        <div className="campo">
          <label htmlFor="telefono">
            {t.telefono} <span className="aiuto">{t.facoltativo}</span>
          </label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" defaultValue={v.telefono} />
        </div>
        <div className="campo">
          <label htmlFor="data">
            {t.data} <span className="aiuto">{t.seFissata}</span>
          </label>
          <input id="data" name="data" type="date" defaultValue={v.data} />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="luogo">
          {t.luogo} <span className="aiuto">{t.cittaLocation}</span>
        </label>
        <input id="luogo" name="luogo" defaultValue={v.luogo} />
      </div>

      <div className="campo">
        <label htmlFor="messaggio">{t.messaggio}</label>
        <textarea id="messaggio" name="messaggio" required defaultValue={v.messaggio} placeholder={t.segnaposto} />
      </div>

      <input type="hidden" name="opera" value={opera ?? v.opera ?? ""} />
      <input type="hidden" name="lingua" value={lingua} />
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="sito">{t.esca}</label>
        <input id="sito" name="sito" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button type="submit" className="bottone" disabled={inCorso}>
          {inCorso ? t.invio : t.invia}
        </button>
      </div>
    </form>
  );
}
