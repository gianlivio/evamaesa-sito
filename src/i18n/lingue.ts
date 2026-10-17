export type Lingua = "it" | "en" | "fr";
export const LINGUE: Lingua[] = ["it", "en", "fr"];
export const NOMI_LINGUE: Record<Lingua, string> = { it: "Italiano", en: "English", fr: "Français" };

/** Testo tradotto nelle tre lingue. */
export type Tr = Record<Lingua, string>;
export const tr = (x: Tr, l: Lingua) => x[l];

export type Sezione = "home" | "chiSono" | "eventi" | "opere" | "contatti" | "stanza";

/*
 * Percorsi localizzati. L'italiano resta senza prefisso.
 * Le schede delle opere usano lo stesso slug in tutte le lingue: /opere/x, /en/works/x, /fr/oeuvres/x.
 */
export const PERCORSI: Record<Lingua, Record<Sezione, string>> = {
  it: { home: "/", chiSono: "/chi-sono", eventi: "/eventi", opere: "/opere", contatti: "/contatti", stanza: "/stanza" },
  en: { home: "/en", chiSono: "/en/about", eventi: "/en/events", opere: "/en/works", contatti: "/en/contact", stanza: "/en/room" },
  fr: { home: "/fr", chiSono: "/fr/a-propos", eventi: "/fr/evenements", opere: "/fr/oeuvres", contatti: "/fr/contact", stanza: "/fr/salle" },
};

export const percorso = (l: Lingua, s: Sezione) => PERCORSI[l][s];
export const percorsoOpera = (l: Lingua, slug: string) => `${PERCORSI[l].opere}/${slug}`;

/** Riconosce lingua, sezione ed eventuale slug da un percorso. */
export function riconosci(pathname: string): { lingua: Lingua; sezione: Sezione; slug?: string } {
  const p = pathname.replace(/\/$/, "") || "/";
  for (const l of ["en", "fr", "it"] as Lingua[]) {
    for (const [s, base] of Object.entries(PERCORSI[l]) as [Sezione, string][]) {
      if (p === base) return { lingua: l, sezione: s };
      if (s === "opere" && p.startsWith(base + "/")) return { lingua: l, sezione: s, slug: p.slice(base.length + 1) };
    }
    if (l !== "it" && (p === `/${l}` || p.startsWith(`/${l}/`))) return { lingua: l, sezione: "home" };
  }
  return { lingua: "it", sezione: "home" };
}

/** Lo stesso contenuto in un'altra lingua. */
export function equivalente(pathname: string, verso: Lingua) {
  const { sezione, slug } = riconosci(pathname);
  return slug ? percorsoOpera(verso, slug) : percorso(verso, sezione);
}

/** Alternative hreflang per i metadati di una pagina. */
export function alternative(sezione: Sezione, slug?: string) {
  const per = (l: Lingua) => (slug ? percorsoOpera(l, slug) : percorso(l, sezione));
  return { it: per("it"), en: per("en"), fr: per("fr"), "x-default": per("it") };
}

export const LOCALE: Record<Lingua, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" };
