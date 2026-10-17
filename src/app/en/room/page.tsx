import { opereIn } from "@/content/opere";
import { Caricatore } from "@/components/stanza/Caricatore";
import { ImpostaLingua } from "@/viste/Sito";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("en");
export const metadata = meta("en", "stanza", t.stanza.titolo, t.meta.stanzaDescr);

export default function Pagina() {
  return (
    <div lang="en">
      <ImpostaLingua lingua="en" />
      <Caricatore lingua="en" opere={opereIn("en")} />
    </div>
  );
}
