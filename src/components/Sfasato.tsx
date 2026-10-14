import type { CSSProperties, ElementType } from "react";

/*
 * Titolo con lettere che entrano fuori asse e si assestano al caricamento.
 * Spostamenti deterministici (derivati dal carattere e dalla posizione),
 * così server e client generano lo stesso markup.
 * `giocoso`: al passaggio del mouse le lettere dondolano di nuovo.
 */

function scarto(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x); // 0..1
}

type Props = {
  testo: string;
  as?: ElementType;
  giocoso?: boolean;
  className?: string;
};

export function Sfasato({ testo, as: Tag = "h1", giocoso = false, className }: Props) {
  let i = 0;
  const parole = testo.split(" ");
  return (
    <Tag className={["sfasato", giocoso && "giocoso", className].filter(Boolean).join(" ")} aria-label={testo}>
      {parole.map((parola, pi) => (
        <span key={pi} aria-hidden="true">
          <span className="parola">
            {Array.from(parola).map((c, ci) => {
              const n = i++;
              const seed = c.charCodeAt(0) + n * 7;
              const dy = (scarto(seed) - 0.5) * 0.5; // em
              const r = (scarto(seed + 3) - 0.5) * 24; // gradi
              return (
                <span
                  key={ci}
                  className="lettera"
                  style={
                    {
                      "--i": n,
                      "--dy": `${dy.toFixed(3)}em`,
                      "--r": `${r.toFixed(1)}deg`,
                    } as CSSProperties
                  }
                >
                  {c}
                </span>
              );
            })}
          </span>
          {pi < parole.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
