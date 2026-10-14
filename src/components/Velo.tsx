"use client";

import { useEffect, useState, type ReactNode } from "react";

/* Nasconde le immagini di un'opera riservata a un pubblico adulto finché chi legge non sceglie di vederle. */
export function Velo({ avviso, children }: { avviso: string; children: ReactNode }) {
  const [aperto, setAperto] = useState(false);
  // chi ha già confermato nella stanza arriva con ?immagini=1 e non deve confermare due volte
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("immagini") === "1") setAperto(true);
  }, []);
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
