import { Testata } from "@/components/Testata";
import { Piede } from "@/components/Piede";

/* Impaginato del sito minimale. La stanza 3D (/stanza) ne resta fuori e occupa tutto lo schermo. */
export default function LayoutSito({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenuto" className="salta">
        Vai al contenuto
      </a>
      <Testata />
      <main id="contenuto">{children}</main>
      <Piede />
    </>
  );
}
