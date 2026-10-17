import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { Velo } from "@/components/Velo";
import { YouTube } from "@/components/YouTube";
import { slugOpere, trovaOpera } from "@/content/opere";
import { LOCALE, percorso, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { meta } from "./meta";
import { DatiStrutturati, operaLd } from "./DatiStrutturati";

export type ParametriOpera = { params: Promise<{ slug: string }> };

export const parametriOpere = () => slugOpere.map((slug) => ({ slug }));

export async function metaOpera(lingua: Lingua, { params }: ParametriOpera): Promise<Metadata> {
  const { slug } = await params;
  const o = trovaOpera(slug, lingua);
  if (!o) return {};
  return meta(lingua, "opere", o.titolo, o.sinossi, slug, o.copertina.src);
}

export async function SchedaOpera({ lingua, params }: { lingua: Lingua } & ParametriOpera) {
  const { slug } = await params;
  const o = trovaOpera(slug, lingua);
  if (!o) notFound();
  const t = dizionario(lingua).scheda;
  const formatoData = new Intl.DateTimeFormat(LOCALE[lingua], { day: "numeric", month: "short", year: "numeric" });

  const foto = [o.copertina, ...o.galleria].filter((m) => m.src);
  const immagini = (
    <section className="sezione" aria-label={t.immagini}>
      {o.youtube ? <YouTube id={o.youtube} titolo={`${o.titolo}, ${t.video.toLowerCase()}`} /> : null}
      {o.teaser ? (
        <video
          src={o.teaser}
          poster={o.teaser.replace(/\.mp4$/, ".jpg")}
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", maxWidth: "22rem", marginBottom: "1rem" }}
        >
          {t.noVideo}
        </video>
      ) : null}
      {foto.length > 0 ? (
        <div className="galleria">
          {foto.map((m, i) => (
            <Immagine key={i} media={m} rapporto="4 / 3" lingua={lingua} />
          ))}
        </div>
      ) : null}
    </section>
  );

  return (
    <article className="contenitore">
      <DatiStrutturati dati={operaLd(o, lingua)} />
      <header className="apertura">
        <p className="tenue" style={{ marginBottom: "1rem" }}>
          <Link href={percorso(lingua, "opere")}>{dizionario(lingua).opere.titolo}</Link>
          {o.anno ? `, ${o.anno}` : ""}
        </p>
        <Sfasato testo={o.titolo} />
        <p className="introduzione">{o.sottotitolo}</p>
      </header>

      {o.pubblicoAdulto ? (
        <div className="sezione" style={{ marginTop: "2rem" }}>
          <Velo avviso={o.avviso ?? t.avviso} etichetta={t.mostra} regione={t.avvisoRegione}>
            {immagini}
          </Velo>
        </div>
      ) : null}

      <div className="scheda sezione">
        <div>
          <p className="introduzione">{o.sinossi}</p>
          {o.testo.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <aside>
          <dl className="dati">
            {o.durata ? (
              <div>
                <dt>{t.durata}</dt>
                <dd>{o.durata}</dd>
              </div>
            ) : null}
            {o.formato ? (
              <div>
                <dt>{t.formato}</dt>
                <dd>{o.formato}</dd>
              </div>
            ) : null}
            {o.lingua ? (
              <div>
                <dt>{t.lingua}</dt>
                <dd>{o.lingua}</dd>
              </div>
            ) : null}
            {o.crediti.map((c) => (
              <div key={c.ruolo}>
                <dt>{c.ruolo}</dt>
                <dd>{c.nome}</dd>
              </div>
            ))}
          </dl>
          <div className="azioni" style={{ flexDirection: "column", alignItems: "flex-start" }}>
            {o.schedaTecnica ? (
              <a href={o.schedaTecnica} className="bottone secondario">
                {t.tecnica}
              </a>
            ) : null}
            {o.inRepertorio === false ? (
              <p className="tenue">{t.nonInRepertorio}</p>
            ) : (
              <Link href={`${percorso(lingua, "contatti")}?tipo=programmazione&opera=${o.slug}`} className="bottone">
                {t.disponibilita}
              </Link>
            )}
          </div>
        </aside>
      </div>

      {!o.pubblicoAdulto ? immagini : null}

      {o.date.length > 0 ? (
        <section className="sezione">
          <h2>{t.date}</h2>
          <ul className="date">
            {o.date.map((d) => (
              <li key={d.data + d.luogo}>
                <time dateTime={d.data}>{formatoData.format(new Date(d.data))}</time>
                <span>
                  {d.luogo}, {d.citta}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
