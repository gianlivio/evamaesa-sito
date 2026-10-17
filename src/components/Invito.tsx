"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { percorso, riconosci, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

/* Invito al contatto in fondo a ogni pagina, tranne che in Contatti dove sarebbe un doppione. */
export function Invito({ lingua }: { lingua: Lingua }) {
  const t = dizionario(lingua).piede;
  if (riconosci(usePathname()).sezione === "contatti") return null;
  return (
    <>
      <p className="invito">{t.invito}</p>
      <Link href={percorso(lingua, "contatti")} className="bottone">
        {t.scrivimi}
      </Link>
    </>
  );
}
