import type { MetadataRoute } from "next";
import { LINGUE, PERCORSI, alternative, percorsoOpera, type Sezione } from "@/i18n/lingue";
import { slugOpere } from "@/content/opere";
import { SITO_URL } from "@/i18n/sito";

const assoluti = (alt: Record<string, string>) => Object.fromEntries(Object.entries(alt).map(([l, p]) => [l, SITO_URL + p]));

export default function sitemap(): MetadataRoute.Sitemap {
  const sezioni = Object.keys(PERCORSI.it) as Sezione[];
  const voci: MetadataRoute.Sitemap = [];
  for (const l of LINGUE) {
    for (const s of sezioni) {
      voci.push({
        url: SITO_URL + PERCORSI[l][s],
        changeFrequency: "monthly",
        priority: s === "home" ? 1 : s === "eventi" || s === "opere" ? 0.8 : 0.6,
        alternates: { languages: assoluti(alternative(s)) },
      });
    }
    for (const slug of slugOpere) {
      voci.push({
        url: SITO_URL + percorsoOpera(l, slug),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: assoluti(alternative("opere", slug)) },
      });
    }
  }
  return voci;
}
