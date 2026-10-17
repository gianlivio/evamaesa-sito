import { Eventi } from "@/viste/Eventi";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("it");
export const metadata = meta("it", "eventi", t.eventi.titolo, t.meta.eventiDescr);

export default function Pagina() {
  return <Eventi lingua="it" />;
}
