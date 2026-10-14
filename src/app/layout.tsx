import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
