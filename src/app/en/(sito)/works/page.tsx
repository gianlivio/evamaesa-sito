import { Opere } from "@/viste/Opere";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("en");
export const metadata = meta("en", "opere", t.opere.titolo, t.meta.opereDescr);

export default function Pagina() {
  return <Opere lingua="en" />;
}
