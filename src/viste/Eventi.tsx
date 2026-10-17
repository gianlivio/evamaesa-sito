import Link from "next/link";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { formatEventiIn, galleriaEventiIn, occasioniIn, profiloIn } from "@/content/profilo";
import { opereIn } from "@/content/opere";
import { percorso, percorsoOpera, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export function Eventi({ lingua }: { lingua: Lingua }) {
  const t = dizionario(lingua).eventi;
  const spettacoli = opereIn(lingua).filter((o) => o.ancheInEventi && !o.pubblicoAdulto);

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo={t.titolo} />
        <p className="introduzione">{t.intro}</p>
        <div className="azioni">
          <Link href={`${percorso(lingua, "contatti")}?tipo=evento`} className="bottone">
            {t.preventivo}
          </Link>
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>{t.occasioni}</h2>
        <ul className="occasioni">
          {occasioniIn(lingua).map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="tenue" style={{ marginTop: "1.5rem" }}>
          {profiloIn(lingua).zona}
        </p>
      </section>

      <section className="contenitore sezione">
        <h2>{t.format}</h2>
        <div className="format">
          {formatEventiIn(lingua).map((f) => (
            <article key={f.slug}>
              <h3>{f.nome}</h3>
              <p>{f.descrizione}</p>
              <ul>
                {f.contenuto.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              {f.durata ? (
                <p className="nota">
                  {t.durata}: {f.durata}
                </p>
              ) : null}
              {f.requisiti ? <p className="nota">{f.requisiti}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>{t.spettacoli}</h2>
        <div className="richiami">
          {spettacoli.map((o) => (
            <Link key={o.slug} href={percorsoOpera(lingua, o.slug)} className="richiamo">
              <Immagine media={o.copertina} rapporto="3 / 2" lingua={lingua} />
              <h3>{o.titolo}</h3>
              <p className="tenue">{o.sinossi}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>{t.galleria}</h2>
        <div className="galleria">
          {galleriaEventiIn(lingua).map((m) => (
            <Immagine key={m.src} media={m} rapporto="2 / 3" lingua={lingua} />
          ))}
        </div>
      </section>
    </>
  );
}
