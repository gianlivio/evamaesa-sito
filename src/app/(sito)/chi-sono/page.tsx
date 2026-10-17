import { ChiSono } from "@/viste/ChiSono";
import { meta } from "@/viste/meta";
import { dizionario } from "@/i18n/dizionario";

export const metadata = meta("it", "chiSono", dizionario("it").chiSono.titolo);

export default function Pagina() {
  return <ChiSono lingua="it" />;
}
