import { Sfasato } from "@/components/Sfasato";
import { profiloIn } from "@/content/profilo";
import { trovaOpera } from "@/content/opere";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { Modulo } from "./Modulo";

export type ParametriContatti = { searchParams: Promise<{ tipo?: string; opera?: string }> };

export async function Contatti({ lingua, searchParams }: { lingua: Lingua } & ParametriContatti) {
  const { tipo, opera } = await searchParams;
  const operaTrovata = opera ? trovaOpera(opera, lingua) : undefined;
  const t = dizionario(lingua).contatti;
  const profilo = profiloIn(lingua);

  return (
    <>
      <section className="contenitore apertura">
        <Sfasato testo={t.titolo} />
        <p className="introduzione">{operaTrovata ? t.perOpera(operaTrovata.titolo) : t.intro}</p>
      </section>

      <section className="contenitore sezione" style={{ marginTop: "2rem" }}>
        <div className="bio">
          <ul className="contatti-diretti">
            <li>
              <span>{t.email}</span>
              <a href={`mailto:${profilo.email}`}>{profilo.email}</a>
            </li>
            <li>
              <span>{t.telefono}</span>
              <a href={`tel:${profilo.telefonoHref}`}>{profilo.telefono}</a>
            </li>
            <li>
              <span>{t.instagram}</span>
              <a href={profilo.instagram} rel="noopener">
                @{profilo.instagramNome}
              </a>
            </li>
          </ul>
          <Modulo lingua={lingua} tipoIniziale={tipo} opera={operaTrovata?.slug} />
        </div>
      </section>
    </>
  );
}
