"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINGUE, NOMI_LINGUE, equivalente, percorso, riconosci, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export function Testata({ lingua }: { lingua: Lingua }) {
  const pathname = usePathname();
  const t = dizionario(lingua).nav;
  const attuale = riconosci(pathname).sezione;
  const voci = [
    { sezione: "chiSono", label: t.chiSono },
    { sezione: "eventi", label: t.eventi },
    { sezione: "opere", label: t.opere },
    { sezione: "contatti", label: t.contatti },
  ] as const;

  return (
    <header className="contenitore testata">
      <Link href={percorso(lingua, "home")} className="marchio" aria-label={t.home}>
        Eva Maesa<span className="naso" aria-hidden="true" />
      </Link>
      <nav className="navigazione" aria-label={t.principale}>
        <ul>
          {voci.map((v) => (
            <li key={v.sezione}>
              <Link href={percorso(lingua, v.sezione)} aria-current={attuale === v.sezione ? "page" : undefined}>
                {v.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={percorso(lingua, "stanza")} className="voce-stanza">
              {t.stanza}
            </Link>
          </li>
        </ul>
        <ul className="lingue" aria-label={t.lingua}>
          {LINGUE.map((l) => (
            <li key={l}>
              <a
                href={equivalente(pathname, l)}
                hrefLang={l}
                lang={l}
                aria-current={l === lingua ? "true" : undefined}
                title={NOMI_LINGUE[l]}
              >
                {l.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
