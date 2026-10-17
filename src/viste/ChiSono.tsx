import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { esperienzeIn, profiloIn, ritrattiIn } from "@/content/profilo";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export function ChiSono({ lingua }: { lingua: Lingua }) {
  const t = dizionario(lingua).chiSono;
  const profilo = profiloIn(lingua);
  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo={t.titolo} />
      </section>

      <section className="contenitore">
        <div className="bio">
          <Immagine
            media={{ src: profilo.ritratto, alt: t.ritratto, credito: profilo.creditoRitratto }}
            rapporto="3 / 4"
            lingua={lingua}
          />
          <div>
            {profilo.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "introduzione" : undefined}>
                {p}
              </p>
            ))}
            <div className="azioni">
              <a href={profilo.cv} className="bottone secondario">
                {t.cv}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>{t.ritratti}</h2>
        <div className="galleria">
          {ritrattiIn(lingua).map((m) => (
            <Immagine key={m.src} media={m} rapporto="3 / 4" lingua={lingua} />
          ))}
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>{t.percorso}</h2>
        <ul className="esperienze">
          {esperienzeIn(lingua).map((e, i) => (
            <li key={i}>
              <span className="categoria">
                {t.categorie[e.tipo]}
                {e.anno ? (
                  <>
                    <br />
                    {e.anno}
                  </>
                ) : null}
              </span>
              <div>
                <strong>{e.titolo}</strong>
                <p>{e.descrizione}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
