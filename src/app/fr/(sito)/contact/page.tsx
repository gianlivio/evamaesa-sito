import { Contatti, type ParametriContatti } from "@/viste/Contatti";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

export const metadata = meta("fr", "contatti", dizionario("fr").contatti.titolo);

export default function Pagina(p: ParametriContatti) {
  return <Contatti lingua="fr" searchParams={p.searchParams} />;
}
