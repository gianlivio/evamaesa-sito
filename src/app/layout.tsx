import type { Metadata } from "next";
import "./globals.css";
import { Testata } from "@/components/Testata";
import { Piede } from "@/components/Piede";

export const metadata: Metadata = {
  title: {
    default: "Eva Maesa, clownesse e performer",
    template: "%s | Eva Maesa",
  },
  description:
    "Eva Maesa, alias MaEva: clown, trampoli, teatro di strada e teatrodanza. Animazione per feste ed eventi, spettacoli per piazze e festival, performance.",
  // anteprima: niente indicizzazione finché il sito non va online
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <a href="#contenuto" className="salta">
          Vai al contenuto
        </a>
        <Testata />
        <main id="contenuto">{children}</main>
        <Piede />
      </body>
    </html>
  );
}
