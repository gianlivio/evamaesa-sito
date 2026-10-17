import type { ReactNode } from "react";
import { Testata } from "@/components/Testata";
import { Piede } from "@/components/Piede";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { DatiStrutturati, personaLd, sitoLd } from "./DatiStrutturati";

/* Impaginato del sito minimale in una lingua. La stanza 3D ne resta fuori e occupa tutto lo schermo. */
export function Sito({ lingua, children }: { lingua: Lingua; children: ReactNode }) {
  return (
    <div lang={lingua}>
      {lingua !== "it" ? <ImpostaLingua lingua={lingua} /> : null}
      <DatiStrutturati dati={[sitoLd(lingua), personaLd(lingua)]} />
      <a href="#contenuto" className="salta">
        {dizionario(lingua).nav.salta}
      </a>
      <Testata lingua={lingua} />
      <main id="contenuto">{children}</main>
      <Piede lingua={lingua} />
    </div>
  );
}

/** Allinea l'attributo lang del documento alla lingua della pagina. */
export function ImpostaLingua({ lingua }: { lingua: Lingua }) {
  return <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(lingua)}` }} />;
}
