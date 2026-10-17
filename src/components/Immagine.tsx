import type { CSSProperties } from "react";
import type { Media } from "@/content/tipi";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

/* Mostra l'immagine se c'è, altrimenti un segnaposto con lo stesso ingombro. */
export function Immagine({ media, rapporto = "4 / 5", lingua = "it" }: { media: Media; rapporto?: string; lingua?: Lingua }) {
  const t = dizionario(lingua).media;
  return (
    <figure className="figura">
      {media.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.alt} style={{ aspectRatio: rapporto, objectFit: "cover", width: "100%" }} loading="lazy" />
      ) : (
        <div className="segnaposto" role="img" aria-label={media.alt} style={{ "--rapporto": rapporto } as CSSProperties}>
          {t.inArrivo}
        </div>
      )}
      {media.credito ? (
        <figcaption>
          {t.fotoDi} {media.credito}
        </figcaption>
      ) : null}
    </figure>
  );
}
