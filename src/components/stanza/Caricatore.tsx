"use client";

import dynamic from "next/dynamic";
import type { Opera } from "@/content/tipi";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

/* La scena (three.js) si scarica solo quando si entra nella stanza, mai nel resto del sito. */
const Stanza = dynamic(() => import("./Stanza"), { ssr: false });

export function Caricatore({ lingua, opere }: { lingua: Lingua; opere: Opera[] }) {
  return (
    <>
      {/* resta sotto la scena, che a schermo intero la copre quando è pronta */}
      <div className="stanza-attesa" role="status">
        {dizionario(lingua).stanza.apertura}
      </div>
      <Stanza lingua={lingua} opere={opere} />
    </>
  );
}
