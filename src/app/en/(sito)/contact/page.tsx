import { Contatti, type ParametriContatti } from "@/viste/Contatti";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

export const metadata = meta("en", "contatti", dizionario("en").contatti.titolo);

export default function Pagina(p: ParametriContatti) {
  return <Contatti lingua="en" searchParams={p.searchParams} />;
}
