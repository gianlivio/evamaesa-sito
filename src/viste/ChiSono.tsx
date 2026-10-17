import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { profiloIn, ritrattiIn } from "@/content/profilo";
import { GRUPPI, schedaIn, vociSito } from "@/content/cv";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export function ChiSono({ lingua }: { lingua: Lingua }) {
  const t = dizionario(lingua).chiSono;
  const profilo = profiloIn(lingua);
  const voci = vociSito(lingua);
  const sc = schedaIn(lingua);
  const m = t.misure;
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
          {ritrattiIn(lingua).map((r) => (
            <Immagine key={r.src} media={r} rapporto="3 / 4" lingua={lingua} />
          ))}
        </div>
        <h3 className="titolo-casting">{t.casting}</h3>
        <dl className="dati casting">
          {(
            [
              [m.altezza, sc.altezza],
              [m.taglia, sc.taglia],
              [m.scarpe, sc.scarpe],
              [m.capelli, sc.capelli],
              [m.lingue, sc.lingue],
              [m.dialetti, sc.dialetti],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contenitore sezione">
        <h2>{t.percorso}</h2>
        {GRUPPI.map((g) => (
          <div key={g} className="gruppo-percorso">
            <h3>{t.categorie[g]}</h3>
            <ul className="esperienze">
              {voci
                .filter((v) => v.gruppo === g)
                .map((v) => (
                  <li key={v.titolo}>
                    <span className="categoria">{v.anni}</span>
                    <div>
                      <strong>{v.titolo}</strong>
                      <p>{v.dettaglio}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <p className="tenue">
          {t.cvCompleto}{" "}
          <a href={profilo.cv}>{t.cv}</a>
        </p>
      </section>
    </>
  );
}
