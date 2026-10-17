import type { MetadataRoute } from "next";
import { ONLINE, SITO_URL } from "@/i18n/sito";

// in anteprima i motori di ricerca restano fuori; vedi src/i18n/sito.ts
export default function robots(): MetadataRoute.Robots {
  return ONLINE
    ? { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITO_URL}/sitemap.xml`, host: SITO_URL }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
