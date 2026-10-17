import { Home } from "@/viste/Home";
import { meta } from "@/viste/meta";

export const metadata = meta("en", "home");

export default function Pagina() {
  return <Home lingua="en" />;
}
