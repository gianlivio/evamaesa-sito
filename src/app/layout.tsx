import type { Metadata } from "next";
import "./globals.css";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("it").meta;

export const metadata: Metadata = {
  title: { default: t.titolo, template: "%s | Eva Maesa" },
  description: t.descrizione,
  // anteprima: niente indicizzazione finché il sito non va online
  robots: { index: false, follow: false },
};

/* La lingua del documento è l'italiano; le sezioni /en e /fr la aggiornano (vedi viste/Sito.tsx). */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
