import { Eventi } from "@/viste/Eventi";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("en");
export const metadata = meta("en", "eventi", t.eventi.titolo, t.meta.eventiDescr);

export default function Pagina() {
  return <Eventi lingua="en" />;
}
