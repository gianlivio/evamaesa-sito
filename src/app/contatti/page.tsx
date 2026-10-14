import type { Metadata } from "next";
import { Sfasato } from "@/components/Sfasato";
import { profilo } from "@/content/profilo";
import { trovaOpera } from "@/content/opere";
import { Modulo } from "./Modulo";

export const metadata: Metadata = { title: "Contatti" };

type Props = { searchParams: Promise<{ tipo?: string; opera?: string }> };

export default async function Contatti({ searchParams }: Props) {
  const { tipo, opera } = await searchParams;
  const operaTrovata = opera ? trovaOpera(opera) : undefined;

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo="Contatti" />
        <p className="introduzione">
          {operaTrovata
            ? `Richiesta di disponibilità per ${operaTrovata.titolo}. Indica date e luogo, se li conosci.`
            : "Per una festa, un evento o una programmazione: scrivi qui sotto, oppure usa i contatti diretti."}
        </p>
      </section>

      <section className="contenitore sezione" style={{ marginTop: "2rem" }}>
        <div className="bio">
          <ul className="contatti-diretti">
            <li>
              <span>Email</span>
              <a href={`mailto:${profilo.email}`}>{profilo.email}</a>
            </li>
            <li>
              <span>Telefono</span>
              <a href={`tel:${profilo.telefonoHref}`}>{profilo.telefono}</a>
            </li>
            <li>
              <span>Instagram</span>
              <a href={profilo.instagram} rel="noopener">
                @{profilo.instagramNome}
              </a>
            </li>
          </ul>
          <Modulo tipoIniziale={tipo} opera={operaTrovata?.slug} />
        </div>
      </section>
    </>
  );
}
