"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const voci = [
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/eventi", label: "Feste ed eventi" },
  { href: "/opere", label: "Opere" },
  { href: "/contatti", label: "Contatti" },
];

export function Testata() {
  const percorso = usePathname();
  return (
    <header className="contenitore testata">
      <Link href="/" className="marchio" aria-label="Eva Maesa, pagina iniziale">
        Eva Maesa<span className="naso" aria-hidden="true" />
      </Link>
      <nav className="navigazione" aria-label="Principale">
        <ul>
          {voci.map((v) => {
            const attiva = percorso === v.href || percorso.startsWith(v.href + "/");
            return (
              <li key={v.href}>
                <Link href={v.href} aria-current={attiva ? "page" : undefined}>
                  {v.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
