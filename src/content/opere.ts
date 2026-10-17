import type { Opera } from "./tipi";

/*
 * Testi ripresi da evamaesa.it dove disponibili; il resto è segnaposto.
 * Immagini da evamaesa.it, ridimensionate in /public/media.
 * Credito "Dante Farricella" sulle foto con il suo nome o con i prefissi _DFZ/_Z636 nel file originale.
 */

const df = "Dante Farricella";
const g = (n: number, alt: string) => ({ src: `/media/girandola-amen/${String(n).padStart(2, "0")}.jpg`, alt, credito: df });

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
    // le foto di scena mostrano nudo parziale
    pubblicoAdulto: true,
    avviso: "Le immagini di questa performance contengono nudo e sono riservate a un pubblico adulto.",
    ancheInEventi: false,
    copertina: g(1, "Il volto di Eva Maesa che affiora da un drappo rosso"),
    galleria: [
      g(2, "Eva Maesa illuminata da una luce blu, con il braccio teso"),
      g(3, "Piedi nudi su un telo, sotto una veste di carta"),
      g(4, "La performer con lo sguardo verso l'alto, oggetti sospesi in aria"),
      g(5, "La performer di profilo e la sua ombra sulla parete"),
      g(6, "La performer con una benda gialla sugli occhi"),
      g(7, "La performer con le mani dipinte di nero, rivolte verso il pubblico"),
      g(8, "La performer con un braccio alzato, in movimento"),
      g(9, "Una figura in bianco di spalle e un nastro rosso in volo"),
      g(10, "La performer che sistema un'installazione di teli bianchi"),
      g(11, "La performer di spalle, in controluce"),
      g(12, "La performer che disegna su un cubo di tessuto bianco"),
      g(13, "La performer con una campana tibetana e una sciarpa rossa"),
      g(14, "La performer avvolta in bende di tessuto bianco"),
      g(15, "La locandina di Girandola, Amen"),
      g(16, "La performer avvolta in un telo di plastica trasparente"),
      g(17, "La scena con l'installazione e la performer in piedi"),
    ],
    schedaTecnica: "/documenti/girandola-amen-scheda-tecnica.pdf",
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
    copertina: { src: "/media/animali-mai/01.jpg", alt: "Gli sgruzzi sui trampoli sotto le volte di un sotterraneo" },
    galleria: [{ src: "/media/animali-mai/02.jpg", alt: "La parata degli sgruzzi in un parco, tra il pubblico" }],
    schedaTecnica: "/documenti/animali-mai-scheda-tecnica.pdf",
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
    copertina: {
      src: "/media/gorgoglio/01.jpg",
      alt: "Fruoth Fru con il naso rosso, in piedi tra gli oggetti di scena, con un nastro in volo",
      credito: df,
    },
    galleria: [
      { src: "/media/gorgoglio/02.jpg", alt: "Fruoth Fru seduta a terra mentre fa giocoleria con tre palline", credito: df },
      { src: "/media/gorgoglio/03.jpg", alt: "Fruoth Fru mostra un piccolo maglione a righe", credito: df },
      { src: "/media/gorgoglio/04.jpg", alt: "Fruoth Fru con un palloncino lungo teso tra le braccia", credito: df },
      { src: "/media/gorgoglio/05.jpg", alt: "Fruoth Fru con una bambina e un palloncino, in giardino" },
      { src: "/media/gorgoglio/06.jpg", alt: "Fruoth Fru sorride con il naso rosso e il cappello" },
    ],
    teaser: "/media/gorgoglio/teaser.mp4",
    date: [],
  },
];

export function trovaOpera(slug: string) {
  return opere.find((o) => o.slug === slug);
}
