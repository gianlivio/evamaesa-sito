import { Opere } from "@/viste/Opere";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("it");
export const metadata = meta("it", "opere", t.opere.titolo, t.meta.opereDescr);

export default function Pagina() {
  return <Opere lingua="it" />;
}
