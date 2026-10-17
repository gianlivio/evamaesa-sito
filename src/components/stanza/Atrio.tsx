"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { FONT_TITOLI as FONT, coloriCirco, smorza, suParete, useStrisce, type Tema } from "./comune";
import { Clown, Festone, Palloncino, Podio, Stella, compagnia } from "./Circo";
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

function CircoAtrio({ totale, ridotto, onClacson }: { totale: number; ridotto: boolean; onClacson: () => void }) {
  const strisce = useStrisce("#c8322a", "#f4e7cf", 18);
  const apice: [number, number, number] = [0, H + 2.7, 0];
  // festoni: a raggiera dal colmo del tendone e a ghirlanda lungo la parete
  const raggiera = Array.from({ length: totale * 2 }, (_, i) => {
    const t = ((i + 0.5) / (totale * 2)) * Math.PI * 2;
    return [Math.sin(t) * (R - 0.15), H - 0.05, -Math.cos(t) * (R - 0.15)] as [number, number, number];
  });
  const ghirlanda = Array.from({ length: totale * 4 }, (_, i) => {
    const t = (i / (totale * 4)) * Math.PI * 2;
    return [Math.sin(t) * (R - 0.2), H - 0.35, -Math.cos(t) * (R - 0.2)] as [number, number, number];
  });
  // tra una porta e l'altra: un podio con i palloncini
  const intermedi = Array.from({ length: totale }, (_, i) => ((i + 0.5) / totale) * Math.PI * 2);

  return (
    <group>
      <ambientLight intensity={0.75} color="#fff0d8" />
      <hemisphereLight args={["#ffe9c7", "#8a3a22", 1.3]} />
      <pointLight position={[0, H + 1.5, 0]} intensity={60} color="#ffd9a0" decay={1.6} />
      <mesh position={[0, H / 2, 0]}>
        <cylinderGeometry args={[R, R, H, 96, 1, true]} />
        <meshStandardMaterial map={strisce} side={THREE.BackSide} roughness={0.9} />
      </mesh>
      <mesh position={[0, H + 1.35, 0]}>
        <coneGeometry args={[R, 2.7, 96, 1, true]} />
        <meshStandardMaterial map={strisce} side={THREE.BackSide} roughness={0.9} />
      </mesh>
      {/* pista di segatura con il bordo rosso e la stella */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R, 96]} />
        <meshStandardMaterial color="#d8bb8b" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[2.7, 64]} />
        <meshStandardMaterial color="#c99a5b" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[2.7, 0.11, 12, 96]} />
        <meshStandardMaterial color="#c8322a" roughness={0.5} />
      </mesh>
      <Stella raggio={1.1} />
      {raggiera.map((p, i) => (
        <Festone key={`r${i}`} da={apice} a={p} cala={0.35} bandiere={14} />
      ))}
      {ghirlanda.map((p, i) => (
        <Festone key={`g${i}`} da={p} a={ghirlanda[(i + 1) % ghirlanda.length]} cala={0.25} bandiere={5} />
      ))}
      {intermedi.map((t, i) => {
        const x = Math.sin(t) * (R - 0.9);
        const z = -Math.cos(t) * (R - 0.9);
        return (
          <group key={`p${i}`}>
            <Podio posizione={[x, 0, z]} />
            <Palloncino posizione={[x - 0.12, 0.62, z]} colore={coloriCirco[i % 6]} filo={1.1} fase={i} ridotto={ridotto} />
            <Palloncino posizione={[x + 0.1, 0.62, z + 0.08]} colore={coloriCirco[(i + 2) % 6]} filo={1.35} fase={i + 1.7} ridotto={ridotto} />
            <Palloncino posizione={[x, 0.62, z - 0.1]} colore={coloriCirco[(i + 4) % 6]} filo={0.95} fase={i + 3.1} ridotto={ridotto} />
          </group>
        );
      })}
      {compagnia.map((c, i) => (
        <Clown key={i} {...c} ridotto={ridotto} onClacson={onClacson} />
      ))}
    </group>
  );
}

function Ambiente({
  tema,
  totale,
  ridotto,
  onClacson,
}: {
  tema: Tema;
  totale: number;
  ridotto: boolean;
  onClacson: () => void;
}) {
  if (tema === "circo") return <CircoAtrio totale={totale} ridotto={ridotto} onClacson={onClacson} />;
  return (
    <group key="sala">
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

/* ---------- Occhio di bue sulla porta (solo tema sala) ---------- */

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
  tema,
  indice,
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
  tema: Tema;
  indice: number;
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

  const sala = tema === "sala";
  const coloreAnta = sala ? "#4a4170" : coloriCirco[indice % coloriCirco.length];
  const coloreCornice = sala ? "#1e2240" : "#f4e7cf";
  const coloreMetallo = sala ? "#c9a24a" : "#f2d27a";
  const coloreTesto = "#1e2240";
  const luceOltre = sala ? "#f3d9a4" : "#fff4dc";

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

      {/* nel circo il titolo sta su un'insegna, per leggerlo sopra le strisce */}
      {!sala ? (
        <mesh position={[0, HP + 0.52, 0.02]}>
          <planeGeometry args={[2.9, 0.62]} />
          <meshStandardMaterial color="#f4e7cf" roughness={0.8} />
        </mesh>
      ) : null}

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

/* ---------- Interruttore ---------- */

function Leva({
  a,
  tema,
  ridotto,
  sopra,
  onSopra,
  onFuori,
  onScatta,
  etichette,
}: {
  etichette: { circo: string; sala: string };
  a: number;
  tema: Tema;
  ridotto: boolean;
  sopra: boolean;
  onSopra: () => void;
  onFuori: () => void;
  onScatta: () => void;
}) {
  const braccio = useRef<THREE.Group>(null);
  const { position, rotation } = suParete(a, R - 0.06);
  const sala = tema === "sala";

  useFrame((_, dt) => {
    if (!braccio.current) return;
    const obiettivo = sala ? Math.PI - 0.5 : 0.5;
    braccio.current.rotation.x = smorza(braccio.current.rotation.x, obiettivo, 9, dt, ridotto);
  });

  const coloreTesto = "#1e2240";

  return (
    <group position={position} rotation={rotation}>
      <group scale={1.6} position={[0, -0.85, 0]}>
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[0.46, 0.9, 0.06]} />
          <meshStandardMaterial color={sala ? "#1a1c33" : "#f4e7cf"} roughness={0.5} metalness={0.2} />
        </mesh>
        <group ref={braccio} position={[0, 1.35, 0.05]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.4, 12]} />
            <meshStandardMaterial color="#c9a24a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* il pomello è un naso rosso */}
          <mesh position={[0, 0.42, 0]} scale={sopra ? 1.2 : 1}>
            <sphereGeometry args={[0.075, 24, 16]} />
            <meshStandardMaterial color="#e0362b" roughness={0.35} />
          </mesh>
        </group>
        <Text font={FONT} fontSize={0.13} color={coloreTesto} anchorX="center" position={[0, 2.0, 0.04]}>
          {etichette.circo}
        </Text>
        <Text font={FONT} fontSize={0.13} color={coloreTesto} anchorX="center" position={[0, 0.72, 0.04]}>
          {etichette.sala}
        </Text>
        <mesh
          position={[0, 1.35, 0.15]}
          onPointerOver={(e) => {
            e.stopPropagation();
            onSopra();
          }}
          onPointerOut={onFuori}
          onClick={(e) => {
            e.stopPropagation();
            if (e.delta > 6) return;
            onScatta();
          }}
        >
          <planeGeometry args={[0.8, 1.6]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Atrio ---------- */

export function Atrio({
  porte,
  tema,
  sopra,
  scelta,
  inConferma,
  ridotto,
  onSopra,
  onApri,
  onLeva,
  onClacson,
  lingua,
}: {
  lingua: Lingua;
  porte: Porta[];
  tema: Tema;
  sopra: string | null;
  scelta: string | null;
  inConferma: string | null;
  ridotto: boolean;
  onSopra: (chi: string | null) => void;
  onApri: (indice: number) => void;
  onLeva: () => void;
  onClacson: () => void;
}) {
  const totale = porte.length + 1; // l'ultimo slot è l'interruttore
  const t = dizionario(lingua).stanza;

  return (
    <>
      <color attach="background" args={[tema === "sala" ? "#dfe2f5" : "#2a1410"]} />
      <Ambiente tema={tema} totale={totale} ridotto={ridotto} onClacson={onClacson} />
      {porte.map((p, i) => {
        const a = angoloSlot(i, totale);
        const stato: StatoPorta =
          p.slug === scelta ? "aperta" : p.slug === sopra || p.slug === inConferma ? "socchiusa" : "chiusa";
        return (
          <group key={p.slug}>
            {tema === "sala" ? <OcchioDiBue a={a} /> : null}
            <PortaMesh
              porta={p}
              a={a}
              tema={tema}
              indice={i}
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
      <Leva
        a={angoloSlot(porte.length, totale)}
        tema={tema}
        ridotto={ridotto}
        sopra={sopra === "leva"}
        onSopra={() => onSopra("leva")}
        onFuori={() => onSopra(null)}
        onScatta={onLeva}
        etichette={t.leva}
      />
    </>
  );
}
