"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { FONT_TITOLI as FONT, smorza, suParete } from "./comune";
import type { Lingua } from "@/i18n/lingue";
import { dizionario } from "@/i18n/dizionario";

export type Porta = {
  slug: string;
  titolo: string;
  sottotitolo: string;
  anno?: number;
  pubblicoAdulto: boolean;
};

/* ---------- Misure (metri) ---------- */

export const R = 6; // raggio dell'atrio
const H = 4.4; // altezza delle pareti
const LP = 1.15; // larghezza porta
const HP = 2.3; // altezza porta

/** Angolo dello slot i su `totale` slot; 0 è davanti alla camera iniziale. */
export function angoloSlot(i: number, totale: number) {
  return (i / totale) * Math.PI * 2;
}

/* ---------- Ambiente ---------- */

function Ambiente() {
  return (
    <group>
      <ambientLight intensity={1.25} color="#fff8f0" />
      <hemisphereLight args={["#ffffff", "#b49a84", 0.9]} />
      <mesh position={[0, H / 2, 0]}>
        <cylinderGeometry args={[R, R, H, 96, 1, true]} />
        <meshStandardMaterial color="#dde0f8" side={THREE.BackSide} roughness={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <circleGeometry args={[R, 96]} />
        <meshStandardMaterial color="#eef0fb" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R, 96]} />
        <meshStandardMaterial color="#c4a484" roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ---------- Occhio di bue sulla porta ---------- */

function OcchioDiBue({ a }: { a: number }) {
  const luce = useRef<THREE.SpotLight>(null);
  const bersaglio = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(Math.sin(a) * R, 1.2, -Math.cos(a) * R);
    return o;
  }, [a]);
  useEffect(() => {
    if (luce.current) luce.current.target = bersaglio;
  }, [bersaglio]);
  return (
    <>
      <primitive object={bersaglio} />
      <spotLight
        ref={luce}
        position={[Math.sin(a) * (R - 3.2), H - 0.15, -Math.cos(a) * (R - 3.2)]}
        angle={0.42}
        penumbra={0.7}
        intensity={28}
        color="#ffe6b8"
        decay={2}
      />
    </>
  );
}

/* ---------- Porta ---------- */

type StatoPorta = "chiusa" | "socchiusa" | "aperta";

function PortaMesh({
  porta,
  a,
  stato,
  ridotto,
  onSopra,
  onFuori,
  onApri,
  etichettaAdulto,
}: {
  porta: Porta;
  etichettaAdulto: string;
  a: number;
  stato: StatoPorta;
  ridotto: boolean;
  onSopra: () => void;
  onFuori: () => void;
  onApri: () => void;
}) {
  const anta = useRef<THREE.Group>(null);
  const { position, rotation } = suParete(a, R - 0.09);

  useFrame((_, dt) => {
    if (!anta.current) return;
    const obiettivo = stato === "aperta" ? 1.75 : stato === "socchiusa" ? 0.32 : 0;
    anta.current.rotation.y = smorza(anta.current.rotation.y, obiettivo, 6, dt, ridotto);
  });

  const coloreAnta = "#4a4170";
  const coloreCornice = "#1e2240";
  const coloreMetallo = "#c9a24a";
  const coloreTesto = "#1e2240";
  const luceOltre = "#f3d9a4";

  const clic = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta > 6) return; // era un trascinamento
    onApri();
  };

  return (
    <group position={position} rotation={rotation}>
      {/* luce oltre la porta, visibile quando si apre */}
      <mesh position={[0, HP / 2, -0.01]}>
        <planeGeometry args={[LP, HP]} />
        <meshBasicMaterial color={luceOltre} toneMapped={false} />
      </mesh>

      {/* cornice */}
      <mesh position={[-LP / 2 - 0.06, (HP + 0.1) / 2, 0.02]}>
        <boxGeometry args={[0.12, HP + 0.1, 0.16]} />
        <meshStandardMaterial color={coloreCornice} roughness={0.6} />
      </mesh>
      <mesh position={[LP / 2 + 0.06, (HP + 0.1) / 2, 0.02]}>
        <boxGeometry args={[0.12, HP + 0.1, 0.16]} />
        <meshStandardMaterial color={coloreCornice} roughness={0.6} />
      </mesh>
      <mesh position={[0, HP + 0.1, 0.02]}>
        <boxGeometry args={[LP + 0.24, 0.12, 0.16]} />
        <meshStandardMaterial color={coloreCornice} roughness={0.6} />
      </mesh>

      {/* anta, incernierata a sinistra */}
      <group ref={anta} position={[-LP / 2, 0, 0.03]}>
        <mesh position={[LP / 2, HP / 2, 0]}>
          <boxGeometry args={[LP, HP, 0.05]} />
          <meshStandardMaterial color={coloreAnta} roughness={0.55} />
        </mesh>
        <mesh position={[LP - 0.13, 1.05, 0.05]}>
          <sphereGeometry args={[0.045, 16, 12]} />
          <meshStandardMaterial color={coloreMetallo} metalness={0.8} roughness={0.3} />
        </mesh>
        {porta.pubblicoAdulto ? (
          <group position={[LP / 2, 1.62, 0.03]}>
            <mesh>
              <planeGeometry args={[0.9, 0.34]} />
              <meshStandardMaterial color="#e0362b" roughness={0.5} />
            </mesh>
            <Text
              font={FONT}
              fontSize={0.075}
              maxWidth={0.8}
              lineHeight={1.1}
              textAlign="center"
              color="#fff6ea"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.005]}
            >
              {etichettaAdulto}
            </Text>
          </group>
        ) : null}
      </group>

      {/* titolo sopra la porta */}
      <Text
        font={FONT}
        fontSize={0.3}
        maxWidth={2.6}
        textAlign="center"
        color={coloreTesto}
        anchorX="center"
        anchorY="bottom"
        position={[0, HP + 0.35, 0.05]}
      >
        {porta.titolo}
      </Text>
      {porta.anno ? (
        <Text
          font={FONT}
          fontSize={0.12}
          color={coloreTesto}
          anchorX="center"
          anchorY="top"
          position={[0, HP + 0.3, 0.05]}
        >
          {String(porta.anno)}
        </Text>
      ) : null}

      {/* area di clic stabile, indipendente dall'anta che ruota */}
      <mesh
        position={[0, HP / 2, 0.12]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onSopra();
        }}
        onPointerOut={onFuori}
        onClick={clic}
      >
        <planeGeometry args={[LP + 0.2, HP + 0.9]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ---------- Atrio ---------- */

export function Atrio({
  porte,
  sopra,
  scelta,
  inConferma,
  ridotto,
  onSopra,
  onApri,
  lingua,
}: {
  lingua: Lingua;
  porte: Porta[];
  sopra: string | null;
  scelta: string | null;
  inConferma: string | null;
  ridotto: boolean;
  onSopra: (chi: string | null) => void;
  onApri: (indice: number) => void;
}) {
  const totale = porte.length;
  const t = dizionario(lingua).stanza;

  return (
    <>
      <color attach="background" args={["#dfe2f5"]} />
      <Ambiente />
      {porte.map((p, i) => {
        const a = angoloSlot(i, totale);
        const stato: StatoPorta =
          p.slug === scelta ? "aperta" : p.slug === sopra || p.slug === inConferma ? "socchiusa" : "chiusa";
        return (
          <group key={p.slug}>
            <OcchioDiBue a={a} />
            <PortaMesh
              porta={p}
              a={a}
              stato={stato}
              ridotto={ridotto}
              onSopra={() => onSopra(p.slug)}
              onFuori={() => onSopra(null)}
              onApri={() => onApri(i)}
              etichettaAdulto={t.riservataPorta}
            />
          </group>
        );
      })}
    </>
  );
}
