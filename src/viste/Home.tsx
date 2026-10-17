import Link from "next/link";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { profiloIn } from "@/content/profilo";
import { opereIn } from "@/content/opere";
import { percorso, percorsoOpera, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export function Home({ lingua }: { lingua: Lingua }) {
  const t = dizionario(lingua).home;
  const profilo = profiloIn(lingua);
  // in home solo opere senza avviso
  const inVista = opereIn(lingua)
    .filter((o) => !o.pubblicoAdulto)
    .slice(0, 3);

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo="Eva Maesa" giocoso />
        <p className="introduzione">
          {profilo.discipline}. {profilo.presentazione}
        </p>
      </section>

      <section className="contenitore sezione" aria-label={t.cosaCerchi}>
        <div className="ingressi">
          <Link href={percorso(lingua, "eventi")} className="ingresso">
            <h2>{t.eventiTitolo}</h2>
            <p className="tenue">{t.eventiTesto}</p>
          </Link>
          <Link href={percorso(lingua, "opere")} className="ingresso">
            <h2>{t.opereTitolo}</h2>
            <p className="tenue">{t.opereTesto}</p>
          </Link>
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>{t.inScena}</h2>
        <div className="richiami" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))" }}>
          {inVista.map((o) => (
            <Link key={o.slug} href={percorsoOpera(lingua, o.slug)} className="richiamo">
              <Immagine media={o.copertina} rapporto="4 / 5" lingua={lingua} />
              <h3>{o.titolo}</h3>
              <p className="tenue">{o.sottotitolo}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
