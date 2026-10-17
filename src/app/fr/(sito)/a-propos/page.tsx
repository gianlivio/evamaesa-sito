import { ChiSono } from "@/viste/ChiSono";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

export const metadata = meta("fr", "chiSono", dizionario("fr").chiSono.titolo);

export default function Pagina() {
  return <ChiSono lingua="fr" />;
}
