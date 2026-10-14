import type { Metadata } from "next";
import Link from "next/link";
import { opere } from "@/content/opere";

export const metadata: Metadata = { title: "La stanza" };

/* Segnaposto: la scena 3D arriva nella prossima tornata. Legge già l'elenco delle opere. */
export default function Stanza() {
  return (
    <section className="stanza-segnaposto">
      <div>
        <h1 style={{ fontSize: "var(--t-2xl)", marginBottom: "1rem" }}>La stanza</h1>
        <p>
          Qui ci sarà la scena 3D: {opere.length} porte, una per opera. Quelle segnate con l’avviso conducono alle opere
          per adulti.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/opere">Torna all’elenco delle opere</Link>
        </p>
      </div>
    </section>
  );
}
