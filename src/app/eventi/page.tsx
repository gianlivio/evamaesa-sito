import type { Metadata } from "next";
import Link from "next/link";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { occasioni, formatEventi, profilo } from "@/content/profilo";
import { opere } from "@/content/opere";

export const metadata: Metadata = {
  title: "Feste ed eventi",
  description:
    "Animazione per feste di bambini, matrimoni, eventi aziendali e piazze: clown, trampoli, palloncini, truccabimbi, spettacoli.",
};

export default function Eventi() {
  const spettacoli = opere.filter((o) => o.ancheInEventi && !o.perAdulti);

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo="Feste ed eventi" />
        <p className="introduzione">
          Animazioni su misura in cui gli ospiti non assistono ma partecipano: conduzione, giochi, spettacolo, musica.
          Ogni format si adatta a pubblico, luogo, tempi e occasione.
        </p>
        <div className="azioni">
          <Link href="/contatti?tipo=evento" className="bottone">
            Chiedi un preventivo
          </Link>
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>Per quali occasioni</h2>
        <ul className="occasioni">
          {occasioni.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="tenue" style={{ marginTop: "1.5rem" }}>
          {profilo.zona}
        </p>
      </section>

      <section className="contenitore sezione">
        <h2>Format</h2>
        <div className="format">
          {formatEventi.map((f) => (
            <article key={f.slug}>
              <h3>{f.nome}</h3>
              <p>{f.descrizione}</p>
              <ul>
                {f.contenuto.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              {f.durata ? <p className="nota">Durata: {f.durata}</p> : null}
              {f.requisiti ? <p className="nota">{f.requisiti}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>Spettacoli per feste e piazze</h2>
        <div className="richiami">
          {spettacoli.map((o) => (
            <Link key={o.slug} href={`/opere/${o.slug}`} className="richiamo">
              <Immagine media={o.copertina} rapporto="3 / 2" />
              <h3>{o.titolo}</h3>
              <p className="tenue">{o.sinossi}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>Galleria</h2>
        <div className="galleria">
          {Array.from({ length: 6 }, (_, i) => (
            <Immagine key={i} media={{ alt: `Animazione, foto ${i + 1}` }} rapporto="2 / 3" />
          ))}
        </div>
      </section>
    </>
  );
}
