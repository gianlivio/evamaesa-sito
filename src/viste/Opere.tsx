import Link from "next/link";
import { Sfasato } from "@/components/Sfasato";
import { opereIn } from "@/content/opere";
import { percorso, percorsoOpera, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export function Opere({ lingua }: { lingua: Lingua }) {
  const t = dizionario(lingua).opere;
  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo={t.titolo} />
        <p className="introduzione">{t.intro}</p>
        <div className="azioni">
          <Link href={percorso(lingua, "stanza")} className="bottone secondario">
            {t.entra}
          </Link>
        </div>
      </section>

      <section className="contenitore sezione" style={{ marginTop: "3rem" }}>
        <h2 className="sr-only">{t.elenco}</h2>
        <ul className="elenco-opere">
          {opereIn(lingua).map((o) => (
            <li key={o.slug}>
              <Link href={percorsoOpera(lingua, o.slug)} className="voce-opera">
                <span className="anno">{o.anno ?? ""}</span>
                <h3>
                  {o.titolo}
                  {o.pubblicoAdulto ? <span className="etichetta-avviso">{t.adulto}</span> : null}
                </h3>
                <span className="tipo">{t.tipi[o.tipo]}</span>
                <p className="descr">{o.sottotitolo}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
