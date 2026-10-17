"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { smorza, type Fuoco } from "./comune";

/*
 * Camera in prima persona.
 * - Senza fuoco: sta in `base` e guarda nella direzione `yaw` (trascinamento, frecce).
 * - Con fuoco: si avvicina a un elemento della parete e lo inquadra.
 * - Quando `scatto` cambia (passaggio atrio <-> sala), salta subito alla nuova posizione.
 */
export function Regia({
  yaw,
  base,
  fuoco,
  settori,
  scatto,
  ridotto,
  onSettore,
}: {
  yaw: MutableRefObject<number>;
  base: THREE.Vector3;
  fuoco: Fuoco | null;
  settori: number;
  scatto: number;
  ridotto: boolean;
  onSettore: (indice: number) => void;
}) {
  const { camera } = useThree();
  const yawLiscio = useRef(yaw.current);
  const ultimoSettore = useRef(-1);
  const ultimoScatto = useRef(-1);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const e = useMemo(() => new THREE.Euler(0, 0, 0, "YXZ"), []);
  const m = useMemo(() => new THREE.Matrix4(), []);
  const su = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((_, dt) => {
    const destinazione = fuoco ? fuoco.pos : base;

    if (scatto !== ultimoScatto.current) {
      ultimoScatto.current = scatto;
      yawLiscio.current = yaw.current;
      e.set(-0.04, yaw.current, 0);
      camera.quaternion.setFromEuler(e);
      camera.position.copy(destinazione);
    } else {
      yawLiscio.current = smorza(yawLiscio.current, yaw.current, 5, dt, ridotto);
      if (fuoco) {
        m.lookAt(fuoco.pos, fuoco.look, su);
        q.setFromRotationMatrix(m);
      } else {
        e.set(-0.04, yawLiscio.current, 0);
        q.setFromEuler(e);
      }
      camera.quaternion.slerp(q, ridotto ? 1 : 1 - Math.exp(-6 * dt));
      camera.position.lerp(destinazione, ridotto ? 1 : 1 - Math.exp(-2.6 * dt));
    }

    const passo = (Math.PI * 2) / settori;
    const indice = ((Math.round(-yawLiscio.current / passo) % settori) + settori) % settori;
    if (indice !== ultimoSettore.current) {
      ultimoSettore.current = indice;
      onSettore(indice);
    }
  });
  return null;
}
