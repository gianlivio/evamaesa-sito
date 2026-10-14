"use client";

import dynamic from "next/dynamic";
import type { Porta } from "./Scena";

/* La scena (three.js) si scarica solo quando si entra nella stanza, mai nel resto del sito. */
const Stanza = dynamic(() => import("./Stanza"), {
  ssr: false,
  loading: () => (
    <div className="stanza-attesa" role="status">
      Sto aprendo la stanza
    </div>
  ),
});

export function Caricatore({ porte }: { porte: Porta[] }) {
  return <Stanza porte={porte} />;
}
