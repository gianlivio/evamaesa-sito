import type { Opera } from "./tipi";

/*
 * Testi ripresi da evamaesa.it dove disponibili; il resto è segnaposto.
 * Immagini: segnaposto finché l'artista non fornisce i materiali.
 */

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet.";

export const opere: Opera[] = [
  {
    slug: "girandola-amen",
    titolo: "Girandola, Amen",
    anno: 2026,
    tipo: "performance",
    sottotitolo: "Teatrodanza con visual e installazione interattiva",
    sinossi:
      "Un corpo attraversa la parola e la parola attraversa il corpo: la poesia diventa gesto, respiro, traccia luminosa.",
    testo: [
      "Girandola, Amen prende avvio dall'immagine del seme dell'acero: segno di indipendenza e libertà, ma anche figura ambivalente che nella mitologia greca rimanda all'albero di Fobos, dio della paura. Come il seme che si stacca dalla pianta, volteggia nell'aria e, per germinare, necessita di un periodo di stratificazione, anche la performance attraversa una sospensione: un tempo di caduta, ascolto e trasformazione.",
      "I tarocchi agiscono come grammatica simbolica e come dispositivo rituale, in cui il corpo si fa soglia tra diversi livelli di realtà. La ricerca vocale e fisica si intreccia con suono, luce e proiezioni; il campionamento in tempo reale costruisce un'architettura sensibile che traduce l'interiorità in spazio.",
      "In filigrana, la performance interroga le tensioni sociali che attraversano il corpo esposto allo sguardo pubblico, evocando divisioni, disparità e violenze di genere. Lo spettacolo può anche scomporsi in installazioni interattive e materiche.",
    ],
    durata: "60 minuti",
    formato: "Sala, site-specific o all'aperto; solo",
    lingua: "Italiano, sottotitoli in inglese, spagnolo e francese",
    crediti: [
      { ruolo: "Regia e ideazione", nome: "Eva Maesa" },
      { ruolo: "Coreografia e performer", nome: "Eva Maesa" },
      { ruolo: "Visual, interazione e tecnica", nome: "Gianluca Lovreglio" },
      { ruolo: "Musiche", nome: "Francesca Valente, Filippo Poderini, Gianluca Lovreglio" },
    ],
    // DA VERIFICARE con l'artista se l'opera contiene nudo
    pubblicoAdulto: false,
    ancheInEventi: false,
    copertina: { alt: "Eva Maesa in scena in Girandola, Amen" },
    galleria: [
      { alt: "Girandola, Amen, scena 1" },
      { alt: "Girandola, Amen, scena 2" },
      { alt: "Girandola, Amen, scena 3" },
    ],
    schedaTecnica: "https://www.evamaesa.it/wp-content/uploads/2026/05/GIRANDOLA-AMEN-Scheda-Tecnica-1.pdf",
    date: [
      { data: "2026-05-20", luogo: "Lorem Teatro", citta: "Bologna" },
    ],
  },
  {
    slug: "animali-mai",
    titolo: "Animali MAI",
    tipo: "spettacolo",
    sottotitolo: "Spettacolo itinerante sui trampoli, con musica dal vivo",
    sinossi:
      "Gli sgruzzi, animali fantastici disubbidienti e generosi, attraversano la piazza accompagnati da una domatrice e dai musicisti.",
    testo: [
      "Spettacolo itinerante sui trampoli con musica dal vivo, giocoleria e fuoco su richiesta. Attraverso linguaggi non verbali e teatro fisico trasforma lo spazio urbano in un palcoscenico a cielo aperto.",
      "I costumi degli sgruzzi, ideati e costruiti da Monica Bellei, raccontano una storia che viene da un posto così lontano da non poterne più sapere il nome. Gli sgruzzi si sfidano in gare di abilità; chi li cavalca vorrebbe sposarsi ma non ci riesce mai, per la gelosia degli animali. Domatrice e musica ricordano a tutti l'importanza di restare insieme e rispettare le diversità.",
      "Il pubblico partecipa direttamente. Lo spettacolo si adatta a festival, piazze, manifestazioni culturali e feste di paese, e si può declinare su temi diversi. È senza parole, comprensibile a tutti, bambini e stranieri compresi.",
    ],
    formato: "Itinerante, all'aperto",
    lingua: "Senza parole",
    crediti: [
      { ruolo: "Ideazione e domatrice", nome: "Eva Maesa" },
      { ruolo: "Costumi", nome: "Monica Bellei" },
    ],
    pubblicoAdulto: false,
    ancheInEventi: true,
    copertina: { alt: "Uno sgruzzo sui trampoli in piazza" },
    galleria: [
      { alt: "Animali MAI, parata" },
      { alt: "Animali MAI, gli sgruzzi" },
    ],
    schedaTecnica: "https://www.evamaesa.it/wp-content/uploads/2026/05/Scheda-tecnica-Animali-MAI.pdf",
    date: [],
  },
  {
    slug: "gorgoglio",
    titolo: "Gorgoglìo",
    tipo: "spettacolo",
    sottotitolo: "Spettacolo di clown per bambini e adulti",
    sinossi:
      "Fruoth Fru, clownesse in bicicletta, trasforma i gorgoglii della vita quotidiana in un'orchestra di suoni e gesti.",
    testo: [
      "Fruoth Fru pratica stupore e immaginazione per curare gli incastri del tran tran quotidiano: scuola, lavoro, traffico, cucina, lavatrici, telefonate. Viaggia su Fruetta, una battecletta pesante o leggera a seconda della fretta.",
      "Il pubblico entra nella narrazione: bambini e adulti improvvisano, ridono insieme e scoprono il proprio clown interiore. Dietro le risate, lo spettacolo parla di amicizia, diversità, gentilezza, rispetto per la natura e per la donna.",
    ],
    durata: "Lorem minuti",
    formato: "Sala o all'aperto",
    lingua: "Italiano, con molta azione non verbale",
    crediti: [{ ruolo: "Ideazione e interpretazione", nome: "Eva Maesa" }],
    pubblicoAdulto: false,
    ancheInEventi: true,
    copertina: { alt: "Fruoth Fru, la clownesse di Gorgoglìo" },
    galleria: [{ alt: "Gorgoglìo, in scena" }],
    teaser: "https://www.evamaesa.it/wp-content/uploads/2026/04/Gorgoglio.mp4",
    date: [],
  },
  {
    // SEGNAPOSTO: serve a provare l'avviso sui contenuti. Da sostituire o rimuovere.
    slug: "opera-di-prova",
    titolo: "Titolo di prova",
    anno: 2025,
    tipo: "performance",
    sottotitolo: "Performance, segnaposto",
    sinossi: lorem,
    testo: [lorem, lorem],
    durata: "Lorem minuti",
    formato: "Lorem",
    lingua: "Lorem",
    crediti: [{ ruolo: "Ideazione e performer", nome: "Eva Maesa" }],
    pubblicoAdulto: true,
    avviso: "Questa performance contiene nudo. Le immagini sono riservate a un pubblico adulto.",
    ancheInEventi: false,
    copertina: { alt: "Immagine segnaposto" },
    galleria: [{ alt: "Immagine segnaposto" }, { alt: "Immagine segnaposto" }],
    date: [{ data: "2025-11-08", luogo: "Lorem Spazio", citta: "Roma" }],
  },
];

export function trovaOpera(slug: string) {
  return opere.find((o) => o.slug === slug);
}
