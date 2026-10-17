import { useMemo } from "react";
import * as THREE from "three";

export type Tema = "sala" | "circo";

export const FONT_TITOLI = "/fonts/gloock.woff";
export const FONT_TESTO = "/fonts/hanken.woff";
export const OCCHI = 1.6; // altezza della camera (m)

export const coloriCirco = ["#d8342b", "#2a5bb8", "#f2b632", "#2f8f5b", "#7a3fa0", "#e46a1f"];

export function smorza(attuale: number, obiettivo: number, velocita: number, dt: number, ridotto: boolean) {
  return ridotto ? obiettivo : THREE.MathUtils.damp(attuale, obiettivo, velocita, dt);
}

/*
 * Pareti. Un oggetto "appeso" all'angolo a, a distanza r dal centro, guarda il centro.
 * Nel suo riferimento locale +x è la destra di chi guarda la parete e +y l'alto.
 * Angolo 0 = davanti alla camera iniziale (asse -z); cresce in senso orario visto dall'alto.
 */
export function suParete(a: number, r: number) {
  return {
    position: [Math.sin(a) * r, 0, -Math.cos(a) * r] as [number, number, number],
    rotation: [0, -a, 0] as [number, number, number],
  };
}

/** Punto in coordinate mondo di un elemento della parete, staccato di `distanza` verso il centro. */
export function puntoParete(a: number, r: number, x: number, y: number, distanza = 0) {
  return new THREE.Vector3(
    Math.sin(a) * r + Math.cos(a) * x - Math.sin(a) * distanza,
    y,
    -Math.cos(a) * r + Math.sin(a) * x + Math.cos(a) * distanza,
  );
}

export type Fuoco = { pos: THREE.Vector3; look: THREE.Vector3 };

/** Posizione della camera da cui un rettangolo w×h sulla parete riempie la vista. */
export function fuocoSu(a: number, r: number, x: number, y: number, w: number, h: number, aspetto: number, fov = 62): Fuoco {
  // margine in basso per la didascalia: l'elemento resta nella parte alta dello schermo
  const serve = Math.max(h * 1.45, (w * 1.12) / aspetto);
  const d = Math.min(serve / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2))), r - 0.3);
  const yc = y - serve * 0.14;
  return { look: puntoParete(a, r, x, yc, 0), pos: puntoParete(a, r, x, yc, d) };
}

/** Texture a strisce verticali, ripetibile. */
export function useStrisce(c1: string, c2: string, ripetizioni: number) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 4;
    const g = c.getContext("2d")!;
    g.fillStyle = c1;
    g.fillRect(0, 0, 32, 4);
    g.fillStyle = c2;
    g.fillRect(32, 0, 32, 4);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(ripetizioni, 1);
    t.magFilter = THREE.NearestFilter;
    t.anisotropy = 4;
    return t;
  }, [c1, c2, ripetizioni]);
}
