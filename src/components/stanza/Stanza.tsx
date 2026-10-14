"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Scena, type Porta, type Tema } from "./Scena";

function useMovimentoRidotto() {
  const [ridotto, setRidotto] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRidotto(mq.matches);
    const f = () => setRidotto(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return ridotto;
}

export default function Stanza({ porte }: { porte: Porta[] }) {
  const router = useRouter();
  const ridotto = useMovimentoRidotto();
  const totale = porte.length + 1;
  const passo = (Math.PI * 2) / totale;

  const yaw = useRef(0);
  const [tema, setTema] = useState<Tema>("sala");
  const [buio, setBuio] = useState(false);
  const [sopra, setSopra] = useState<string | null>(null);
  const [fuoco, setFuoco] = useState(0);
  const [scelta, setScelta] = useState<string | null>(null);
  const [conferma, setConferma] = useState<string | null>(null);
  const [trascinato, setTrascinato] = useState(false);
  const entra = useRef<HTMLButtonElement>(null);

  /* ---- sguardo ---- */

  const guarda = useCallback(
    (indice: number) => {
      // gira verso lo slot scegliendo il verso più breve
      const corrente = Math.round(-yaw.current / passo);
      const base = ((corrente % totale) + totale) % totale;
      let delta = indice - base;
      if (delta > totale / 2) delta -= totale;
      if (delta < -totale / 2) delta += totale;
      yaw.current = -(corrente + delta) * passo;
    },
    [passo, totale],
  );

  const ruota = useCallback(
    (verso: 1 | -1) => {
      const corrente = Math.round(-yaw.current / passo);
      yaw.current = -(corrente + verso) * passo;
      setTrascinato(true);
    },
    [passo],
  );

  /* ---- azioni ---- */

  const cambiaTema = useCallback(() => {
    const nuovo: Tema = tema === "sala" ? "circo" : "sala";
    if (ridotto) {
      setTema(nuovo);
      return;
    }
    setBuio(true);
    window.setTimeout(() => {
      setTema(nuovo);
      window.setTimeout(() => setBuio(false), 60);
    }, 260);
  }, [tema, ridotto]);

  const varca = useCallback(
    (slug: string) => {
      const adulto = porte.find((p) => p.slug === slug)?.pubblicoAdulto;
      setConferma(null);
      setScelta(slug);
      const dest = `/opere/${slug}${adulto ? "?immagini=1" : ""}`;
      window.setTimeout(() => router.push(dest), ridotto ? 0 : 1100);
    },
    [router, ridotto, porte],
  );

  const apri = useCallback(
    (indice: number) => {
      if (scelta) return;
      if (indice >= porte.length) {
        cambiaTema();
        return;
      }
      const p = porte[indice];
      guarda(indice);
      if (p.pubblicoAdulto) setConferma(p.slug);
      else varca(p.slug);
    },
    [porte, scelta, guarda, cambiaTema, varca],
  );

  useEffect(() => {
    if (conferma) entra.current?.focus();
  }, [conferma]);

  /* ---- tastiera ---- */

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (conferma) {
        if (e.key === "Escape") setConferma(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        ruota(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        ruota(1);
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [conferma, ruota]);

  /* ---- trascinamento ---- */

  const trascina = useRef<{ x: number; attivo: boolean } | null>(null);
  const giu = (e: React.PointerEvent) => {
    trascina.current = { x: e.clientX, attivo: true };
  };
  const muovi = (e: React.PointerEvent) => {
    const t = trascina.current;
    if (!t?.attivo || scelta) return;
    const dx = e.clientX - t.x;
    t.x = e.clientX;
    yaw.current += dx * 0.0045;
    if (Math.abs(dx) > 2 && !trascinato) setTrascinato(true);
  };
  const su = () => {
    if (trascina.current) trascina.current.attivo = false;
  };

  /* ---- cursore ---- */

  useEffect(() => {
    document.body.style.cursor = sopra ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [sopra]);

  const inFuoco = fuoco < porte.length ? porte[fuoco] : null;
  const operaConferma = porte.find((p) => p.slug === conferma);

  return (
    <div className={`stanza stanza-${tema}`}>
      <div
        className="stanza-tela"
        onPointerDown={giu}
        onPointerMove={muovi}
        onPointerUp={su}
        onPointerLeave={su}
        onPointerCancel={su}
      >
        <Canvas
          dpr={[1, 1.75]}
          camera={{ fov: 62, near: 0.05, far: 60, position: [0, 1.6, 0] }}
          gl={{ antialias: true }}
          aria-hidden="true"
          fallback={
            <div className="stanza-ripiego">
              <p>Il tuo browser non riesce a mostrare la stanza 3D. Le opere sono tutte nell’elenco.</p>
              <Link href="/opere">Vai all’elenco delle opere</Link>
            </div>
          }
        >
          <Scena
            porte={porte}
            tema={tema}
            yaw={yaw}
            sopra={sopra}
            scelta={scelta}
            inConferma={conferma}
            ridotto={ridotto}
            onSopra={setSopra}
            onFuoco={setFuoco}
            onApri={apri}
            onLeva={cambiaTema}
          />
        </Canvas>
      </div>

      <div className={`stanza-buio${buio ? " attivo" : ""}`} aria-hidden="true" />

      {/* ---- interfaccia sopra la scena ---- */}

      <header className="stanza-alto">
        <h1>La stanza</h1>
        <button type="button" className="stanza-pillola" aria-pressed={tema === "circo"} onClick={cambiaTema}>
          {tema === "sala" ? "Accendi il circo" : "Torna in sala"}
        </button>
      </header>

      {!trascinato ? (
        <p className="stanza-suggerimento" aria-hidden="true">
          Trascina per guardarti intorno
        </p>
      ) : null}

      <div className="stanza-basso">
        <div className="stanza-fuoco" aria-live="polite">
          <button type="button" className="stanza-freccia" onClick={() => ruota(-1)} aria-label="Guarda a sinistra">
            ‹
          </button>
          <div className="stanza-didascalia">
            {inFuoco ? (
              <>
                <strong>{inFuoco.titolo}</strong>
                <span>
                  {inFuoco.sottotitolo}
                  {inFuoco.pubblicoAdulto ? ". Riservata a un pubblico adulto" : ""}
                </span>
                <button type="button" className="stanza-apri" onClick={() => apri(fuoco)} disabled={!!scelta}>
                  Apri la porta
                </button>
              </>
            ) : (
              <>
                <strong>Interruttore</strong>
                <span>Cambia la stanza tra sala e circo</span>
                <button type="button" className="stanza-apri" onClick={cambiaTema}>
                  {tema === "sala" ? "Accendi il circo" : "Torna in sala"}
                </button>
              </>
            )}
          </div>
          <button type="button" className="stanza-freccia" onClick={() => ruota(1)} aria-label="Guarda a destra">
            ›
          </button>
        </div>

        <Link href="/opere" className="stanza-esci">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 4v15M5 12l7 7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Torna al sito
        </Link>
      </div>

      {/* elenco delle porte per chi usa lettori di schermo */}
      <nav className="sr-only" aria-label="Porte della stanza">
        <ul>
          {porte.map((p) => (
            <li key={p.slug}>
              <Link href={`/opere/${p.slug}`}>
                {p.titolo}
                {p.pubblicoAdulto ? ", riservata a un pubblico adulto" : ""}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {operaConferma ? (
        <div className="stanza-velo" role="dialog" aria-modal="true" aria-labelledby="conferma-titolo">
          <div className="stanza-conferma">
            <p id="conferma-titolo" className="stanza-conferma-titolo">
              {operaConferma.titolo}
            </p>
            <p>Dietro questa porta c’è un’opera riservata a un pubblico adulto. Le immagini contengono nudo.</p>
            <div className="stanza-conferma-azioni">
              <button ref={entra} type="button" className="bottone" onClick={() => varca(operaConferma.slug)}>
                Entra
              </button>
              <button type="button" className="bottone secondario" onClick={() => setConferma(null)}>
                Resta nella stanza
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
