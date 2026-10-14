import type { Metadata } from "next";
import { opere } from "@/content/opere";
import { Caricatore } from "@/components/stanza/Caricatore";

export const metadata: Metadata = {
  title: "La stanza",
  description: "Le opere di Eva Maesa in una stanza da esplorare: ogni porta è uno spettacolo o una performance.",
};

export default function PaginaStanza() {
  // stesso ordine dell'elenco opere
  const porte = [...opere]
    .sort((a, b) => (b.anno ?? 0) - (a.anno ?? 0))
    .map(({ slug, titolo, sottotitolo, anno, pubblicoAdulto }) => ({ slug, titolo, sottotitolo, anno, pubblicoAdulto }));

  return <Caricatore porte={porte} />;
}
