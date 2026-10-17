import type { Opera } from "@/content/tipi";
import { profiloIn } from "@/content/profilo";
import { percorso, percorsoOpera, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { SITO_URL } from "@/i18n/sito";

/*
 * Dati strutturati schema.org (JSON-LD): dicono a motori di ricerca e motori generativi
 * chi è Eva, cosa fa, dove lavora e quali opere ha creato.
 */

const COMPETENZE: Record<Lingua, string[]> = {
  it: ["recitazione", "clown", "trampoli", "teatro di strada", "teatrodanza", "teatro fisico", "giocoleria", "animazione per feste di bambini", "poesia performativa"],
  en: ["acting", "clowning", "stilt walking", "street theatre", "dance theatre", "physical theatre", "juggling", "children's party entertainment", "performance poetry"],
  fr: ["jeu d'acteur", "clown", "échasses", "théâtre de rue", "danse-théâtre", "théâtre physique", "jonglerie", "animation de fêtes d'enfants", "poésie performée"],
};

const LAVORO: Record<Lingua, string> = { it: "Performer", en: "Performer", fr: "Performeuse" };
const ZONE: Record<Lingua, string[]> = {
  it: ["Nord Italia", "Sud della Francia"],
  en: ["Northern Italy", "Southern France"],
  fr: ["Nord de l'Italie", "Sud de la France"],
};

export function personaLd(lingua: Lingua) {
  const p = profiloIn(lingua);
  const t = dizionario(lingua);
  return {
    "@type": "Person",
    "@id": `${SITO_URL}/#eva-maesa`,
    name: "Eva Maesa",
    alternateName: "MaEva",
    jobTitle: LAVORO[lingua],
    description: `${p.discipline}. ${p.presentazione}`,
    url: SITO_URL + percorso(lingua, "home"),
    image: SITO_URL + p.ritratto,
    email: `mailto:${p.email}`,
    telephone: p.telefonoHref,
    birthPlace: { "@type": "Place", name: "Foggia" },
    knowsAbout: COMPETENZE[lingua],
    knowsLanguage: ["it", "en", "fr"],
    alumniOf: [
      { "@type": "EducationalOrganization", name: "PATS" },
      { "@type": "EducationalOrganization", name: "Accademia Pietro Sharoff" },
    ],
    areaServed: ZONE[lingua].map((name) => ({ "@type": "Place", name })),
    sameAs: [p.instagram],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: t.eventi.titolo, description: t.meta.eventiDescr, areaServed: ZONE[lingua] } },
    ],
  };
}

export function operaLd(o: Opera, lingua: Lingua) {
  return {
    "@type": "CreativeWork",
    "@id": `${SITO_URL}${percorsoOpera(lingua, o.slug)}#opera`,
    name: o.titolo,
    alternativeHeadline: o.sottotitolo,
    description: o.sinossi,
    url: SITO_URL + percorsoOpera(lingua, o.slug),
    inLanguage: lingua,
    genre: dizionario(lingua).opere.tipi[o.tipo],
    ...(o.anno ? { dateCreated: String(o.anno) } : {}),
    ...(o.copertina.src ? { image: SITO_URL + o.copertina.src } : {}),
    creator: { "@id": `${SITO_URL}/#eva-maesa` },
    contributor: o.crediti.filter((c) => c.nome !== "Eva Maesa").map((c) => ({ "@type": "Person", name: c.nome, roleName: c.ruolo })),
    ...(o.teaser ? { video: { "@type": "VideoObject", name: o.titolo, contentUrl: SITO_URL + o.teaser, thumbnailUrl: SITO_URL + o.teaser.replace(/\.mp4$/, ".jpg"), description: o.sinossi, uploadDate: "2026-04-01" } } : {}),
  };
}

export function DatiStrutturati({ dati }: { dati: object | object[] }) {
  const grafo = { "@context": "https://schema.org", "@graph": Array.isArray(dati) ? dati : [dati] };
  // "<" viene neutralizzato per non poter chiudere il tag script
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }} />;
}

export function sitoLd(lingua: Lingua) {
  return {
    "@type": "WebSite",
    "@id": `${SITO_URL}/#sito`,
    url: SITO_URL,
    name: "Eva Maesa",
    inLanguage: ["it", "en", "fr"],
    about: { "@id": `${SITO_URL}/#eva-maesa` },
    description: dizionario(lingua).meta.descrizione,
  };
}
