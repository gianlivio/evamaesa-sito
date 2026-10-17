"use client";

import dynamic from "next/dynamic";
import type { Opera } from "@/content/tipi";

/* La scena (three.js) si scarica solo quando si entra nella stanza, mai nel resto del sito. */
const Stanza = dynamic(() => import("./Stanza"), {
  ssr: false,
  loading: () => (
    <div className="stanza-attesa" role="status">
      Sto aprendo la stanza
    </div>
  ),
});

export function Caricatore({ opere }: { opere: Opera[] }) {
  return <Stanza opere={opere} />;
}
