import type { Metadata } from "next";
import { alternative, type Lingua, type Sezione } from "@/i18n/lingue";

/** Metadati di una pagina con le alternative nelle altre lingue. */
export function meta(lingua: Lingua, sezione: Sezione, titolo?: string, descrizione?: string, slug?: string): Metadata {
  const alt = alternative(sezione, slug);
  return {
    ...(titolo ? { title: titolo } : {}),
    ...(descrizione ? { description: descrizione } : {}),
    alternates: { canonical: alt[lingua], languages: alt },
  };
}
