import type { Esperienza, FormatEvento } from "./tipi";

export const profilo = {
  nome: "Eva Maesa",
  alias: "MaEva",
  discipline: "Clownesse, trampoliera, performer, poeta",
  presentazione:
    "Teatro di strada, clown e teatrodanza. Spettacoli per piazze, feste e festival; performance di ricerca tra corpo, poesia e musica elettronica.",
  bio: [
    "Eva nasce a Foggia nel 1991 e si avvicina giovanissima al teatro. Continua tra Roma, Bologna e ovunque sia possibile, trasversale a ogni ambiente.",
    "Vicina al circo e alla danza, approfondisce la ricerca sul clown e la poetica del teatro dell'oppresso. Lavora anche come educatrice, favorendo integrazione e comunicazione non violenta.",
    "Poeta, performer, clownesse, trampoliera, attrice eclettica, scrive anche per gruppi di circo e teatro. Sperimenta una poetica fisica in dialogo con musica elettronica e dal vivo, cercando ostinatamente di dar voce all'indicibile.",
  ],
  cv: "https://www.evamaesa.it/wp-content/uploads/2026/05/Eva-Maesa-cv2.pdf",
  email: "evamaesamail@gmail.com",
  telefono: "+39 328 903 2760",
  telefonoHref: "+393289032760",
  instagram: "https://www.instagram.com/evalelapena/",
  instagramNome: "evalelapena",
  zona: "Lorem ipsum: zona servita da definire",
};

export const esperienze: Esperienza[] = [
  {
    tipo: "formazione",
    titolo: "PATS, Roma",
    descrizione: "Percorso di formazione attoriale.",
  },
  {
    tipo: "formazione",
    titolo: "Accademia Pietro Sharoff, Roma",
    descrizione: "Ammessa direttamente al secondo anno.",
  },
  {
    tipo: "compagnia",
    titolo: "Ensamble Lodi",
    descrizione: "Lavoro e vita in compagnia.",
  },
  {
    tipo: "educazione",
    titolo: "Educatrice",
    descrizione: "Laboratori di integrazione e comunicazione non violenta.",
  },
  {
    anno: "Lorem",
    tipo: "collaborazione",
    titolo: "Collaborazione di prova",
    descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const occasioni = [
  "Feste di compleanno e feste per bambini",
  "Matrimoni e cerimonie",
  "Anniversari e lauree",
  "Eventi aziendali, convention, inaugurazioni",
  "Piazze, sagre, festival",
  "Centri commerciali",
];

export const formatEventi: FormatEvento[] = [
  {
    slug: "base",
    nome: "Base",
    descrizione: "Accoglienza e gioco per tutta la durata della festa.",
    contenuto: [
      "Accoglienza",
      "Sculture di palloncini",
      "Giochi di gruppo",
      "Musica e pupazzi",
      "Truccabimbi",
    ],
    durata: "Lorem",
  },
  {
    slug: "spettacolo",
    nome: "Con spettacolo",
    descrizione: "Il format Base con uno spettacolo al centro della festa.",
    contenuto: [
      "Spettacolo a scelta tra clownerie e burattini",
      "Tutto il format Base",
      "Giocoleria",
    ],
    durata: "Lorem",
  },
  {
    slug: "trampoli",
    nome: "Trampoli",
    descrizione:
      "Accoglienza d'impatto all'ingresso e interazione itinerante tra gli ospiti, con momenti pensati per foto e video.",
    contenuto: [
      "Costumi a tema: elegante, carnevale, fantasy, natalizio, aziendale",
      "Costumi luminosi con ali",
      "Pose guidate e piccole coreografie",
      "Su richiesta: musica dal vivo, giocoleria, oggetti scenici",
    ],
    durata: "45, 60 o 90 minuti, anche in 2–3 uscite da 15–30 minuti",
    requisiti:
      "Soffitti alti e un percorso sicuro. La valutazione della location è inclusa.",
  },
];
