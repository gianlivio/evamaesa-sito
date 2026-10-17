import { opereIn } from "@/content/opere";
import { profiloIn, occasioniIn } from "@/content/profilo";
import { percorso, percorsoOpera } from "@/i18n/lingue";
import { SITO_URL } from "@/i18n/sito";

/*
 * llms.txt: profilo sintetico in testo semplice per i motori generativi (GEO).
 * Si genera dai contenuti del sito, quindi resta allineato a quello che il sito dice.
 */
export const dynamic = "force-static";

export function GET() {
  const it = profiloIn("it");
  const en = profiloIn("en");
  const righe = [
    "# Eva Maesa",
    "",
    `> ${it.discipline}. ${it.presentazione}`,
    "",
    `> ${en.discipline}. ${en.presentazione}`,
    "",
    "## Chi è",
    ...it.bio.map((b) => `- ${b}`),
    "",
    "## Servizi",
    `- Animazione e spettacoli per: ${occasioniIn("it").join("; ")}.`,
    `- ${it.zona}`,
    `- Pagina: ${SITO_URL}${percorso("it", "eventi")}`,
    "",
    "## Opere",
    ...opereIn("it").map((o) => `- [${o.titolo}](${SITO_URL}${percorsoOpera("it", o.slug)}): ${o.sottotitolo}. ${o.sinossi}`),
    "",
    "## Contatti",
    `- Email: ${it.email}`,
    `- Telefono: ${it.telefono}`,
    `- Instagram: ${it.instagram}`,
    `- Modulo: ${SITO_URL}${percorso("it", "contatti")}`,
    "",
    "## Lingue del sito",
    `- Italiano: ${SITO_URL}${percorso("it", "home")}`,
    `- English: ${SITO_URL}${percorso("en", "home")}`,
    `- Français: ${SITO_URL}${percorso("fr", "home")}`,
    "",
  ];
  return new Response(righe.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
