import { opereIn } from "@/content/opere";
import { Caricatore } from "@/components/stanza/Caricatore";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("it");
export const metadata = meta("it", "stanza", t.stanza.titolo, t.meta.stanzaDescr);

export default function Pagina() {
  return (
    <div lang="it">
      <Caricatore lingua="it" opere={opereIn("it")} />
    </div>
  );
}
