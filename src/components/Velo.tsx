"use client";

import { useState, type ReactNode } from "react";

/* Nasconde le immagini di un'opera per adulti finché chi legge non sceglie di vederle. */
export function Velo({ avviso, children }: { avviso: string; children: ReactNode }) {
  const [aperto, setAperto] = useState(false);
  if (aperto) return <>{children}</>;
  return (
    <div className="avviso" role="region" aria-label="Avviso sui contenuti">
      <p>{avviso}</p>
      <button type="button" className="bottone secondario" onClick={() => setAperto(true)}>
        Mostra le immagini
      </button>
    </div>
  );
}
