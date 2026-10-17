import type { Metadata } from "next";
import { alternative, type Lingua, type Sezione } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { IMMAGINE_SOCIAL } from "@/i18n/sito";

const LOCALE_OG: Record<Lingua, string> = { it: "it_IT", en: "en_GB", fr: "fr_FR" };

/** Metadati di una pagina: alternative di lingua, anteprime per i social. */
export function meta(
  lingua: Lingua,
  sezione: Sezione,
  titolo?: string,
  descrizione?: string,
  slug?: string,
  immagine?: string,
): Metadata {
  const alt = alternative(sezione, slug);
  const d = dizionario(lingua).meta;
  const titoloSocial = titolo ? `${titolo} | Eva Maesa` : d.titolo;
  const descr = descrizione ?? d.descrizione;
  const img = immagine ?? IMMAGINE_SOCIAL;
  return {
    ...(titolo ? { title: titolo } : {}),
    description: descr,
    alternates: { canonical: alt[lingua], languages: alt },
    openGraph: {
      type: slug ? "article" : "website",
      siteName: "Eva Maesa",
      title: titoloSocial,
      description: descr,
      url: alt[lingua],
      locale: LOCALE_OG[lingua],
      alternateLocale: (Object.keys(LOCALE_OG) as Lingua[]).filter((l) => l !== lingua).map((l) => LOCALE_OG[l]),
      images: [{ url: img, ...(immagine ? {} : { width: 1200, height: 630 }), alt: "Eva Maesa" }],
    },
    twitter: { card: "summary_large_image", title: titoloSocial, description: descr, images: [img] },
  };
}
