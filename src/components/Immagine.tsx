import type { CSSProperties } from "react";
import type { Media } from "@/content/tipi";

/* Mostra l'immagine se c'è, altrimenti un segnaposto con lo stesso ingombro. */
export function Immagine({ media, rapporto = "4 / 5" }: { media: Media; rapporto?: string }) {
  return (
    <figure className="figura">
      {media.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.alt} style={{ aspectRatio: rapporto, objectFit: "cover", width: "100%" }} loading="lazy" />
      ) : (
        <div className="segnaposto" role="img" aria-label={media.alt} style={{ "--rapporto": rapporto } as CSSProperties}>
          Foto in arrivo
        </div>
      )}
      {media.credito ? <figcaption>Foto di {media.credito}</figcaption> : null}
    </figure>
  );
}
