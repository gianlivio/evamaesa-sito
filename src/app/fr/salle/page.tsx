import { opereIn } from "@/content/opere";
import { Caricatore } from "@/components/stanza/Caricatore";
import { ImpostaLingua } from "@/viste/Sito";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("fr");
export const metadata = meta("fr", "stanza", t.stanza.titolo, t.meta.stanzaDescr);

export default function Pagina() {
  return (
    <div lang="fr">
      <ImpostaLingua lingua="fr" />
      <Caricatore lingua="fr" opere={opereIn("fr")} />
    </div>
  );
}
