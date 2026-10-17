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

const df = "Dante Farricella";
const galleria = [
  { src: "/media/eventi/02.jpg", alt: "Eva sui trampoli con giacca e cappello, sotto un portico", credito: df },
  { src: "/media/eventi/03.jpg", alt: "Eva sui trampoli con un nastro, in un cortile", credito: df },
  { src: "/media/eventi/05.jpg", alt: "Eva sui trampoli in costume bianco davanti a un portone", credito: df },
  { src: "/media/eventi/04.jpg", alt: "Eva sui trampoli tra le piante, con un cappello verde", credito: df },
  { src: "/media/eventi/01.jpg", alt: "Eva sui trampoli con pantaloni a colori, in un prato" },
  { src: "/media/eventi/07.jpg", alt: "Eva che si prepara a salire sui trampoli", credito: df },
  { src: "/media/eventi/08.jpg", alt: "Una clown con la parrucca colorata gioca con una bambina in piazza" },
  { src: "/media/eventi/09.jpg", alt: "Fruoth Fru racconta una storia a una bambina, in un giardino" },
];

export default function Eventi() {
  const spettacoli = opere.filter((o) => o.ancheInEventi && !o.pubblicoAdulto);

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
          {galleria.map((m) => (
            <Immagine key={m.src} media={m} rapporto="2 / 3" />
          ))}
        </div>
      </section>
    </>
  );
}
