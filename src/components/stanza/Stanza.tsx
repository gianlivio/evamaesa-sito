"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import type { Opera } from "@/content/tipi";
import { Atrio, R, angoloSlot, type Porta } from "./Atrio";
import { SalaOpera, LATO, PARETI, impagina } from "./SalaOpera";
import { percorso, percorsoOpera, type Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";
import { Regia } from "./Regia";
import { OCCHI, fuocoSu, type Tema } from "./comune";
import { orchestra, type NomeBrano } from "./suono";

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

function useAspetto() {
  const [aspetto, setAspetto] = useState(16 / 9);
  useEffect(() => {
    const f = () => setAspetto(window.innerWidth / window.innerHeight);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return aspetto;
}

const CENTRO = new THREE.Vector3(0, OCCHI, 0);

export default function Stanza({ lingua, opere }: { lingua: Lingua; opere: Opera[] }) {
  const t = dizionario(lingua).stanza;
  const router = useRouter();
  const ridotto = useMovimentoRidotto();
  const aspetto = useAspetto();

  const porte: Porta[] = useMemo(
    () => opere.map(({ slug, titolo, sottotitolo, anno, pubblicoAdulto }) => ({ slug, titolo, sottotitolo, anno, pubblicoAdulto })),
    [opere],
  );
  const totaleAtrio = porte.length + 1;

  const yaw = useRef(0);
  const [modo, setModo] = useState<"atrio" | "opera">("atrio");
  const [slugAperta, setSlugAperta] = useState<string | null>(null);
  const [tema, setTema] = useState<Tema>("sala");
  const [buio, setBuio] = useState(false);
  const [sopra, setSopra] = useState<string | null>(null);
  const [settore, setSettore] = useState(0);
  const [scelta, setScelta] = useState<string | null>(null);
  const [conferma, setConferma] = useState<string | null>(null);
  const [fuocoId, setFuocoId] = useState<string | null>(null);
  const [aspettoVideo, setAspettoVideo] = useState(352 / 640);
  const [scatto, setScatto] = useState(0);
  const [trascinato, setTrascinato] = useState(false);
  const entra = useRef<HTMLButtonElement>(null);
  const orc = orchestra();
  const [audio, setAudio] = useState(orc.attivo);

  const opera = useMemo(() => opere.find((o) => o.slug === slugAperta) ?? null, [opere, slugAperta]);
  const imp = useMemo(() => (opera ? impagina(opera, aspettoVideo, lingua) : null), [opera, aspettoVideo, lingua]);
  const settori = modo === "atrio" ? totaleAtrio : 4;
  const passo = (Math.PI * 2) / settori;

  /* ---- camera ---- */

  const base = useMemo(() => {
    if (modo === "atrio" && scelta) {
      const a = angoloSlot(
        porte.findIndex((p) => p.slug === scelta),
        totaleAtrio,
      );
      return new THREE.Vector3(Math.sin(a) * R * 0.62, OCCHI, -Math.cos(a) * R * 0.62);
    }
    return CENTRO;
  }, [modo, scelta, porte, totaleAtrio]);

  const elementi = useMemo(() => (imp ? [imp.media, imp.testo, imp.dati, ...imp.foto] : []), [imp]);
  const fuoco = useMemo(() => {
    if (modo !== "opera" || !fuocoId) return null;
    const el = elementi.find((x) => x.id === fuocoId);
    return el ? fuocoSu(el.a, LATO, el.x, el.y, el.w, el.h, aspetto) : null;
  }, [modo, fuocoId, elementi, aspetto]);

  /* ---- sguardo ---- */

  const guarda = useCallback(
    (indice: number, n: number) => {
      // gira verso il settore scegliendo il verso più breve
      const p = (Math.PI * 2) / n;
      const corrente = Math.round(-yaw.current / p);
      const base = ((corrente % n) + n) % n;
      let delta = indice - base;
      if (delta > n / 2) delta -= n;
      if (delta < -n / 2) delta += n;
      yaw.current = -(corrente + delta) * p;
    },
    [],
  );

  const ruota = useCallback(
    (verso: 1 | -1) => {
      const corrente = Math.round(-yaw.current / passo);
      yaw.current = -(corrente + verso) * passo;
      setTrascinato(true);
    },
    [passo],
  );

  /* ---- transizioni ---- */

  const nelBuio = useCallback(
    (fai: () => void) => {
      if (ridotto) {
        fai();
        return;
      }
      setBuio(true);
      window.setTimeout(() => {
        fai();
        window.setTimeout(() => setBuio(false), 90);
      }, 300);
    },
    [ridotto],
  );

  const cambiaTema = useCallback(() => {
    orc.avvia();
    orc.effetto(tema === "sala" ? "leva-circo" : "leva-sala");
    nelBuio(() => setTema((t) => (t === "sala" ? "circo" : "sala")));
  }, [nelBuio, orc, tema]);

  const aggiornaUrl = (slug: string | null) => {
    const url = slug ? `${window.location.pathname}?opera=${slug}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  };

  const entraInSala = useCallback(
    (slug: string) => {
      nelBuio(() => {
        setModo("opera");
        setSlugAperta(slug);
        setScelta(null);
        setFuocoId(null);
        yaw.current = 0;
        setScatto((s) => s + 1);
        aggiornaUrl(slug);
      });
    },
    [nelBuio],
  );

  const varca = useCallback(
    (slug: string) => {
      orc.effetto("porta");
      setConferma(null);
      setScelta(slug);
      window.setTimeout(() => entraInSala(slug), ridotto ? 0 : 950);
    },
    [entraInSala, ridotto, orc],
  );

  const esci = useCallback(() => {
    const i = porte.findIndex((p) => p.slug === slugAperta);
    orc.effetto("uscita");
    nelBuio(() => {
      setModo("atrio");
      setSlugAperta(null);
      setFuocoId(null);
      yaw.current = -angoloSlot(Math.max(0, i), totaleAtrio);
      setScatto((s) => s + 1);
      aggiornaUrl(null);
    });
  }, [nelBuio, porte, slugAperta, totaleAtrio, orc]);

  const apriScheda = useCallback(() => {
    if (!opera) return;
    router.push(`${percorsoOpera(lingua, opera.slug)}${opera.pubblicoAdulto ? "?immagini=1" : ""}`);
  }, [opera, router, lingua]);

  const apri = useCallback(
    (indice: number) => {
      if (scelta) return;
      if (indice >= porte.length) {
        cambiaTema();
        return;
      }
      const p = porte[indice];
      guarda(indice, totaleAtrio);
      if (p.pubblicoAdulto) setConferma(p.slug);
      else varca(p.slug);
    },
    [porte, scelta, guarda, cambiaTema, varca, totaleAtrio],
  );

  const metti = useCallback(
    (id: string | null) => {
      if (!id) {
        setFuocoId(null);
        return;
      }
      const el = elementi.find((x) => x.id === id);
      if (el) guarda(PARETI.indexOf(el.a), 4);
      orc.effetto("pop");
      setFuocoId((corrente) => (corrente === id ? null : id));
      setTrascinato(true);
    },
    [elementi, guarda, orc],
  );

  // apertura diretta da un link /stanza?opera=...
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("opera");
    const p = porte.find((x) => x.slug === slug);
    if (!p) return;
    guarda(porte.indexOf(p), totaleAtrio);
    if (p.pubblicoAdulto) setConferma(p.slug);
    else entraInSala(p.slug);
    // solo al primo caricamento
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (conferma) entra.current?.focus();
  }, [conferma]);

  /* ---- suono ---- */

  useEffect(() => {
    // i browser sbloccano l'audio solo con certi gesti (Safari: clic e fine del tocco);
    // si riprova a ogni gesto finché il suono non è davvero attivo
    const eventi = ["pointerdown", "pointerup", "click", "touchend", "keydown"] as const;
    const avvia = () => orc.avvia();
    eventi.forEach((e) => window.addEventListener(e, avvia, { passive: true }));
    return () => {
      eventi.forEach((e) => window.removeEventListener(e, avvia));
      orc.ferma();
    };
  }, [orc]);

  useEffect(() => {
    const brani: string[] = ["girandola-amen", "gorgoglio", "animali-mai"];
    const nome: NomeBrano =
      modo === "atrio" ? (tema === "circo" ? "atrio-circo" : "atrio-sala") : brani.includes(slugAperta ?? "") ? (slugAperta as NomeBrano) : "atrio-sala";
    orc.suona(nome);
  }, [orc, modo, tema, slugAperta]);

  // quando il video parla, la musica si abbassa
  useEffect(() => {
    orc.abbassa(modo === "opera" && fuocoId === "media" && !!(opera?.teaser || opera?.youtube));
  }, [orc, modo, fuocoId, opera]);

  useEffect(() => {
    if (conferma) orc.effetto("campanello");
  }, [orc, conferma]);

  const cambiaAudio = () => {
    const si = !audio;
    setAudio(si);
    orc.setAttivo(si);
  };

  /* ---- foto ---- */

  const indiceFoto = fuocoId?.startsWith("foto-") ? Number(fuocoId.slice(5)) : -1;
  const nFoto = imp?.foto.length ?? 0;
  const sfoglia = useCallback(
    (verso: 1 | -1) => {
      if (indiceFoto < 0 || !nFoto) return;
      orc.effetto("sfoglia");
      setFuocoId(`foto-${(indiceFoto + verso + nFoto) % nFoto}`);
    },
    [indiceFoto, nFoto, orc],
  );

  /* ---- tastiera ---- */

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (conferma) {
        if (e.key === "Escape") setConferma(null);
        return;
      }
      if (e.key === "Escape" && modo === "opera") {
        if (fuocoId) setFuocoId(null);
        else esci();
        return;
      }
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const verso = e.key === "ArrowLeft" ? -1 : 1;
      if (indiceFoto >= 0) sfoglia(verso);
      else {
        setFuocoId(null);
        ruota(verso);
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [conferma, modo, fuocoId, esci, indiceFoto, sfoglia, ruota]);

  /* ---- trascinamento ---- */

  const trascina = useRef<{ x: number; attivo: boolean } | null>(null);
  const giu = (e: React.PointerEvent) => {
    trascina.current = { x: e.clientX, attivo: true };
  };
  const muovi = (e: React.PointerEvent) => {
    const t = trascina.current;
    if (!t?.attivo || scelta || fuocoId) return;
    const dx = e.clientX - t.x;
    t.x = e.clientX;
    yaw.current += dx * 0.0045;
    if (Math.abs(dx) > 2 && !trascinato) setTrascinato(true);
  };
  const su = () => {
    if (trascina.current) trascina.current.attivo = false;
  };

  useEffect(() => {
    document.body.style.cursor = sopra ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [sopra]);

  /* ---- interfaccia ---- */

  const portaInVista = modo === "atrio" && settore < porte.length ? porte[settore] : null;
  const operaConferma = porte.find((p) => p.slug === conferma);
  const fotoInFuoco = indiceFoto >= 0 && imp ? imp.foto[indiceFoto] : null;

  let didascalia: React.ReactNode;
  if (modo === "atrio") {
    didascalia = portaInVista ? (
      <>
        <strong>{portaInVista.titolo}</strong>
        <span>
          {portaInVista.sottotitolo}
          {portaInVista.pubblicoAdulto ? `. ${t.riservata}` : ""}
        </span>
        <button type="button" className="stanza-apri" onClick={() => apri(settore)} disabled={!!scelta}>
          {t.apriPorta}
        </button>
      </>
    ) : (
      <>
        <strong>{t.interruttore}</strong>
        <span>{t.interruttoreTesto}</span>
        <button type="button" className="stanza-apri" onClick={cambiaTema}>
          {tema === "sala" ? t.accendiCirco : t.tornaSala}
        </button>
      </>
    );
  } else if (opera && imp) {
    if (fotoInFuoco) {
      didascalia = (
        <>
          <strong>{t.foto(indiceFoto + 1, nFoto)}</strong>
          <span>
            {fotoInFuoco.media.alt}
            {fotoInFuoco.media.credito ? `. ${t.fotoDi} ${fotoInFuoco.media.credito}` : ""}
          </span>
          <button type="button" className="stanza-apri" onClick={() => setFuocoId(null)}>
            {t.allontanati}
          </button>
        </>
      );
    } else if (fuocoId) {
      didascalia = (
        <>
          <strong>{opera.titolo}</strong>
          <span>{fuocoId === "media" && opera.teaser ? t.videoAudio : fuocoId === "media" && opera.youtube ? "YouTube" : t.lettura}</span>
          <button type="button" className="stanza-apri" onClick={() => setFuocoId(null)}>
            {t.allontanati}
          </button>
        </>
      );
    } else {
      const azioni: [string, () => void][] = [
        [opera.teaser || opera.youtube ? t.azioni[0] : t.azioni[1], () => metti("media")],
        [t.azioni[2], () => metti("foto-0")],
        [t.azioni[3], () => metti("testo")],
        [t.azioni[4], apriScheda],
      ];
      const [etichetta, azione] = azioni[settore];
      const disattivo = (settore === 1 && nFoto === 0) || (settore === 0 && !opera.teaser && !opera.youtube && !imp.mediaImmagine);
      didascalia = (
        <>
          <strong>{opera.titolo}</strong>
          <span>{t.pareti[settore]}</span>
          <button type="button" className="stanza-apri" onClick={azione} disabled={disattivo}>
            {etichetta}
          </button>
        </>
      );
    }
  }

  const frecce = (verso: 1 | -1) => () => {
    if (indiceFoto >= 0) sfoglia(verso);
    else {
      setFuocoId(null);
      ruota(verso);
    }
  };

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
          camera={{ fov: 62, near: 0.05, far: 60, position: [0, OCCHI, 0] }}
          gl={{ antialias: true }}
          aria-hidden="true"
          fallback={
            <div className="stanza-ripiego">
              <p>{t.ripiego}</p>
              <Link href={percorso(lingua, "opere")}>{t.vaiElenco}</Link>
            </div>
          }
        >
          <Regia
            yaw={yaw}
            base={base}
            fuoco={fuoco}
            settori={settori}
            scatto={scatto}
            ridotto={ridotto}
            onSettore={setSettore}
          />
          <Suspense fallback={null}>
            {modo === "atrio" ? (
              <Atrio
                porte={porte}
                tema={tema}
                sopra={sopra}
                scelta={scelta}
                inConferma={conferma}
                ridotto={ridotto}
                onSopra={setSopra}
                onApri={apri}
                onLeva={cambiaTema}
                onClacson={() => orc.effetto("clacson")}
                lingua={lingua}
              />
            ) : opera && imp ? (
              <SalaOpera
                opera={opera}
                imp={imp}
                tema={tema}
                fuoco={fuocoId}
                onElemento={metti}
                onEsci={esci}
                onScheda={apriScheda}
                onAspettoVideo={setAspettoVideo}
                onSopra={(s) => setSopra(s ? "x" : null)}
                lingua={lingua}
                paretaInVista={settore}
              />
            ) : null}
          </Suspense>
        </Canvas>
      </div>

      <div className={`stanza-buio${buio ? " attivo" : ""}`} aria-hidden="true" />

      <header className="stanza-alto">
        <h1>{modo === "opera" && opera ? opera.titolo : t.titolo}</h1>
        <div className="stanza-comandi">
          <button type="button" className="stanza-pillola" aria-pressed={audio} onClick={cambiaAudio}>
            {audio ? t.suonoSi : t.suonoNo}
          </button>
          <button type="button" className="stanza-pillola" aria-pressed={tema === "circo"} onClick={cambiaTema}>
            {tema === "sala" ? t.accendiCirco : t.tornaSala}
          </button>
        </div>
      </header>

      {!trascinato ? (
        <p className="stanza-suggerimento" aria-hidden="true">
          {t.trascina}
        </p>
      ) : null}

      <div className="stanza-basso">
        <div className="stanza-fuoco" aria-live="polite">
          <button type="button" className="stanza-freccia" onClick={frecce(-1)} aria-label={indiceFoto >= 0 ? t.precedente : t.sinistra}>
            ‹
          </button>
          <div className="stanza-didascalia">{didascalia}</div>
          <button type="button" className="stanza-freccia" onClick={frecce(1)} aria-label={indiceFoto >= 0 ? t.successiva : t.destra}>
            ›
          </button>
        </div>

        <div className="stanza-uscite">
          {modo === "opera" ? (
            <button type="button" className="stanza-esci" onClick={esci}>
              {t.tornaStanza}
            </button>
          ) : null}
          <Link href={percorso(lingua, "opere")} className="stanza-esci">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v15M5 12l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.tornaSito}
          </Link>
        </div>
      </div>

      {/* contenuti per chi usa lettori di schermo */}
      <div className="sr-only">
        {modo === "atrio" ? (
          <nav aria-label={t.porte}>
            <ul>
              {porte.map((p) => (
                <li key={p.slug}>
                  <Link href={percorsoOpera(lingua, p.slug)}>
                    {p.titolo}
                    {p.pubblicoAdulto ? `, ${t.riservata}` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : opera ? (
          <article>
            <h2>{opera.titolo}</h2>
            <p>{opera.sinossi}</p>
            {opera.testo.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <Link href={percorsoOpera(lingua, opera.slug)}>{t.schedaCompleta}</Link>
          </article>
        ) : null}
      </div>

      {operaConferma ? (
        <div className="stanza-velo" role="dialog" aria-modal="true" aria-labelledby="conferma-titolo">
          <div className="stanza-conferma">
            <p id="conferma-titolo" className="stanza-conferma-titolo">
              {operaConferma.titolo}
            </p>
            <p>{t.conferma}</p>
            <div className="stanza-conferma-azioni">
              <button ref={entra} type="button" className="bottone" onClick={() => varca(operaConferma.slug)}>
                {t.entra}
              </button>
              <button type="button" className="bottone secondario" onClick={() => setConferma(null)}>
                {t.resta}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
