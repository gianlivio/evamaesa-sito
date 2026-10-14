"use client";

import { useActionState } from "react";
import { inviaRichiesta, type Esito } from "./azione";

const tipi = [
  { valore: "evento", label: "Festa o evento privato" },
  { valore: "programmazione", label: "Festival, teatro, rassegna" },
  { valore: "altro", label: "Altro" },
];

export function Modulo({ tipoIniziale, opera }: { tipoIniziale?: string; opera?: string }) {
  const [esito, azione, inCorso] = useActionState<Esito, FormData>(inviaRichiesta, { stato: "vuoto" });

  if (esito.stato === "ok") {
    return (
      <div className="esito" role="status">
        <p>Richiesta inviata. La risposta arriverà all'indirizzo email che hai indicato.</p>
      </div>
    );
  }

  const v = esito.campi ?? {};
  const tipo = v.tipo || (tipi.some((t) => t.valore === tipoIniziale) ? tipoIniziale : "evento");

  return (
    <form action={azione} className="modulo" noValidate>
      {esito.stato === "errore" ? (
        <div className="esito" role="alert" style={{ borderLeftColor: "var(--naso)" }}>
          {esito.messaggio}
        </div>
      ) : null}

      <fieldset className="campo">
        <legend>Di cosa si tratta</legend>
        <div className="scelte">
          {tipi.map((t) => (
            <label key={t.valore}>
              <input type="radio" name="tipo" value={t.valore} defaultChecked={t.valore === tipo} />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="riga">
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" autoComplete="name" required defaultValue={v.nome} />
        </div>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} />
        </div>
      </div>

      <div className="riga">
        <div className="campo">
          <label htmlFor="telefono">
            Telefono <span className="aiuto">facoltativo</span>
          </label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" defaultValue={v.telefono} />
        </div>
        <div className="campo">
          <label htmlFor="data">
            Data <span className="aiuto">se già fissata</span>
          </label>
          <input id="data" name="data" type="date" defaultValue={v.data} />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="luogo">
          Luogo <span className="aiuto">città o location</span>
        </label>
        <input id="luogo" name="luogo" defaultValue={v.luogo} />
      </div>

      <div className="campo">
        <label htmlFor="messaggio">Messaggio</label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          defaultValue={v.messaggio}
          placeholder="Che occasione è, quante persone, l'età dei bambini, quanto dovrebbe durare."
        />
      </div>

      <input type="hidden" name="opera" value={opera ?? v.opera ?? ""} />
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="sito">Non compilare</label>
        <input id="sito" name="sito" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button type="submit" className="bottone" disabled={inCorso}>
          {inCorso ? "Invio in corso" : "Invia la richiesta"}
        </button>
      </div>
    </form>
  );
}
