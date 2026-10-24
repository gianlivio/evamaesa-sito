"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { type ThreeEvent } from "@react-three/fiber";
import { Html, Text, useTexture } from "@react-three/drei";
import { urlYouTube } from "@/components/YouTube";
import * as THREE from "three";
import type { Media, Opera } from "@/content/tipi";
import { FONT_TESTO, FONT_TITOLI, suParete } from "./comune";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

/*
 * Sala quadrata dedicata a un'opera. Pareti, viste dal centro:
 *   0 (davanti)   titolo e video, o copertina
 *   1 (destra)    foto
 *   2 (dietro)    testi, dati e crediti
 *   3 (sinistra)  porta per tornare nell'atrio e targa della scheda completa
 */

export const LATO = 5.5; // metà lato della sala
const ALTEZZA = 5;
export const PARETI = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];

export type Elemento = { id: string; a: number; x: number; y: number; w: number; h: number };

export type Impaginato = {
  media: Elemento;
  mediaImmagine?: Media; // copertina sulla parete 0 quando non c'è video
  foto: (Elemento & { media: Media })[];
  testo: Elemento;
  dati: Elemento;
};

/*
 * Video YouTube sulla parete: un iframe vero, posato nella scena 3D con una trasformazione CSS.
 * drei usa 400 / distanceFactor pixel per metro: il fattore si ricava dalla larghezza voluta.
 * Il lettore compare solo quando la parete è in vista, perché l'HTML non viene coperto dalla scena.
 */
function VideoYouTube({ el, id, titolo, visibile }: { el: Elemento; id: string; titolo: string; visibile: boolean }) {
  const { position, rotation } = suParete(el.a, LATO - 0.03);
  const px = 640;
  const pxAltezza = Math.round((px * el.h) / el.w);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[el.x, el.y, 0.01]}>
        <planeGeometry args={[el.w + 0.14, el.h + 0.14]} />
        <meshStandardMaterial color="#0b0c18" roughness={0.4} />
      </mesh>
      {visibile ? (
        <Html transform distanceFactor={(400 * el.w) / px} position={[el.x, el.y, 0.03]} zIndexRange={[1, 0]}>
          <iframe
            src={urlYouTube(id)}
            title={titolo}
            width={px}
            height={pxAltezza}
            style={{ border: 0, display: "block" }}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </Html>
      ) : null}
    </group>
  );
}

/** Stima l'altezza di un blocco di testo per impilare i blocchi sulla parete. */
function altezzaTesto(testo: string, corpo: number, larghezza: number, interlinea: number, em = 0.5) {
  const perRiga = Math.max(1, Math.floor(larghezza / (corpo * em)));
  const righe = testo.split("\n").reduce((n, p) => n + Math.max(1, Math.ceil(p.length / perRiga)), 0);
  return righe * corpo * interlinea;
}

// misure dei testi sulla parete 2, condivise da impaginazione e disegno
export const T = { sinossi: 0.19, testo: 0.098, etichetta: 0.08, valore: 0.11, margine: 0.3, cima: 4.0 };

export function vociDati(opera: Opera, lingua: Lingua): [string, string][] {
  const t = dizionario(lingua).scheda;
  return [
    ...(opera.durata ? [[t.durata, opera.durata] as [string, string]] : []),
    ...(opera.formato ? [[t.formato, opera.formato] as [string, string]] : []),
    ...(opera.lingua ? [[t.lingua, opera.lingua] as [string, string]] : []),
    ...opera.crediti.map((c) => [c.ruolo, c.nome] as [string, string]),
  ];
}

export function altezzaVoce(valore: string, larghezza: number) {
  return T.etichetta * 1.5 + altezzaTesto(valore, T.valore, larghezza, 1.35) + 0.14;
}

export function impagina(opera: Opera, aspettoVideo: number, lingua: Lingua): Impaginato {
  const hMedia = 2.6;
  const media: Elemento = {
    id: "media",
    a: PARETI[0],
    x: 0,
    y: 0.45 + hMedia / 2,
    w: opera.teaser ? hMedia * aspettoVideo : opera.youtube ? (hMedia * 16) / 9 : 3.6,
    h: hMedia,
  };
  // se sulla parete 0 c'è un video, la copertina va con le altre foto
  const haVideo = !!(opera.teaser || opera.youtube);
  const immagini = haVideo ? [opera.copertina, ...opera.galleria] : opera.galleria;
  const immaginiConFile = immagini.filter((m) => m.src);

  const n = immaginiConFile.length;
  const righe = n <= 3 ? 1 : n <= 8 ? 2 : 3;
  const colonne = Math.max(1, Math.ceil(n / righe));
  const larghezza = 9.6;
  const altezza = righe === 1 ? 2.5 : righe === 2 ? 3.2 : 3.5;
  const base = righe === 1 ? 0.9 : 0.45;
  const cw = larghezza / colonne;
  const ch = altezza / righe;
  const nUltima = n - colonne * (righe - 1);

  const foto = immaginiConFile.map((m, i) => {
    const riga = Math.floor(i / colonne);
    const col = i % colonne;
    const scostamento = riga === righe - 1 ? ((colonne - nUltima) * cw) / 2 : 0;
    return {
      id: `foto-${i}`,
      a: PARETI[1],
      x: -larghezza / 2 + cw * (col + 0.5) + scostamento,
      y: base + altezza - ch * (riga + 0.5),
      w: cw - 0.28,
      h: ch - 0.28,
      media: m,
    };
  });

  // i pannelli dei testi si adattano al contenuto
  const lT = 6.6 - 2 * T.margine;
  const hTesti =
    altezzaTesto(opera.sinossi, T.sinossi, lT, 1.25) + 0.22 + altezzaTesto(opera.testo.join("\n\n"), T.testo, lT, 1.5);
  const hDati = vociDati(opera, lingua).reduce((h, [, v]) => h + altezzaVoce(v, 3.2 - 0.5), 0);
  const hPannelli = Math.min(3.6, Math.max(1.6, Math.max(hTesti, hDati) + 2 * T.margine));

  return {
    media,
    mediaImmagine: haVideo ? undefined : opera.copertina.src ? opera.copertina : undefined,
    foto,
    testo: { id: "testo", a: PARETI[2], x: -1.45, y: T.cima - hPannelli / 2, w: 6.6, h: hPannelli },
    dati: { id: "dati", a: PARETI[2], x: 3.4, y: T.cima - hPannelli / 2, w: 3.2, h: hPannelli },
  };
}

/* ---------- Pezzi ---------- */

// inchiostro dei testi
const INCHIOSTRO = "#1e2240";

type Clic = (e: ThreeEvent<MouseEvent>) => void;

function cliccabile(azione: () => void): Clic {
  return (e) => {
    e.stopPropagation();
    if (e.delta > 6) return; // era un trascinamento
    azione();
  };
}

function Quadro({
  el,
  texture,
  onClick,
  onSopra,
}: {
  el: Elemento;
  texture: THREE.Texture;
  onClick: Clic;
  onSopra: (s: boolean) => void;
}) {
  const img = texture.image as { width: number; height: number };
  const ar = img.width / img.height;
  const [pw, ph] = ar > el.w / el.h ? [el.w, el.w / ar] : [el.h * ar, el.h];
  const { position, rotation } = suParete(el.a, LATO - 0.02);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[el.x, el.y, 0.01]}>
        <planeGeometry args={[pw + 0.1, ph + 0.1]} />
        <meshStandardMaterial color="#14162a" roughness={0.6} />
      </mesh>
      <mesh
        position={[el.x, el.y, 0.02]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          onSopra(true);
        }}
        onPointerOut={() => onSopra(false)}
      >
        <planeGeometry args={[pw, ph]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Video({
  el,
  src,
  audio,
  onAspetto,
  onClick,
  onSopra,
}: {
  el: Elemento;
  src: string;
  audio: boolean;
  onAspetto: (a: number) => void;
  onClick: Clic;
  onSopra: (s: boolean) => void;
}) {
  const anteprima = useTexture(src.replace(/\.mp4$/, ".jpg"), (t) => {
    (t as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
  }) as THREE.Texture;
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);
  const [scorre, setScorre] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /*
   * Il video sta nel documento (nascosto) con autoplay, muted e playsinline impostati
   * prima della sorgente: è la combinazione che Chrome, Firefox e Safari, anche su iPhone,
   * accettano per l'avvio automatico senza clic.
   */
  useEffect(() => {
    const v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.autoplay = true;
    v.playsInline = true;
    v.preload = "auto";
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("aria-hidden", "true");
    Object.assign(v.style, { position: "fixed", left: "0", top: "0", width: "2px", height: "2px", opacity: "0", pointerEvents: "none" });
    v.src = src;
    document.body.appendChild(v);
    videoRef.current = v;

    const t = new THREE.VideoTexture(v);
    t.colorSpace = THREE.SRGBColorSpace;
    setTexture(t);

    const meta = () => v.videoWidth && onAspetto(v.videoWidth / v.videoHeight);
    const via = () => {
      if (v.currentTime > 0 || !v.paused) setScorre(true);
    };
    const prova = () => {
      if (v.paused) v.play().catch(() => {});
    };
    v.addEventListener("loadedmetadata", meta);
    v.addEventListener("playing", via);
    v.addEventListener("timeupdate", via);
    v.addEventListener("canplay", prova);
    prova();
    // se il browser blocca l'avvio automatico, parte al primo gesto nella pagina
    window.addEventListener("pointerdown", prova);
    window.addEventListener("keydown", prova);
    window.addEventListener("touchstart", prova);

    return () => {
      v.removeEventListener("loadedmetadata", meta);
      v.removeEventListener("playing", via);
      v.removeEventListener("timeupdate", via);
      v.removeEventListener("canplay", prova);
      window.removeEventListener("pointerdown", prova);
      window.removeEventListener("keydown", prova);
      window.removeEventListener("touchstart", prova);
      v.pause();
      v.removeAttribute("src");
      v.load();
      v.remove();
      t.dispose();
      videoRef.current = null;
    };
  }, [src, onAspetto]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !audio;
    v.play().catch(() => {});
  }, [audio, texture]);

  const { position, rotation } = suParete(el.a, LATO - 0.02);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[el.x, el.y, 0.01]}>
        <planeGeometry args={[el.w + 0.14, el.h + 0.14]} />
        <meshStandardMaterial color="#0b0c18" roughness={0.4} />
      </mesh>
      <mesh
        position={[el.x, el.y, 0.02]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          onSopra(true);
        }}
        onPointerOut={() => onSopra(false)}
      >
        <planeGeometry args={[el.w, el.h]} />
        <meshBasicMaterial key={scorre && texture ? "video" : "anteprima"} map={scorre && texture ? texture : anteprima} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Testi({
  opera,
  imp,
  lingua,
  onClick,
  onSopra,
}: {
  lingua: Lingua;
  opera: Opera;
  imp: Impaginato;
  onClick: (id: string) => Clic;
  onSopra: (s: boolean) => void;
}) {
  const inchiostro = INCHIOSTRO;
  const tenue = "#5a5e7a";
  const fondo = "#f6f4fb";
  const { position, rotation } = suParete(PARETI[2], LATO - 0.02);

  const t = imp.testo;
  const larghezzaT = t.w - 2 * T.margine;
  const sinistra = t.x - t.w / 2 + T.margine;
  const cima = t.y + t.h / 2 - T.margine;
  const corpoS = T.sinossi;
  const hSinossi = altezzaTesto(opera.sinossi, corpoS, larghezzaT, 1.25);

  const d = imp.dati;
  const voci = vociDati(opera, lingua);
  let yDati = d.y + d.h / 2 - T.margine;
  const larghezzaD = d.w - 0.5;

  const pannello = (el: Elemento) => (
    <mesh
      position={[el.x, el.y, 0.01]}
      onClick={onClick(el.id)}
      onPointerOver={(e) => {
        e.stopPropagation();
        onSopra(true);
      }}
      onPointerOut={() => onSopra(false)}
    >
      <planeGeometry args={[el.w, el.h]} />
      <meshStandardMaterial color={fondo} roughness={0.9} />
    </mesh>
  );

  return (
    <group position={position} rotation={rotation}>
      {pannello(t)}
      <Text
        font={FONT_TITOLI}
        fontSize={corpoS}
        lineHeight={1.25}
        maxWidth={larghezzaT}
        color={inchiostro}
        anchorX="left"
        anchorY="top"
        position={[sinistra, cima, 0.02]}
      >
        {opera.sinossi}
      </Text>
      <Text
        font={FONT_TESTO}
        fontSize={T.testo}
        lineHeight={1.5}
        maxWidth={larghezzaT}
        color={inchiostro}
        anchorX="left"
        anchorY="top"
        position={[sinistra, cima - hSinossi - 0.22, 0.02]}
      >
        {opera.testo.join("\n\n")}
      </Text>

      {pannello(d)}
      {voci.map(([etichetta, valore], i) => {
        const y = yDati;
        yDati -= altezzaVoce(valore, larghezzaD);
        return (
          <group key={i}>
            <Text
              font={FONT_TESTO}
              fontSize={T.etichetta}
              color={tenue}
              anchorX="left"
              anchorY="top"
              position={[d.x - d.w / 2 + 0.25, y, 0.02]}
            >
              {etichetta}
            </Text>
            <Text
              font={FONT_TESTO}
              fontSize={T.valore}
              lineHeight={1.35}
              maxWidth={larghezzaD}
              color={inchiostro}
              anchorX="left"
              anchorY="top"
              position={[d.x - d.w / 2 + 0.25, y - T.etichetta * 1.5, 0.02]}
            >
              {valore}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function Uscita({
  testi,
  onEsci,
  onScheda,
  onSopra,
}: {
  testi: { torna: string; targa: string };
  onEsci: () => void;
  onScheda: () => void;
  onSopra: (s: boolean) => void;
}) {
  const { position, rotation } = suParete(PARETI[3], LATO - 0.02);
  const cornice = "#1e2240";
  const inchiostro = INCHIOSTRO;
  const hover = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      onSopra(true);
    },
    onPointerOut: () => onSopra(false),
  };
  return (
    <group position={position} rotation={rotation}>
      {/* porta verso l'atrio, socchiusa sulla luce */}
      <mesh position={[0, 1.15, 0.005]}>
        <planeGeometry args={[1.15, 2.3]} />
        <meshBasicMaterial color="#f3d9a4" toneMapped={false} />
      </mesh>
      {[-1, 1].map((l) => (
        <mesh key={l} position={[0.635 * l, 1.2, 0.03]}>
          <boxGeometry args={[0.12, 2.4, 0.16]} />
          <meshStandardMaterial color={cornice} />
        </mesh>
      ))}
      <mesh position={[0, 2.4, 0.03]}>
        <boxGeometry args={[1.39, 0.12, 0.16]} />
        <meshStandardMaterial color={cornice} />
      </mesh>
      <group position={[-0.575, 0, 0.04]} rotation={[0, 0.45, 0]}>
        <mesh position={[0.575, 1.15, 0]}>
          <boxGeometry args={[1.15, 2.3, 0.05]} />
          <meshStandardMaterial color="#4a4170" roughness={0.55} />
        </mesh>
      </group>
      <mesh position={[0, 1.2, 0.2]} onClick={cliccabile(onEsci)} {...hover}>
        <planeGeometry args={[1.4, 2.5]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Text font={FONT_TITOLI} fontSize={0.24} color={inchiostro} anchorX="center" anchorY="bottom" position={[0, 2.6, 0.05]}>
        {testi.torna}
      </Text>

      {/* targa: scheda completa nel sito */}
      <group position={[2.4, 1.6, 0.02]}>
        <mesh onClick={cliccabile(onScheda)} {...hover}>
          <planeGeometry args={[1.7, 0.8]} />
          <meshStandardMaterial color="#e0362b" roughness={0.5} />
        </mesh>
        <Text
          font={FONT_TITOLI}
          fontSize={0.13}
          maxWidth={1.45}
          textAlign="center"
          lineHeight={1.2}
          color="#fff6ea"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.01]}
        >
          {testi.targa}
        </Text>
      </group>
    </group>
  );
}

function Faro({ a, y }: { a: number; y: number }) {
  const luce = useRef<THREE.SpotLight>(null);
  const bersaglio = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(Math.sin(a) * LATO, y, -Math.cos(a) * LATO);
    return o;
  }, [a, y]);
  useEffect(() => {
    if (luce.current) luce.current.target = bersaglio;
  }, [bersaglio]);
  return (
    <>
      <primitive object={bersaglio} />
      <spotLight
        ref={luce}
        position={[Math.sin(a) * 1.2, ALTEZZA - 0.2, -Math.cos(a) * 1.2]}
        angle={0.62}
        penumbra={0.8}
        intensity={22}
        color="#ffe6b8"
        decay={1.6}
      />
    </>
  );
}

function Ambiente() {
  return (
    <group>
      <ambientLight intensity={1.2} color="#fff8f0" />
      <hemisphereLight args={["#ffffff", "#b49a84", 0.85]} />
      {PARETI.map((a, i) => (
        <Faro key={i} a={a} y={2.2} />
      ))}
      {PARETI.map((a, i) => {
        const { position, rotation } = suParete(a, LATO);
        return (
          <mesh key={i} position={[position[0], ALTEZZA / 2, position[2]]} rotation={rotation}>
            <planeGeometry args={[LATO * 2, ALTEZZA]} />
            <meshStandardMaterial color="#dde0f8" roughness={0.95} />
          </mesh>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[LATO * 2, LATO * 2]} />
        <meshStandardMaterial color="#c4a484" roughness={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ALTEZZA, 0]}>
        <planeGeometry args={[LATO * 2, LATO * 2]} />
        <meshStandardMaterial color="#eef0fb" roughness={1} />
      </mesh>
    </group>
  );
}

function Immagini({
  imp,
  onElemento,
  onSopra,
}: {
  imp: Impaginato;
  onElemento: (id: string) => void;
  onSopra: (s: boolean) => void;
}) {
  const urls = useMemo(
    () => [...imp.foto.map((f) => f.media.src!), ...(imp.mediaImmagine?.src ? [imp.mediaImmagine.src] : [])],
    [imp],
  );
  const textures = useTexture(urls, (t) => {
    (Array.isArray(t) ? t : [t]).forEach((x) => {
      x.colorSpace = THREE.SRGBColorSpace;
      x.anisotropy = 4;
    });
  }) as THREE.Texture[];
  return (
    <>
      {imp.mediaImmagine ? (
        <Quadro
          el={imp.media}
          texture={textures[textures.length - 1]}
          onClick={cliccabile(() => onElemento("media"))}
          onSopra={onSopra}
        />
      ) : null}
      {imp.foto.map((f, i) => (
        <Quadro
          key={f.id}
          el={f}
          texture={textures[i]}
          onClick={cliccabile(() => onElemento(f.id))}
          onSopra={onSopra}
        />
      ))}
    </>
  );
}

/* ---------- Sala ---------- */

export function SalaOpera({
  opera,
  imp,
  fuoco,
  onElemento,
  onEsci,
  onScheda,
  onAspettoVideo,
  onSopra,
  lingua,
  paretaInVista,
}: {
  lingua: Lingua;
  paretaInVista: number;
  opera: Opera;
  imp: Impaginato;
  fuoco: string | null;
  onElemento: (id: string) => void;
  onEsci: () => void;
  onScheda: () => void;
  onAspettoVideo: (a: number) => void;
  onSopra: (s: boolean) => void;
}) {
  const t = dizionario(lingua).stanza;
  const inchiostro = INCHIOSTRO;
  const fronte = suParete(PARETI[0], LATO - 0.02);
  const sottotitolo = `${opera.sottotitolo}${opera.anno ? `, ${opera.anno}` : ""}`;

  return (
    <>
      <color attach="background" args={["#dfe2f5"]} />
      <Ambiente />

      {/* parete 0: titolo e video o copertina */}
      <group position={fronte.position} rotation={fronte.rotation}>
        <Text font={FONT_TITOLI} fontSize={0.52} color={inchiostro} anchorX="center" anchorY="middle" position={[0, 3.78, 0.03]}>
          {opera.titolo}
        </Text>
        <Text font={FONT_TESTO} fontSize={0.16} color={inchiostro} anchorX="center" anchorY="middle" position={[0, 3.3, 0.03]}>
          {sottotitolo}
        </Text>
        {opera.teaser ? (
          <Text
            font={FONT_TESTO}
            fontSize={0.1}
            color={inchiostro}
            anchorX="center"
            anchorY="top"
            position={[0, imp.media.y - imp.media.h / 2 - 0.12, 0.03]}
          >
            {fuoco === "media" ? t.audioAttivo : t.toccaVideo}
          </Text>
        ) : null}
      </group>
      {opera.teaser ? (
        <Video
          el={imp.media}
          src={opera.teaser}
          audio={fuoco === "media"}
          onAspetto={onAspettoVideo}
          onClick={cliccabile(() => onElemento("media"))}
          onSopra={onSopra}
        />
      ) : opera.youtube ? (
        <VideoYouTube el={imp.media} id={opera.youtube} titolo={opera.titolo} visibile={paretaInVista === 0} />
      ) : null}

      {/* parete 1: foto (e copertina sulla parete 0 quando non c'è video) */}
      {imp.foto.length > 0 || imp.mediaImmagine ? (
        <Suspense fallback={null}>
          <Immagini imp={imp} onElemento={onElemento} onSopra={onSopra} />
        </Suspense>
      ) : null}
      {imp.foto.length === 0 ? (
        <group {...suParete(PARETI[1], LATO - 0.02)}>
          <Text font={FONT_TITOLI} fontSize={0.3} color={inchiostro} anchorX="center" position={[0, 2.4, 0.03]}>
            {t.fotoInArrivo}
          </Text>
        </group>
      ) : null}

      {/* parete 2: testi */}
      <Testi opera={opera} imp={imp} lingua={lingua} onClick={(id) => cliccabile(() => onElemento(id))} onSopra={onSopra} />

      {/* parete 3: uscita */}
      <Uscita testi={{ torna: t.tornaStanza, targa: t.targa }} onEsci={onEsci} onScheda={onScheda} onSopra={onSopra} />
    </>
  );
}
