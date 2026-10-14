import type { Metadata } from "next";
import Link from "next/link";
import { Sfasato } from "@/components/Sfasato";
import { opere } from "@/content/opere";

export const metadata: Metadata = {
  title: "Opere",
  description: "Spettacoli di strada, clown e performance di teatrodanza di Eva Maesa.",
};

const tipi = { spettacolo: "Spettacolo", performance: "Performance", installazione: "Installazione" } as const;

export default function Opere() {
  const ordinate = [...opere].sort((a, b) => (b.anno ?? 0) - (a.anno ?? 0));

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo="Opere" />
        <p className="introduzione">
          Spettacoli e performance di cui Eva è autrice. Le opere segnate con l’avviso contengono nudo e sono pensate per
          un pubblico adulto.
        </p>
        <div className="azioni">
          <Link href="/stanza" className="bottone secondario">
            Entra nella stanza
          </Link>
        </div>
      </section>

      <section className="contenitore sezione" style={{ marginTop: "3rem" }}>
        <h2 className="sr-only">Elenco delle opere</h2>
        <ul className="elenco-opere">
          {ordinate.map((o) => (
            <li key={o.slug}>
              <Link href={`/opere/${o.slug}`} className="voce-opera">
                <span className="anno">{o.anno ?? ""}</span>
                <h3>
                  {o.titolo}
                  {o.perAdulti ? <span className="etichetta-avviso">Per adulti</span> : null}
                </h3>
                <span className="tipo">{tipi[o.tipo]}</span>
                <p className="descr">{o.sottotitolo}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
