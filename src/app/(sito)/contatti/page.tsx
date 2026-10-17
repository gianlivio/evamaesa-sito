import { Contatti, type ParametriContatti } from "@/viste/Contatti";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

export const metadata = meta("it", "contatti", dizionario("it").contatti.titolo);

export default function Pagina(p: ParametriContatti) {
  return <Contatti lingua="it" searchParams={p.searchParams} />;
}
