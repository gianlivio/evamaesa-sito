import type { Metadata } from "next";
import "./globals.css";
import { dizionario } from "@/i18n/dizionario";
import { ONLINE, SITO_URL } from "@/i18n/sito";

const t = dizionario("it").meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITO_URL),
  title: { default: t.titolo, template: "%s | Eva Maesa" },
  description: t.descrizione,
  applicationName: "Eva Maesa",
  authors: [{ name: "Eva Maesa" }],
  creator: "Eva Maesa",
  // in anteprima resta fuori dai motori di ricerca; vedi src/i18n/sito.ts
  robots: ONLINE ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: false },
};

/* La lingua del documento è l'italiano; le sezioni /en e /fr la aggiornano (vedi viste/Sito.tsx). */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
