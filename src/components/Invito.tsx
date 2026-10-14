"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* Invito al contatto in fondo a ogni pagina, tranne che in Contatti dove sarebbe un doppione. */
export function Invito() {
  if (usePathname() === "/contatti") return null;
  return (
    <>
      <p className="invito">Una festa, una piazza, un festival: raccontami cosa hai in mente.</p>
      <Link href="/contatti" className="bottone">
        Scrivimi
      </Link>
    </>
  );
}
