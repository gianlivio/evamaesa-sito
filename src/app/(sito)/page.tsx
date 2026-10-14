import Link from "next/link";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { profilo } from "@/content/profilo";
import { opere } from "@/content/opere";

export default function Home() {
  // in home solo opere senza avviso
  const inVista = opere.filter((o) => !o.pubblicoAdulto).slice(0, 3);

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo="Eva Maesa" giocoso />
        <p className="introduzione">
          {profilo.discipline}. {profilo.presentazione}
        </p>
      </section>

      <section className="contenitore sezione" aria-label="Cosa cerchi">
        <div className="ingressi">
          <Link href="/eventi" className="ingresso">
            <h2>Feste ed eventi</h2>
            <p className="tenue">
              Compleanni, matrimoni, eventi aziendali e piazze: animazione, clown, trampoli, palloncini, truccabimbi.
            </p>
          </Link>
          <Link href="/opere" className="ingresso">
            <h2>Opere</h2>
            <p className="tenue">
              Spettacoli di strada, clown e performance di teatrodanza per festival, teatri e rassegne.
            </p>
          </Link>
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>In scena</h2>
        <div className="richiami" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))" }}>
          {inVista.map((o) => (
            <Link key={o.slug} href={`/opere/${o.slug}`} className="richiamo">
              <Immagine media={o.copertina} rapporto="4 / 5" />
              <h3>{o.titolo}</h3>
              <p className="tenue">{o.sottotitolo}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
