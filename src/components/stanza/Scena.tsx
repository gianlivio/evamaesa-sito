"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export type Tema = "sala" | "circo";

export type Porta = {
  slug: string;
  titolo: string;
  sottotitolo: string;
  anno?: number;
  pubblicoAdulto: boolean;
};

/* ---------- Misure (metri) ---------- */

const R = 6; // raggio della stanza
const H = 4.4; // altezza delle pareti
const OCCHI = 1.6; // altezza della camera
const LP = 1.15; // larghezza porta
const HP = 2.3; // altezza porta
const FONT = "/fonts/gloock.woff";

const coloriCirco = ["#d8342b", "#2a5bb8", "#f2b632", "#2f8f5b", "#7a3fa0", "#e46a1f"];

/** Angolo dello slot i su `totale` slot; 0 è davanti alla camera iniziale. */
export function angoloSlot(i: number, totale: number) {
  return (i / totale) * Math.PI * 2;
}

/** Posizione e rotazione di un oggetto appoggiato alla parete all'angolo a. */
function suParete(a: number, r: number) {
  return {
    position: [Math.sin(a) * r, 0, -Math.cos(a) * r] as [number, number, number],
    rotation: [0, -a, 0] as [number, number, number],
  };
}

function smorza(attuale: number, obiettivo: number, velocita: number, dt: number, ridotto: boolean) {
  return ridotto ? obiettivo : THREE.MathUtils.damp(attuale, obiettivo, velocita, dt);
}

/* ---------- Camera ---------- */

function Regia({
  yaw,
  totale,
  bersaglio,
  ridotto,
  onFuoco,
}: {
  yaw: MutableRefObject<number>;
  totale: number;
  bersaglio: number | null; // angolo della porta in cui si entra
  ridotto: boolean;
  onFuoco: (indice: number) => void;
}) {
  const { camera } = useThree();
  const attuale = useRef(yaw.current);
  const ultimoFuoco = useRef(-1);

  useFrame((_, dt) => {
    attuale.current = smorza(attuale.current, yaw.current, 5, dt, ridotto);
    camera.rotation.set(-0.04, attuale.current, 0, "YXZ");

    const dentro = bersaglio !== null ? R * 0.62 : 0;
    const a = bersaglio ?? 0;
    camera.position.x = smorza(camera.position.x, Math.sin(a) * dentro, 2.2, dt, ridotto);
    camera.position.z = smorza(camera.position.z, -Math.cos(a) * dentro, 2.2, dt, ridotto);
    camera.position.y = OCCHI;

    const passo = (Math.PI * 2) / totale;
    const indice = ((Math.round(-attuale.current / passo) % totale) + totale) % totale;
    if (indice !== ultimoFuoco.current) {
      ultimoFuoco.current = indice;
      onFuoco(indice);
    }
  });
  return null;
}

/* ---------- Ambiente ---------- */

function useStrisce() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 4;
    const g = c.getContext("2d")!;
    const n = 36;
    for (let i = 0; i < n; i++) {
      g.fillStyle = i % 2 ? "#f4e7cf" : "#c8322a";
      g.fillRect((i * c.width) / n, 0, c.width / n + 1, c.height);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  }, []);
}

function Palline({ ridotto }: { ridotto: boolean }) {
  const gruppo = useRef<THREE.Group>(null);
  const palline = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        a: (i / 7) * Math.PI * 2 + 0.3,
        r: 2.6 + (i % 3) * 0.4,
        y: 3.0 + (i % 4) * 0.22,
        colore: coloriCirco[i % coloriCirco.length],
        fase: i * 1.3,
      })),
    [],
  );
  useFrame(({ clock }) => {
    if (!gruppo.current || ridotto) return;
    const t = clock.getElapsedTime();
    gruppo.current.children.forEach((m, i) => {
      const p = palline[i];
      m.position.y = p.y + Math.sin(t * 1.4 + p.fase) * 0.25;
    });
  });
  return (
    <group ref={gruppo}>
      {palline.map((p, i) => (
        <mesh key={i} position={[Math.sin(p.a) * p.r, p.y, -Math.cos(p.a) * p.r]}>
          <sphereGeometry args={[0.16, 24, 16]} />
          <meshStandardMaterial color={p.colore} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function Ambiente({ tema, ridotto }: { tema: Tema; ridotto: boolean }) {
  const strisce = useStrisce();

  // i due ambienti hanno chiavi diverse: al cambio di tema si rimontano da zero
  if (tema === "circo") {
    return (
      <group key="circo">
        <ambientLight intensity={0.7} color="#fff0d8" />
        <hemisphereLight args={["#ffe9c7", "#8a3a22", 1.4]} />
        <pointLight position={[0, H - 0.4, 0]} intensity={35} color="#ffd9a0" />
        <mesh position={[0, H / 2, 0]}>
          <cylinderGeometry args={[R, R, H, 96, 1, true]} />
          <meshStandardMaterial map={strisce} side={THREE.BackSide} roughness={0.9} />
        </mesh>
        <mesh position={[0, H + 1.6, 0]}>
          <coneGeometry args={[R, 3.2, 96, 1, true]} />
          <meshStandardMaterial map={strisce} side={THREE.BackSide} roughness={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[R, 96]} />
          <meshStandardMaterial color="#d6b98a" roughness={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
          <torusGeometry args={[2.7, 0.12, 12, 96]} />
          <meshStandardMaterial color="#c8322a" roughness={0.6} />
        </mesh>
        <Palline ridotto={ridotto} />
      </group>
    );
  }

  return (
    <group key="sala">
      <ambientLight intensity={0.6} color="#b9bde8" />
      <hemisphereLight args={["#8b90c8", "#1a1424", 0.5]} />
      <mesh position={[0, H / 2, 0]}>
        <cylinderGeometry args={[R, R, H, 96, 1, true]} />
        <meshStandardMaterial color="#323862" side={THREE.BackSide} roughness={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <circleGeometry args={[R, 96]} />
        <meshStandardMaterial color="#14172d" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R, 96]} />
        <meshStandardMaterial color="#2a2431" roughness={0.75} />
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
        intensity={70}
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
}: {
  porta: Porta;
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
  const coloreAnta = sala ? "#3b3654" : coloriCirco[indice % coloriCirco.length];
  const coloreCornice = sala ? "#1a1c33" : "#f4e7cf";
  const coloreMetallo = sala ? "#c9a24a" : "#f2d27a";
  const coloreTesto = sala ? "#f1ead8" : "#1e2240";
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
              {"Riservata a un\npubblico adulto"}
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
}: {
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

  const coloreTesto = sala ? "#f1ead8" : "#1e2240";

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
          Circo
        </Text>
        <Text font={FONT} fontSize={0.13} color={coloreTesto} anchorX="center" position={[0, 0.72, 0.04]}>
          Sala
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

/* ---------- Scena ---------- */

export function Scena({
  porte,
  tema,
  yaw,
  sopra,
  scelta,
  inConferma,
  ridotto,
  onSopra,
  onFuoco,
  onApri,
  onLeva,
}: {
  porte: Porta[];
  tema: Tema;
  yaw: MutableRefObject<number>;
  sopra: string | null;
  scelta: string | null;
  inConferma: string | null;
  ridotto: boolean;
  onSopra: (chi: string | null) => void;
  onFuoco: (indice: number) => void;
  onApri: (indice: number) => void;
  onLeva: () => void;
}) {
  const totale = porte.length + 1; // l'ultimo slot è l'interruttore
  const indiceScelta = scelta ? porte.findIndex((p) => p.slug === scelta) : -1;
  const bersaglio = indiceScelta >= 0 ? angoloSlot(indiceScelta, totale) : null;

  return (
    <>
      <Regia yaw={yaw} totale={totale} bersaglio={bersaglio} ridotto={ridotto} onFuoco={onFuoco} />
      <color attach="background" args={[tema === "sala" ? "#0e1024" : "#2a1410"]} />
      <Ambiente tema={tema} ridotto={ridotto} />
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
      />
    </>
  );
}
