/*
 * Musiche e suoni della stanza, generati con la Web Audio API: nessun file da scaricare.
 * Il contesto audio parte al primo gesto dell'utente (regola dei browser).
 * Le melodie sono originali.
 */

export type NomeBrano = "atrio-sala" | "atrio-circo" | "girandola-amen" | "gorgoglio" | "animali-mai";
export type NomeEffetto = "porta" | "leva-circo" | "leva-sala" | "clacson" | "pop" | "sfoglia" | "uscita" | "campanello";

type Strumento =
  | "calliope"
  | "accordo"
  | "basso"
  | "carillon"
  | "pad"
  | "campana"
  | "clarinetto"
  | "tamburo"
  | "bolla"
  | "vento"
  | "xilofono"
  | "legnetto";
type Nota = [inizio: number, durata: number, nota: string | number, strumento: Strumento, volume?: number];
type Brano = { bpm: number; battiti: number; note: Nota[]; volume: number };

/* ---------- note ---------- */

const SEMITONI: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function hz(n: string | number) {
  if (typeof n === "number") return n;
  const m = /^([A-G])(b|#)?(\d)$/.exec(n);
  if (!m) return 440;
  const s = SEMITONI[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (Number(m[3]) + 1) * 12;
  return 440 * Math.pow(2, (s - 69) / 12);
}

/* ---------- brani ---------- */

function valzerCirco(): Brano {
  // valzer da calliope, 3/4, 16 battute
  const melodia: [string, number][][] = [
    [["E5", 1], ["G5", 1], ["C6", 1]],
    [["B5", 2], ["A5", 1]],
    [["G5", 1], ["F5", 1], ["E5", 1]],
    [["D5", 3]],
    [["D5", 1], ["F5", 1], ["B5", 1]],
    [["A5", 2], ["G5", 1]],
    [["F5", 1], ["E5", 1], ["D5", 1]],
    [["C5", 3]],
    [["A5", 1], ["C6", 1], ["A5", 1]],
    [["G5", 2], ["E5", 1]],
    [["F5", 1], ["A5", 1], ["F5", 1]],
    [["E5", 3]],
    [["D5", 1], ["E5", 1], ["F5", 1]],
    [["G5", 1], ["B5", 1], ["D6", 1]],
    [["C6", 1], ["G5", 1], ["E5", 1]],
    [["C5", 3]],
  ];
  const accordi: Record<string, [string, string[]]> = {
    C: ["C3", ["E4", "G4", "C5"]],
    G: ["G2", ["D4", "G4", "B4"]],
    F: ["F2", ["F4", "A4", "C5"]],
  };
  const giro = ["C", "G", "C", "G", "G", "F", "G", "C", "F", "C", "F", "C", "G", "G", "C", "C"];
  const note: Nota[] = [];
  giro.forEach((a, b) => {
    const t = b * 3;
    const [basso, acc] = accordi[a];
    note.push([t, 0.9, basso, "basso", 0.9]);
    for (const k of [1, 2]) acc.forEach((n) => note.push([t + k, 0.45, n, "accordo", 0.22]));
    let x = t;
    melodia[b].forEach(([n, d]) => {
      note.push([x, d * 0.92, n, "calliope", 0.5]);
      x += d;
    });
  });
  return { bpm: 168, battiti: 48, note, volume: 0.55 };
}

function ambienteSala(): Brano {
  // accordi lenti e qualche campana: un sottofondo tranquillo
  const accordi = [
    ["A2", "E3", "C4", "E4"],
    ["F2", "C3", "A3", "E4"],
    ["C3", "G3", "E4", "G4"],
    ["G2", "D3", "B3", "D4"],
  ];
  const note: Nota[] = [];
  accordi.forEach((acc, i) => acc.forEach((n) => note.push([i * 8, 8.6, n, "pad", 0.16])));
  [
    [2, "E5"],
    [7, "A5"],
    [13, "G5"],
    [18, "C6"],
    [23, "D5"],
    [29, "E5"],
    [30.5, "B5"],
  ].forEach(([t, n]) => note.push([t as number, 4, n as string, "campana", 0.22]));
  return { bpm: 60, battiti: 32, note, volume: 0.5 };
}

function giostraGorgoglio(): Brano {
  // carillon saltellante in fa maggiore, con bolle che gorgogliano
  const m: (string | null)[] = [
    "C6", "A5", "F5", "A5", "C6", null, "F6", null,
    "Bb5", "G5", "E5", "G5", "Bb5", null, "C6", null,
    "D6", "Bb5", "F5", "Bb5", "D6", "C6", "Bb5", "A5",
    "G5", null, "E5", null, "F5", null, null, null,
  ];
  const note: Nota[] = [];
  m.forEach((n, i) => n && note.push([i * 0.5, 0.45, n, "carillon", 0.45]));
  [["F2", 0], ["C3", 2], ["C2", 4], ["G2", 6], ["Bb1", 8], ["F2", 10], ["C2", 12], ["F2", 14]].forEach(([n, t]) =>
    note.push([t as number, 0.5, n as string, "basso", 0.7]),
  );
  [1.75, 5.25, 9.75, 13.5, 14.25, 15.25].forEach((t, i) => note.push([t, 0.2, 380 + i * 90, "bolla", 0.35]));
  return { bpm: 116, battiti: 16, note, volume: 0.5 };
}

function paradaAnimali(): Brano {
  // clarinetto da parata in re maggiore, con grancassa e basso
  const melodia: [number, number, string][] = [
    [0, 1, "D5"], [1, 0.5, "E5"], [1.5, 0.5, "F#5"], [2, 1, "G5"], [3, 1, "A5"],
    [4, 1.5, "B5"], [5.5, 0.5, "A5"], [6, 1, "G5"], [7, 1, "F#5"],
    [8, 1, "E5"], [9, 0.5, "F#5"], [9.5, 0.5, "G5"], [10, 1, "A5"], [11, 1, "C#6"],
    [12, 3, "D6"],
  ];
  const note: Nota[] = melodia.map(([t, d, n]) => [t, d * 0.9, n, "clarinetto", 0.42]);
  for (let b = 0; b < 16; b++) {
    if (b % 2 === 0) note.push([b, 0.3, 60, "tamburo", b % 4 === 0 ? 0.75 : 0.45]);
    note.push([b + 0.5, 0.1, 0, "legnetto", 0.18]);
    const radice = b < 8 ? (b % 2 ? "A2" : "D2") : b < 12 ? (b % 2 ? "E2" : "A2") : b % 2 ? "A2" : "D2";
    note.push([b, 0.4, radice, "basso", 0.6]);
  }
  return { bpm: 108, battiti: 16, note, volume: 0.5 };
}

function carillonGirandola(): Brano {
  // valzer da carillon in fa maggiore, leggero, con accordi morbidi
  const melodia: [string, number][][] = [
    [["A5", 1], ["C6", 1], ["F6", 1]],
    [["E6", 2], ["C6", 1]],
    [["D6", 1], ["A5", 1], ["F5", 1]],
    [["F5", 1], ["G5", 1], ["Bb5", 1]],
    [["A5", 2], ["F5", 1]],
    [["G5", 1], ["E5", 1], ["C5", 1]],
    [["D5", 1], ["F5", 1], ["Bb5", 1]],
    [["A5", 3]],
  ];
  const giro: [string, string[]][] = [
    ["F2", ["F4", "A4", "C5"]],
    ["C3", ["E4", "G4", "C5"]],
    ["D3", ["D4", "F4", "A4"]],
    ["Bb2", ["D4", "F4", "Bb4"]],
    ["F2", ["F4", "A4", "C5"]],
    ["C3", ["E4", "G4", "C5"]],
    ["Bb2", ["D4", "F4", "Bb4"]],
    ["F2", ["F4", "A4", "C5"]],
  ];
  const note: Nota[] = [];
  giro.forEach(([r, acc], bar) => {
    const t = bar * 3;
    note.push([t, 0.8, r, "basso", 0.5]);
    acc.forEach((n) => note.push([t, 2.8, n, "pad", 0.07]));
    let x = t;
    melodia[bar].forEach(([n, d]) => {
      note.push([x, d, n, "carillon", 0.5]);
      x += d;
    });
  });
  return { bpm: 100, battiti: 24, note, volume: 0.5 };
}

const BRANI: Record<NomeBrano, () => Brano> = {
  "atrio-sala": ambienteSala,
  "atrio-circo": valzerCirco,
  "girandola-amen": carillonGirandola,
  gorgoglio: giostraGorgoglio,
  "animali-mai": paradaAnimali,
};

/* ---------- motore ---------- */

class Orchestra {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private bus!: GainNode; // musica
  private fx!: GainNode; // effetti
  private riverbero!: ConvolverNode;
  private rumore!: AudioBuffer;
  private timer: number | null = null;
  private brano: Brano | null = null;
  private nomeBrano: NomeBrano | null = null;
  private inizioGiro = 0;
  private prossimaNota = 0;
  private uscitaBrano: GainNode | null = null;
  attivo = true;

  constructor() {
    try {
      this.attivo = localStorage.getItem("stanza-audio") !== "no";
    } catch {
      this.attivo = true;
    }
  }

  /** Va chiamato dentro un gesto dell'utente. */
  avvia() {
    if (!this.attivo) return;
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      this.ctx = ctx;
      this.master = ctx.createGain();
      this.master.gain.value = 0.7;
      const comp = ctx.createDynamicsCompressor();
      this.master.connect(comp).connect(ctx.destination);
      this.bus = ctx.createGain();
      this.bus.gain.value = 0.5;
      this.fx = ctx.createGain();
      this.fx.gain.value = 0.7;
      this.riverbero = ctx.createConvolver();
      this.riverbero.buffer = this.impulso(2.2);
      const umido = ctx.createGain();
      umido.gain.value = 0.14;
      this.riverbero.connect(umido).connect(this.master);
      this.bus.connect(this.master);
      this.bus.connect(this.riverbero);
      this.fx.connect(this.master);
      this.fx.connect(this.riverbero);
      this.rumore = this.bufferRumore();
      // quando il browser sblocca davvero l'audio, il brano riparte dall'inizio
      ctx.addEventListener("statechange", () => {
        if (ctx.state === "running" && this.nomeBrano) this.avviaBrano(this.nomeBrano);
      });
      if (this.nomeBrano) this.avviaBrano(this.nomeBrano);
    }
    if (this.ctx.state !== "running") this.ctx.resume().catch(() => {});
  }

  get pronto() {
    return !!this.ctx && this.ctx.state === "running" && this.attivo;
  }

  setAttivo(si: boolean) {
    this.attivo = si;
    try {
      localStorage.setItem("stanza-audio", si ? "si" : "no");
    } catch {
      /* preferenza non salvata: pazienza */
    }
    if (!this.ctx) {
      if (si) this.avvia();
      return;
    }
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(si ? 0.7 : 0, t, 0.08);
    if (si) this.ctx.resume().catch(() => {});
  }

  /** Abbassa la musica (per esempio quando parla il video). */
  abbassa(si: boolean) {
    if (!this.ctx) return;
    this.bus.gain.setTargetAtTime(si ? 0.06 : 0.5, this.ctx.currentTime, 0.3);
  }

  suona(nome: NomeBrano) {
    if (this.nomeBrano === nome) return;
    this.nomeBrano = nome;
    if (this.ctx) this.avviaBrano(nome);
  }

  ferma() {
    this.nomeBrano = null;
    this.chiudiBrano();
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
  }

  private chiudiBrano() {
    if (!this.ctx || !this.uscitaBrano) return;
    const g = this.uscitaBrano;
    g.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    window.setTimeout(() => g.disconnect(), 2500);
    this.uscitaBrano = null;
  }

  private avviaBrano(nome: NomeBrano) {
    const ctx = this.ctx!;
    this.chiudiBrano();
    this.brano = BRANI[nome]();
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(this.brano.volume, ctx.currentTime + 0.3, 0.6);
    g.connect(this.bus);
    this.uscitaBrano = g;
    this.inizioGiro = ctx.currentTime + 0.35;
    this.prossimaNota = 0;
    if (this.timer === null) this.timer = window.setInterval(() => this.programma(), 60);
  }

  /* programma le note dei prossimi 250 ms; il brano si ripete all'infinito */
  private programma() {
    const ctx = this.ctx;
    const b = this.brano;
    if (!ctx || !b || !this.uscitaBrano) return;
    const sec = 60 / b.bpm;
    const durata = b.battiti * sec;
    if (this.inizioGiro + durata < ctx.currentTime) {
      // la scheda è rimasta in secondo piano: si riparte dall'inizio del giro
      this.inizioGiro = ctx.currentTime + 0.05;
      this.prossimaNota = 0;
    }
    const fine = ctx.currentTime + 0.25;
    const ordinate = b.note.slice().sort((x, y) => x[0] - y[0]);
    let giri = 0;
    while (giri < 2) {
      const n = ordinate[this.prossimaNota];
      if (!n) {
        this.inizioGiro += durata;
        this.prossimaNota = 0;
        giri++;
        continue;
      }
      const t = this.inizioGiro + n[0] * sec;
      if (t > fine) break;
      if (t >= ctx.currentTime - 0.05) this.strumento(n[3], t, n[1] * sec, hz(n[2]), n[4] ?? 0.5, this.uscitaBrano);
      this.prossimaNota++;
    }
  }

  /* ---------- strumenti ---------- */

  private inviluppo(g: GainNode, t: number, attacco: number, picco: number, durata: number, rilascio: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, picco), t + attacco);
    g.gain.setValueAtTime(Math.max(0.0002, picco), t + Math.max(attacco, durata));
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(attacco, durata) + rilascio);
  }

  private osc(tipo: OscillatorType, f: number, t: number, fine: number, uscita: AudioNode) {
    const o = this.ctx!.createOscillator();
    o.type = tipo;
    o.frequency.setValueAtTime(f, t);
    o.connect(uscita);
    o.start(t);
    o.stop(fine);
    return o;
  }

  private strumento(s: Strumento, t: number, d: number, f: number, v: number, out: AudioNode) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.connect(out);
    switch (s) {
      case "calliope": {
        const filtro = ctx.createBiquadFilter();
        filtro.type = "lowpass";
        filtro.frequency.value = 2600;
        filtro.connect(g);
        const vib = ctx.createOscillator();
        const vg = ctx.createGain();
        vib.frequency.value = 6;
        vg.gain.value = f * 0.006;
        vib.connect(vg);
        const a = this.osc("square", f, t, t + d + 0.2, filtro);
        const b = this.osc("triangle", f * 2, t, t + d + 0.2, filtro);
        vg.connect(a.frequency);
        vg.connect(b.frequency);
        vib.start(t);
        vib.stop(t + d + 0.2);
        this.inviluppo(g, t, 0.02, v * 0.18, d, 0.12);
        break;
      }
      case "accordo": {
        this.osc("triangle", f, t, t + d + 0.2, g);
        this.inviluppo(g, t, 0.01, v * 0.35, d * 0.4, 0.15);
        break;
      }
      case "basso": {
        this.osc("triangle", f, t, t + d + 0.3, g);
        this.osc("sine", f / 2, t, t + d + 0.3, g);
        this.inviluppo(g, t, 0.01, v * 0.5, d * 0.5, 0.2);
        break;
      }
      case "carillon": {
        this.osc("sine", f, t, t + 1.4, g);
        const h = ctx.createGain();
        h.gain.value = 0.25;
        h.connect(g);
        this.osc("sine", f * 4, t, t + 0.5, h);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v * 0.45, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
        break;
      }
      case "campana": {
        this.osc("sine", f, t, t + d + 0.2, g);
        const h = ctx.createGain();
        h.gain.value = 0.3;
        h.connect(g);
        this.osc("sine", f * 2.76, t, t + d * 0.6, h);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v * 0.4, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        break;
      }
      case "pad": {
        const filtro = ctx.createBiquadFilter();
        filtro.type = "lowpass";
        filtro.frequency.value = 700;
        filtro.Q.value = 0.5;
        filtro.connect(g);
        this.osc("sawtooth", f * 0.997, t, t + d + 2, filtro);
        this.osc("sawtooth", f * 1.004, t, t + d + 2, filtro);
        this.inviluppo(g, t, Math.min(2, d * 0.3), v * 0.25, d, 1.6);
        break;
      }
      case "clarinetto": {
        const filtro = ctx.createBiquadFilter();
        filtro.type = "lowpass";
        filtro.frequency.value = 1500;
        filtro.connect(g);
        const vib = ctx.createOscillator();
        const vg = ctx.createGain();
        vib.frequency.value = 5;
        vg.gain.setValueAtTime(0, t);
        vg.gain.linearRampToValueAtTime(f * 0.008, t + Math.min(0.4, d));
        vib.connect(vg);
        const a = this.osc("square", f, t, t + d + 0.2, filtro);
        vg.connect(a.frequency);
        vib.start(t);
        vib.stop(t + d + 0.2);
        this.inviluppo(g, t, 0.05, v * 0.22, d, 0.1);
        break;
      }
      case "xilofono": {
        // barra di legno: fondamentale e parziale acuta che si spengono presto
        this.osc("sine", f, t, t + 0.5, g);
        const h = ctx.createGain();
        h.gain.value = 0.35;
        h.connect(g);
        this.osc("sine", f * 3.93, t, t + 0.15, h);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v * 0.5, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
        break;
      }
      case "legnetto": {
        const o = this.osc("sine", 1750, t, t + 0.06, g);
        o.frequency.exponentialRampToValueAtTime(1400, t + 0.05);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v * 0.4, t + 0.002);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        break;
      }
      case "tamburo": {
        const o = this.osc("sine", 110, t, t + 0.4, g);
        o.frequency.exponentialRampToValueAtTime(45, t + 0.25);
        const n = ctx.createBufferSource();
        n.buffer = this.rumore;
        const fn = ctx.createBiquadFilter();
        fn.type = "lowpass";
        fn.frequency.value = 900;
        n.connect(fn).connect(g);
        n.start(t);
        n.stop(t + 0.15);
        g.gain.setValueAtTime(v * 0.6, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        break;
      }
      case "bolla": {
        const o = this.osc("sine", f, t, t + 0.18, g);
        o.frequency.exponentialRampToValueAtTime(f * 2.6, t + 0.12);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v * 0.3, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        break;
      }
      case "vento": {
        const n = ctx.createBufferSource();
        n.buffer = this.rumore;
        n.loop = true;
        const fn = ctx.createBiquadFilter();
        fn.type = "bandpass";
        fn.Q.value = 0.8;
        fn.frequency.setValueAtTime(300, t);
        fn.frequency.linearRampToValueAtTime(1200, t + d / 2);
        fn.frequency.linearRampToValueAtTime(400, t + d);
        n.connect(fn).connect(g);
        n.start(t);
        n.stop(t + d + 0.5);
        this.inviluppo(g, t, d / 2, v * 0.3, d / 2, d / 2);
        break;
      }
    }
  }

  /* ---------- effetti ---------- */

  effetto(nome: NomeEffetto) {
    if (!this.pronto) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime + 0.01;
    const g = ctx.createGain();
    g.connect(this.fx);
    switch (nome) {
      case "porta": {
        // cigolio e spiffero
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = 900;
        f.Q.value = 6;
        f.connect(g);
        const o = this.osc("sawtooth", 70, t, t + 0.7, f);
        o.frequency.linearRampToValueAtTime(130, t + 0.55);
        const trem = ctx.createOscillator();
        const tg = ctx.createGain();
        trem.frequency.value = 28;
        tg.gain.value = 40;
        trem.connect(tg).connect(o.frequency);
        trem.start(t);
        trem.stop(t + 0.7);
        this.inviluppo(g, t, 0.05, 0.25, 0.45, 0.2);
        this.soffio(t + 0.3, 0.8, 0.18, 400, 2400);
        break;
      }
      case "uscita":
        this.soffio(t, 0.7, 0.2, 2400, 300);
        break;
      case "leva-circo":
      case "leva-sala": {
        // fischietto a coulisse, su o giù
        const su = nome === "leva-circo";
        const o = this.osc("sine", su ? 500 : 1500, t, t + 0.7, g);
        o.frequency.exponentialRampToValueAtTime(su ? 1600 : 450, t + 0.6);
        const vib = ctx.createOscillator();
        const vg = ctx.createGain();
        vib.frequency.value = 9;
        vg.gain.value = 18;
        vib.connect(vg).connect(o.frequency);
        vib.start(t);
        vib.stop(t + 0.7);
        this.inviluppo(g, t, 0.03, 0.3, 0.5, 0.15);
        this.clic(t);
        break;
      }
      case "clacson": {
        // trombetta da clown: due note che si sgonfiano
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = 1100;
        f.Q.value = 1.2;
        f.connect(g);
        [0, 0.2].forEach((dt, i) => {
          const a = this.osc("square", i ? 330 : 392, t + dt, t + dt + 0.18, f);
          a.frequency.exponentialRampToValueAtTime(i ? 290 : 350, t + dt + 0.16);
          const b = this.osc("sawtooth", (i ? 330 : 392) * 1.01, t + dt, t + dt + 0.18, f);
          b.frequency.exponentialRampToValueAtTime(i ? 290 : 350, t + dt + 0.16);
        });
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.5, t + 0.02);
        g.gain.setValueAtTime(0.5, t + 0.15);
        g.gain.exponentialRampToValueAtTime(0.05, t + 0.19);
        g.gain.exponentialRampToValueAtTime(0.5, t + 0.22);
        g.gain.setValueAtTime(0.5, t + 0.34);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
        break;
      }
      case "pop": {
        const o = this.osc("sine", 900, t, t + 0.12, g);
        o.frequency.exponentialRampToValueAtTime(260, t + 0.1);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.35, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
        break;
      }
      case "sfoglia":
        this.soffio(t, 0.14, 0.12, 3000, 1500);
        break;
      case "campanello": {
        [0, 0.09].forEach((dt, i) => {
          const gg = ctx.createGain();
          gg.connect(g);
          this.osc("sine", i ? 1320 : 990, t + dt, t + dt + 0.8, gg);
          gg.gain.setValueAtTime(0.0001, t + dt);
          gg.gain.exponentialRampToValueAtTime(0.25, t + dt + 0.005);
          gg.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.7);
        });
        g.gain.value = 1;
        break;
      }
    }
  }

  private soffio(t: number, d: number, v: number, da: number, a: number) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.connect(this.fx);
    const n = ctx.createBufferSource();
    n.buffer = this.rumore;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.2;
    f.frequency.setValueAtTime(da, t);
    f.frequency.exponentialRampToValueAtTime(a, t + d);
    n.connect(f).connect(g);
    n.start(t);
    n.stop(t + d + 0.05);
    this.inviluppo(g, t, d * 0.35, v, d * 0.35, d * 0.3);
  }

  private clic(t: number) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.connect(this.fx);
    const n = ctx.createBufferSource();
    n.buffer = this.rumore;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 2000;
    n.connect(f).connect(g);
    n.start(t);
    n.stop(t + 0.03);
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
  }

  private bufferRumore() {
    const ctx = this.ctx!;
    const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  private impulso(secondi: number) {
    const ctx = this.ctx!;
    const n = Math.floor(ctx.sampleRate * secondi);
    const b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    }
    return b;
  }
}

let istanza: Orchestra | null = null;
export function orchestra() {
  if (!istanza) istanza = new Orchestra();
  return istanza;
}
