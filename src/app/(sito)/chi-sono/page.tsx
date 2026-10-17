import type { Metadata } from "next";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { profilo, esperienze } from "@/content/profilo";

export const metadata: Metadata = { title: "Chi sono" };

const categorie = {
  formazione: "Formazione",
  compagnia: "Compagnia",
  collaborazione: "Collaborazione",
  educazione: "Educazione",
} as const;

export default function ChiSono() {
  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo="Chi sono" />
      </section>

      <section className="contenitore">
        <div className="bio">
          <Immagine media={{ src: "/media/ritratti/01.jpg", alt: "Ritratto di Eva Maesa con una giacca rossa" }} rapporto="3 / 4" />
          <div>
            {profilo.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "introduzione" : undefined}>
                {p}
              </p>
            ))}
            <div className="azioni">
              <a href={profilo.cv} className="bottone secondario">
                Scarica il curriculum (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contenitore sezione">
        <h2>Percorso</h2>
        <ul className="esperienze">
          {esperienze.map((e, i) => (
            <li key={i}>
              <span className="categoria">
                {categorie[e.tipo]}
                {e.anno ? <><br />{e.anno}</> : null}
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
