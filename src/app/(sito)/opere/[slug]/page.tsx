import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sfasato } from "@/components/Sfasato";
import { Immagine } from "@/components/Immagine";
import { Velo } from "@/components/Velo";
import { opere, trovaOpera } from "@/content/opere";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return opere.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const o = trovaOpera(slug);
  if (!o) return {};
  return { title: o.titolo, description: o.sinossi };
}

const formatoData = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short", year: "numeric" });

export default async function SchedaOpera({ params }: Params) {
  const { slug } = await params;
  const o = trovaOpera(slug);
  if (!o) notFound();

  const avvisoTesto = o.avviso ?? "Questa opera contiene nudo ed è riservata a un pubblico adulto.";

  const immagini = (
    <section className="sezione" aria-label="Immagini">
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
          Il tuo browser non riproduce questo video.
        </video>
      ) : null}
      <div className="galleria">
        {[o.copertina, ...o.galleria].map((m, i) => (
          <Immagine key={i} media={m} rapporto="4 / 3" />
        ))}
      </div>
    </section>
  );

  return (
    <article className="contenitore">
      <header className="apertura">
        <p className="tenue" style={{ marginBottom: "1rem" }}>
          <Link href="/opere">Opere</Link>
          {o.anno ? `, ${o.anno}` : ""}
        </p>
        <Sfasato testo={o.titolo} />
        <p className="introduzione">{o.sottotitolo}</p>
      </header>

      {o.pubblicoAdulto ? (
        <div className="sezione" style={{ marginTop: "2rem" }}>
          <Velo avviso={avvisoTesto}>{immagini}</Velo>
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
                <dt>Durata</dt>
                <dd>{o.durata}</dd>
              </div>
            ) : null}
            {o.formato ? (
              <div>
                <dt>Formato</dt>
                <dd>{o.formato}</dd>
              </div>
            ) : null}
            {o.lingua ? (
              <div>
                <dt>Lingua</dt>
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
                Scheda tecnica (PDF)
              </a>
            ) : null}
            <Link href={`/contatti?tipo=programmazione&opera=${o.slug}`} className="bottone">
              Chiedi disponibilità
            </Link>
          </div>
        </aside>
      </div>

      {!o.pubblicoAdulto ? immagini : null}

      {o.date.length > 0 ? (
        <section className="sezione">
          <h2>Date</h2>
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
