"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { coloriCirco, useStrisce } from "./comune";

type V3 = [number, number, number];

/* ---------- Festone di bandierine con lampadine ---------- */

export function Festone({
  da,
  a,
  cala = 0.45,
  bandiere = 12,
  luci = true,
}: {
  da: V3;
  a: V3;
  cala?: number;
  bandiere?: number;
  luci?: boolean;
}) {
  const punti = useMemo(
    () =>
      Array.from({ length: bandiere + 1 }, (_, i) => {
        const t = i / bandiere;
        return new THREE.Vector3(
          da[0] + (a[0] - da[0]) * t,
          da[1] + (a[1] - da[1]) * t - cala * 4 * t * (1 - t),
          da[2] + (a[2] - da[2]) * t,
        );
      }),
    [da, a, cala, bandiere],
  );

  const passo = punti[0].distanceTo(punti[1]);
  const triangolo = useMemo(() => {
    const s = new THREE.Shape();
    const l = passo * 0.42;
    s.moveTo(-l, 0);
    s.lineTo(l, 0);
    s.lineTo(0, -l * 1.6);
    s.closePath();
    return new THREE.ShapeGeometry(s);
  }, [passo]);

  // le bandierine stanno nel piano verticale che contiene il filo
  const rotY = Math.atan2(-(a[2] - da[2]), a[0] - da[0]);

  return (
    <group>
      <Line points={punti} color="#4a3322" lineWidth={1.2} />
      {punti.slice(0, -1).map((p, i) => {
        const q = punti[i + 1];
        const pendenza = Math.atan2(q.y - p.y, Math.hypot(q.x - p.x, q.z - p.z));
        return (
          <mesh
            key={i}
            geometry={triangolo}
            position={[(p.x + q.x) / 2, (p.y + q.y) / 2, (p.z + q.z) / 2]}
            rotation={[0, rotY, pendenza]}
          >
            <meshStandardMaterial color={coloriCirco[i % coloriCirco.length]} side={THREE.DoubleSide} roughness={0.7} />
          </mesh>
        );
      })}
      {luci
        ? punti.map((p, i) =>
            i % 2 === 0 ? (
              <mesh key={`l${i}`} position={[p.x, p.y + 0.02, p.z]}>
                <sphereGeometry args={[0.045, 10, 8]} />
                <meshBasicMaterial color="#ffe3a3" toneMapped={false} />
              </mesh>
            ) : null,
          )
        : null}
    </group>
  );
}

/* ---------- Palloncino ---------- */

export function Palloncino({
  posizione,
  colore,
  filo = 0.9,
  fase = 0,
  ridotto,
}: {
  posizione: V3;
  colore: string;
  filo?: number;
  fase?: number;
  ridotto: boolean;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current || ridotto) return;
    const t = clock.getElapsedTime() + fase;
    g.current.position.y = posizione[1] + Math.sin(t * 1.3) * 0.05;
    g.current.rotation.z = Math.sin(t * 0.9) * 0.08;
  });
  return (
    <group ref={g} position={posizione}>
      <mesh position={[0, filo + 0.27, 0]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.22, 24, 18]} />
        <meshStandardMaterial color={colore} roughness={0.25} metalness={0.05} />
      </mesh>
      <mesh position={[0, filo + 0.02, 0]}>
        <coneGeometry args={[0.04, 0.06, 8]} />
        <meshStandardMaterial color={colore} />
      </mesh>
      <mesh position={[0, filo / 2, 0]}>
        <cylinderGeometry args={[0.004, 0.004, filo, 4]} />
        <meshBasicMaterial color="#efe6d6" />
      </mesh>
    </group>
  );
}

/* ---------- Podio da circo ---------- */

export function Podio({ posizione, scala = 1 }: { posizione: V3; scala?: number }) {
  const strisce = useStrisce("#c8322a", "#f4e7cf", 8);
  return (
    <group position={posizione} scale={scala}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.48, 0.52, 0.6, 32]} />
        <meshStandardMaterial map={strisce} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.61, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.04, 32]} />
        <meshStandardMaterial color="#e2b23a" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.54, 0.54, 0.04, 32]} />
        <meshStandardMaterial color="#e2b23a" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ---------- Stella sulla pista ---------- */

export function Stella({ raggio = 0.9, y = 0.012 }: { raggio?: number; y?: number }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? raggio * 0.42 : raggio;
      const t = (i / 10) * Math.PI * 2 + Math.PI / 2;
      if (i === 0) s.moveTo(Math.cos(t) * r, Math.sin(t) * r);
      else s.lineTo(Math.cos(t) * r, Math.sin(t) * r);
    }
    s.closePath();
    return new THREE.ShapeGeometry(s);
  }, [raggio]);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <meshStandardMaterial color="#e9b93c" metalness={0.5} roughness={0.4} />
    </mesh>
  );
}

/* ---------- Clown ---------- */

export type StileClown = {
  abito: string;
  pantaloni: string;
  capelli: string;
  cappello: "cono" | "bombetta" | "nessuno";
  coloreCappello: string;
  azione: "cammina" | "giocoliere" | "palloncini";
};

const PELLE = "#f7efe6";

export function Clown({
  stile,
  raggio,
  velocita,
  fase,
  ridotto,
  onClacson,
}: {
  stile: StileClown;
  raggio: number;
  velocita: number; // radianti al secondo lungo il cerchio; il segno dà il verso
  fase: number;
  ridotto: boolean;
  onClacson?: () => void;
}) {
  const salto = useRef(0);
  const radice = useRef<THREE.Group>(null);
  const busto = useRef<THREE.Group>(null);
  const gambaS = useRef<THREE.Group>(null);
  const gambaD = useRef<THREE.Group>(null);
  const braccioS = useRef<THREE.Group>(null);
  const braccioD = useRef<THREE.Group>(null);
  const palle = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const th = ridotto ? fase : fase + t * velocita;
    const r = radice.current;
    if (!r) return;
    r.position.x = Math.sin(th) * raggio;
    r.position.z = -Math.cos(th) * raggio;
    const verso = Math.sign(velocita) || 1;
    r.rotation.y = Math.atan2(Math.cos(th) * verso, Math.sin(th) * verso);

    const cadenza = 5.5;
    const p = ridotto ? 0 : Math.sin(t * cadenza + fase);
    if (busto.current) {
      // saltello quando suona il clacson
      if (salto.current === -1) salto.current = t + 0.6;
      const s = Math.max(0, salto.current - t);
      busto.current.position.y = (ridotto ? 0 : Math.abs(Math.cos(t * cadenza + fase)) * 0.045) + Math.sin(s * Math.PI * 2.5) * s * 0.5;
      busto.current.rotation.z = p * 0.06; // ondeggia come chi porta scarpe enormi
    }
    if (gambaS.current) gambaS.current.rotation.x = p * 0.5;
    if (gambaD.current) gambaD.current.rotation.x = -p * 0.5;

    if (stile.azione === "giocoliere") {
      if (braccioS.current) braccioS.current.rotation.x = -1.15 + Math.sin(t * 6) * 0.12;
      if (braccioD.current) braccioD.current.rotation.x = -1.15 - Math.sin(t * 6) * 0.12;
      if (palle.current) {
        palle.current.children.forEach((m, k) => {
          const f = t * 3.2 + (k * Math.PI * 2) / 3;
          m.position.x = Math.cos(f) * 0.2;
          m.position.y = 1.5 + Math.abs(Math.sin(f)) * 0.55;
        });
      }
    } else if (stile.azione === "palloncini") {
      if (braccioS.current) braccioS.current.rotation.x = -p * 0.4;
      if (braccioD.current) braccioD.current.rotation.x = -2.75 + Math.sin(t * 1.5) * 0.06;
    } else {
      if (braccioS.current) braccioS.current.rotation.x = -p * 0.45;
      if (braccioD.current) braccioD.current.rotation.x = p * 0.45;
    }
  });

  const gamba = (lato: 1 | -1, ref: React.RefObject<THREE.Group | null>) => (
    <group ref={ref} position={[0.1 * lato, 0.72, 0]}>
      <mesh position={[0, -0.33, 0]}>
        <cylinderGeometry args={[0.075, 0.065, 0.66, 12]} />
        <meshStandardMaterial color={stile.pantaloni} roughness={0.7} />
      </mesh>
      {/* scarpone */}
      <mesh position={[0, -0.68, 0.1]} scale={[0.11, 0.07, 0.24]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#c4271f" roughness={0.35} />
      </mesh>
    </group>
  );

  const braccio = (lato: 1 | -1, ref: React.RefObject<THREE.Group | null>, figli?: React.ReactNode) => (
    <group ref={ref} position={[0.24 * lato, 1.24, 0]}>
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.055, 0.05, 0.48, 10]} />
        <meshStandardMaterial color={stile.abito} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <sphereGeometry args={[0.07, 12, 10]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {figli}
    </group>
  );

  return (
    <group
      ref={radice}
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta > 6 || !onClacson) return;
        salto.current = -1; // il prossimo fotogramma fissa l'istante del saltello
        onClacson();
      }}
    >
      {gamba(1, gambaS)}
      {gamba(-1, gambaD)}
      <group ref={busto}>
        {/* abito a campana */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.17, 0.3, 0.56, 16]} />
          <meshStandardMaterial color={stile.abito} roughness={0.65} />
        </mesh>
        {[1.12, 0.98, 0.84].map((y, i) => (
          <mesh key={i} position={[0, y, 0.2 + (1.12 - y) * 0.35]}>
            <sphereGeometry args={[0.045, 12, 10]} />
            <meshStandardMaterial color={coloriCirco[(i + 2) % coloriCirco.length]} roughness={0.4} />
          </mesh>
        ))}
        {/* gorgiera */}
        <mesh position={[0, 1.29, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.065, 10, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
        {/* testa */}
        <group position={[0, 1.47, 0]}>
          <mesh>
            <sphereGeometry args={[0.16, 24, 18]} />
            <meshStandardMaterial color={PELLE} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.01, 0.16]}>
            <sphereGeometry args={[0.048, 16, 12]} />
            <meshStandardMaterial color="#e0362b" roughness={0.3} />
          </mesh>
          {[-1, 1].map((l) => (
            <mesh key={l} position={[0.06 * l, 0.05, 0.135]}>
              <sphereGeometry args={[0.02, 8, 6]} />
              <meshStandardMaterial color="#1e2240" />
            </mesh>
          ))}
          <mesh position={[0, -0.075, 0.13]} rotation={[0.3, 0, 0]} scale={[1, 0.45, 0.5]}>
            <torusGeometry args={[0.05, 0.014, 6, 16, Math.PI]} />
            <meshStandardMaterial color="#c4271f" />
          </mesh>
          {/* ciuffi di capelli */}
          {[-1, 1].map((l) =>
            [0, 1, 2].map((k) => (
              <mesh key={`${l}${k}`} position={[0.15 * l, -0.02 + k * 0.06, -0.03 - k * 0.02]}>
                <sphereGeometry args={[0.07, 10, 8]} />
                <meshStandardMaterial color={stile.capelli} roughness={0.9} />
              </mesh>
            )),
          )}
          {stile.cappello === "cono" ? (
            <mesh position={[0.03, 0.24, 0]} rotation={[0, 0, -0.25]}>
              <coneGeometry args={[0.09, 0.3, 16]} />
              <meshStandardMaterial color={stile.coloreCappello} roughness={0.6} />
            </mesh>
          ) : null}
          {stile.cappello === "bombetta" ? (
            <group position={[0, 0.14, 0]} rotation={[0, 0, 0.15]}>
              <mesh>
                <cylinderGeometry args={[0.15, 0.15, 0.02, 20]} />
                <meshStandardMaterial color={stile.coloreCappello} />
              </mesh>
              <mesh position={[0, 0.06, 0]}>
                <sphereGeometry args={[0.09, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={stile.coloreCappello} />
              </mesh>
            </group>
          ) : null}
        </group>
        {braccio(1, braccioS)}
        {braccio(
          -1,
          braccioD,
          stile.azione === "palloncini" ? (
            <group position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
              <Palloncino posizione={[0, 0, 0]} colore="#d8342b" filo={0.55} ridotto={ridotto} />
              <Palloncino posizione={[0.14, 0, 0.06]} colore="#2a5bb8" filo={0.7} fase={1} ridotto={ridotto} />
              <Palloncino posizione={[-0.12, 0, -0.05]} colore="#f2b632" filo={0.62} fase={2} ridotto={ridotto} />
            </group>
          ) : null,
        )}
        {stile.azione === "giocoliere" ? (
          <group ref={palle} position={[0, 0, 0.35]}>
            {[0, 1, 2].map((k) => (
              <mesh key={k} position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.055, 12, 10]} />
                <meshStandardMaterial color={coloriCirco[k * 2]} roughness={0.3} />
              </mesh>
            ))}
          </group>
        ) : null}
      </group>
    </group>
  );
}

export const compagnia: { stile: StileClown; raggio: number; velocita: number; fase: number }[] = [
  {
    stile: { abito: "#2a5bb8", pantaloni: "#f2b632", capelli: "#e46a1f", cappello: "cono", coloreCappello: "#d8342b", azione: "giocoliere" },
    raggio: 4.3,
    velocita: 0.11,
    fase: 0.6,
  },
  {
    stile: { abito: "#d8342b", pantaloni: "#2f8f5b", capelli: "#7a3fa0", cappello: "bombetta", coloreCappello: "#1e2240", azione: "palloncini" },
    raggio: 4.6,
    velocita: -0.13,
    fase: 2.4,
  },
  {
    stile: { abito: "#f2b632", pantaloni: "#7a3fa0", capelli: "#2a5bb8", cappello: "nessuno", coloreCappello: "#000", azione: "cammina" },
    raggio: 4.0,
    velocita: 0.17,
    fase: 3.9,
  },
  {
    stile: { abito: "#2f8f5b", pantaloni: "#d8342b", capelli: "#f2b632", cappello: "cono", coloreCappello: "#2a5bb8", azione: "cammina" },
    raggio: 4.45,
    velocita: -0.09,
    fase: 5.3,
  },
];
