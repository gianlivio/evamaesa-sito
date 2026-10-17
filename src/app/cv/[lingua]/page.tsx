import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LINGUE, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { profiloIn } from "@/content/profilo";
import { GRUPPI, bioCv, competenze, privacyCv, schedaIn, vociCv } from "@/content/cv";
import { ImpostaLingua } from "@/viste/Sito";
import "./cv.css";

/*
 * Curriculum stampabile: sorgente dei PDF in /public/documenti.
 * Non è linkato dal sito e resta fuori dai motori di ricerca.
 * Per rigenerare i PDF: python3 scripts/genera-cv.py
 */

export const metadata: Metadata = { title: "Curriculum vitae", robots: { index: false, follow: false } };
export const dynamicParams = false;
export const generateStaticParams = () => LINGUE.map((lingua) => ({ lingua }));

const ETICHETTE: Record<Lingua, { cv: string; contatti: string; telefono: string; sito: string; competenze: string; bio: string; esperienze: string; misure: string }> = {
  it: { cv: "Curriculum vitae", contatti: "Contatti", telefono: "Telefono", sito: "Sito", competenze: "Competenze professionali", bio: "Bio", esperienze: "Esperienze artistiche e formative", misure: "Misure" },
  en: { cv: "Curriculum vitae", contatti: "Contact", telefono: "Phone", sito: "Website", competenze: "Professional skills", bio: "Biography", esperienze: "Artistic work and training", misure: "Measurements" },
  fr: { cv: "Curriculum vitae", contatti: "Contact", telefono: "Téléphone", sito: "Site", competenze: "Compétences professionnelles", bio: "Biographie", esperienze: "Parcours artistique et formation", misure: "Mensurations" },
};

export default async function Cv({ params }: { params: Promise<{ lingua: string }> }) {
  const { lingua: l } = await params;
  if (!LINGUE.includes(l as Lingua)) notFound();
  const lingua = l as Lingua;
  const e = ETICHETTE[lingua];
  const t = dizionario(lingua).chiSono;
  const p = profiloIn(lingua);
  const sc = schedaIn(lingua);
  const voci = vociCv(lingua);
  const misure: [string, string][] = [
    [t.misure.altezza, sc.altezza],
    [t.misure.taglia, sc.taglia],
    [t.misure.scarpe, sc.scarpe],
    [t.misure.capelli, sc.capelli],
  ];

  return (
    <div className="cv" lang={lingua}>
      {lingua !== "it" ? <ImpostaLingua lingua={lingua} /> : null}
      <aside className="cv-lato">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.ritratto} alt="Eva Maesa" className="cv-foto" />
        <h2>{e.contatti}</h2>
        <dl>
          <dt>{e.telefono}</dt>
          <dd>{p.telefono}</dd>
          <dt>Email</dt>
          <dd>{p.email}</dd>
          <dt>{e.sito}</dt>
          <dd>www.evamaesa.it</dd>
          <dt>Instagram</dt>
          <dd>@{p.instagramNome}</dd>
          <dt>Facebook</dt>
          <dd>Eva eve Maeva</dd>
        </dl>
        <h2>{e.competenze}</h2>
        <ul>
          {competenze.map((c) => (
            <li key={c.it}>{c[lingua]}</li>
          ))}
        </ul>
        <h2>{t.misure.lingue}</h2>
        <p>{sc.lingue}</p>
        <h2>{t.misure.dialetti}</h2>
        <p>{sc.dialetti}</p>
        <h2>{e.misure}</h2>
        <dl>
          {misure.map(([k, v]) => (
            <div key={k} className="cv-riga">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <main className="cv-corpo">
        <p className="cv-sopra">{e.cv}</p>
        <h1>
          Eva Maesa<span className="punto">.</span>
        </h1>
        <p className="cv-discipline">{p.discipline}</p>

        <h2>{e.bio}</h2>
        {bioCv.map((b) => (
          <p key={b.it}>{b[lingua]}</p>
        ))}

        <h2>{e.esperienze}</h2>
        {GRUPPI.map((g) => (
          <section key={g} className="cv-gruppo">
            <h3>{t.categorie[g]}</h3>
            <ul>
              {voci
                .filter((v) => v.gruppo === g)
                .map((v) => (
                  <li key={v.titolo}>
                    <span className="cv-anni">{v.anni ?? ""}</span>
                    <span>
                      <strong>{v.titolo}</strong> {v.dettaglio}
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <p className="cv-privacy">{privacyCv[lingua]}</p>
      </main>
    </div>
  );
}
