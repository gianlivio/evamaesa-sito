import type { Esperienza, FormatEvento, Media } from "./tipi";
import type { Lingua, Tr } from "@/i18n/lingue";

const recapiti = {
  nome: "Eva Maesa",
  alias: "MaEva",
  cv: "/documenti/eva-maesa-cv.pdf",
  email: "evamaesamail@gmail.com",
  telefono: "+39 328 903 2760",
  telefonoHref: "+393289032760",
  instagram: "https://www.instagram.com/evalelapena/",
  instagramNome: "evalelapena",
  ritratto: "/media/ritratti/02.jpg",
  creditoRitratto: "Emanuele Fabiano",
};

const testiProfilo: { discipline: Tr; presentazione: Tr; bio: Tr[]; zona: Tr } = {
  discipline: {
    it: "Performer versatile: attrice, clownesse, trampoliera, poeta",
    en: "Versatile performer: actress, clown, stilt walker, poet",
    fr: "Performeuse polyvalente : comédienne, clowne, échassière, poète",
  },
  presentazione: {
    it: "Ha basi solide nella recitazione e si cala in ogni ruolo, dal clown delle feste per bambini al teatro di strada, fino alla performance di ricerca tra corpo, poesia e musica. Lo fa per passione: per lei la vita stessa è una performance.",
    en: "With solid acting foundations, she steps into any role, from the clown at a children's party to street theatre and research performance between body, poetry and music. She does it out of passion: for her, life itself is a performance.",
    fr: "Forte d'une solide formation de comédienne, elle se glisse dans tous les rôles, du clown des fêtes d'enfants au théâtre de rue, jusqu'à la performance de recherche entre corps, poésie et musique. Elle le fait par passion : pour elle, la vie même est une performance.",
  },
  bio: [
    {
      it: "Eva Maesa è una performer: attrice di formazione, clownesse, trampoliera, poeta. Recita, gioca, danza e scrive con la stessa dedizione, e porta in scena ogni ruolo che le viene chiesto. Fa questo lavoro per passione, prima che per mestiere.",
      en: "Eva Maesa is a performer: a trained actress, clown, stilt walker and poet. She acts, plays, dances and writes with the same dedication, and brings to the stage any role she is asked to play. She does this work out of passion before anything else.",
      fr: "Eva Maesa est une performeuse : comédienne de formation, clowne, échassière, poète. Elle joue, s'amuse, danse et écrit avec la même passion, et porte sur scène tous les rôles qu'on lui confie. Elle fait ce métier par passion, avant tout.",
    },
    {
      it: "Eva nasce a Foggia nel 1991 e si avvicina giovanissima al teatro. Continua tra Roma, Bologna e ovunque sia possibile, trasversale a ogni ambiente.",
      en: "Eva was born in Foggia in 1991 and started in theatre at a very young age. She went on in Rome, Bologna and wherever she could, across every kind of setting.",
      fr: "Eva naît à Foggia en 1991 et découvre le théâtre très jeune. Elle poursuit entre Rome, Bologne et partout où c'est possible, à travers tous les milieux.",
    },
    {
      it: "Vicina al circo e alla danza, approfondisce la ricerca sul clown e la poetica del teatro dell'oppresso. Lavora anche come educatrice, favorendo integrazione e comunicazione non violenta.",
      en: "Close to circus and dance, she has explored clowning and the poetics of the Theatre of the Oppressed. She also works as an educator, fostering inclusion and non-violent communication.",
      fr: "Proche du cirque et de la danse, elle approfondit la recherche sur le clown et la poétique du théâtre de l'opprimé. Elle travaille aussi comme éducatrice, en favorisant l'intégration et la communication non violente.",
    },
    {
      it: "Poeta, performer, clownesse, trampoliera, attrice eclettica, scrive anche per gruppi di circo e teatro. Sperimenta una poetica fisica in dialogo con musica elettronica e dal vivo, cercando ostinatamente di dar voce all'indicibile.",
      en: "Poet, performer, clown, stilt walker and versatile actress, she also writes for circus and theatre groups. She experiments with a physical poetics in dialogue with electronic and live music, stubbornly trying to give voice to the unspeakable.",
      fr: "Poète, performeuse, clowne, échassière, comédienne éclectique, elle écrit aussi pour des compagnies de cirque et de théâtre. Elle expérimente une poétique physique en dialogue avec la musique électronique et live, cherchant obstinément à donner voix à l'indicible.",
    },
  ],
  zona: {
    it: "Disponibile nel Nord Italia e nel sud della Francia.",
    en: "Available across northern Italy and southern France.",
    fr: "Disponible dans le nord de l'Italie et le sud de la France.",
  },
};

export function profiloIn(l: Lingua) {
  return {
    ...recapiti,
    discipline: testiProfilo.discipline[l],
    presentazione: testiProfilo.presentazione[l],
    bio: testiProfilo.bio.map((b) => b[l]),
    zona: testiProfilo.zona[l],
  };
}

const esperienzeS: { anno?: string; tipo: Esperienza["tipo"]; titolo: Tr; descrizione: Tr }[] = [
  {
    tipo: "formazione",
    titolo: { it: "PATS, Roma", en: "PATS, Rome", fr: "PATS, Rome" },
    descrizione: { it: "Percorso di formazione attoriale.", en: "Actor training.", fr: "Formation d'actrice." },
  },
  {
    tipo: "formazione",
    titolo: { it: "Accademia Pietro Sharoff, Roma", en: "Pietro Sharoff Academy, Rome", fr: "Académie Pietro Sharoff, Rome" },
    descrizione: { it: "Ammessa direttamente al secondo anno.", en: "Admitted directly to the second year.", fr: "Admise directement en deuxième année." },
  },
  {
    tipo: "compagnia",
    titolo: { it: "Ensamble Lodi", en: "Ensamble Lodi", fr: "Ensamble Lodi" },
    descrizione: { it: "Lavoro e vita in compagnia.", en: "Working and living with the company.", fr: "Travail et vie en compagnie." },
  },
  {
    tipo: "educazione",
    titolo: { it: "Educatrice", en: "Educator", fr: "Éducatrice" },
    descrizione: {
      it: "Laboratori di integrazione e comunicazione non violenta.",
      en: "Workshops on inclusion and non-violent communication.",
      fr: "Ateliers d'intégration et de communication non violente.",
    },
  },
  {
    anno: "Lorem",
    tipo: "collaborazione",
    titolo: { it: "Collaborazione di prova", en: "Sample collaboration", fr: "Collaboration d'exemple" },
    descrizione: {
      it: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  },
];

export const esperienzeIn = (l: Lingua): Esperienza[] =>
  esperienzeS.map((e) => ({ anno: e.anno, tipo: e.tipo, titolo: e.titolo[l], descrizione: e.descrizione[l] }));

const occasioniS: Tr[] = [
  { it: "Feste di compleanno e feste per bambini", en: "Birthday and children's parties", fr: "Anniversaires et fêtes d'enfants" },
  { it: "Matrimoni e cerimonie", en: "Weddings and ceremonies", fr: "Mariages et cérémonies" },
  { it: "Anniversari e lauree", en: "Anniversaries and graduations", fr: "Anniversaires de mariage et remises de diplômes" },
  { it: "Eventi aziendali, convention, inaugurazioni", en: "Corporate events, conventions, openings", fr: "Événements d'entreprise, congrès, inaugurations" },
  { it: "Piazze, sagre, festival", en: "Town squares, fairs, festivals", fr: "Places, fêtes de village, festivals" },
  { it: "Centri commerciali", en: "Shopping centres", fr: "Centres commerciaux" },
];
export const occasioniIn = (l: Lingua) => occasioniS.map((o) => o[l]);

const formatS: { slug: string; nome: Tr; descrizione: Tr; contenuto: Tr[]; durata?: Tr; requisiti?: Tr }[] = [
  {
    slug: "base",
    nome: { it: "Base", en: "Basic", fr: "Base" },
    descrizione: {
      it: "Accoglienza e gioco per tutta la durata della festa.",
      en: "Welcome and games for the whole party.",
      fr: "Accueil et jeux pendant toute la fête.",
    },
    contenuto: [
      { it: "Accoglienza", en: "Welcoming the guests", fr: "Accueil" },
      { it: "Sculture di palloncini", en: "Balloon modelling", fr: "Sculptures de ballons" },
      { it: "Giochi di gruppo", en: "Group games", fr: "Jeux de groupe" },
      { it: "Musica e pupazzi", en: "Music and puppets", fr: "Musique et marionnettes" },
      { it: "Truccabimbi", en: "Face painting", fr: "Maquillage pour enfants" },
    ],
    durata: { it: "Lorem", en: "Lorem", fr: "Lorem" },
  },
  {
    slug: "spettacolo",
    nome: { it: "Con spettacolo", en: "With a show", fr: "Avec spectacle" },
    descrizione: {
      it: "Il format Base con uno spettacolo al centro della festa.",
      en: "The Basic format with a show at the heart of the party.",
      fr: "La formule Base avec un spectacle au cœur de la fête.",
    },
    contenuto: [
      { it: "Spettacolo a scelta tra clownerie e burattini", en: "A clown or puppet show, your choice", fr: "Spectacle au choix : clown ou marionnettes" },
      { it: "Tutto il format Base", en: "Everything in the Basic format", fr: "Toute la formule Base" },
      { it: "Giocoleria", en: "Juggling", fr: "Jonglerie" },
    ],
    durata: { it: "Lorem", en: "Lorem", fr: "Lorem" },
  },
  {
    slug: "trampoli",
    nome: { it: "Trampoli", en: "Stilts", fr: "Échasses" },
    descrizione: {
      it: "Accoglienza d'impatto all'ingresso e interazione itinerante tra gli ospiti, con momenti pensati per foto e video.",
      en: "A striking welcome at the entrance and roaming interaction among the guests, with moments designed for photos and video.",
      fr: "Un accueil spectaculaire à l'entrée et une animation déambulatoire parmi les invités, avec des moments pensés pour les photos et les vidéos.",
    },
    contenuto: [
      {
        it: "Costumi a tema: elegante, carnevale, fantasy, natalizio, aziendale",
        en: "Themed costumes: elegant, carnival, fantasy, Christmas, corporate",
        fr: "Costumes à thème : élégant, carnaval, fantasy, Noël, entreprise",
      },
      { it: "Costumi luminosi con ali", en: "Light-up costumes with wings", fr: "Costumes lumineux avec ailes" },
      { it: "Pose guidate e piccole coreografie", en: "Guided poses and short choreographies", fr: "Poses guidées et petites chorégraphies" },
      {
        it: "Su richiesta: musica dal vivo, giocoleria, oggetti scenici",
        en: "On request: live music, juggling, stage props",
        fr: "Sur demande : musique live, jonglerie, accessoires de scène",
      },
    ],
    durata: {
      it: "45, 60 o 90 minuti, anche in 2–3 uscite da 15–30 minuti",
      en: "45, 60 or 90 minutes, also in 2–3 sets of 15–30 minutes",
      fr: "45, 60 ou 90 minutes, aussi en 2 ou 3 passages de 15 à 30 minutes",
    },
    requisiti: {
      it: "Soffitti alti e un percorso sicuro. La valutazione della location è inclusa.",
      en: "High ceilings and a safe route. A venue check is included.",
      fr: "Plafonds hauts et parcours sûr. La visite du lieu est incluse.",
    },
  },
];

export const formatEventiIn = (l: Lingua): FormatEvento[] =>
  formatS.map((f) => ({
    slug: f.slug,
    nome: f.nome[l],
    descrizione: f.descrizione[l],
    contenuto: f.contenuto.map((c) => c[l]),
    durata: f.durata?.[l],
    requisiti: f.requisiti?.[l],
  }));

const df = "Dante Farricella";
const galleriaS: { src: string; alt: Tr; credito?: string }[] = [
  {
    src: "/media/eventi/02.jpg",
    alt: { it: "Eva sui trampoli con giacca e cappello, sotto un portico", en: "Eva on stilts in a jacket and hat, under an arcade", fr: "Eva sur échasses, veste et chapeau, sous une arcade" },
    credito: df,
  },
  {
    src: "/media/eventi/03.jpg",
    alt: { it: "Eva sui trampoli con un nastro, in un cortile", en: "Eva on stilts with a ribbon, in a courtyard", fr: "Eva sur échasses avec un ruban, dans une cour" },
    credito: df,
  },
  {
    src: "/media/eventi/05.jpg",
    alt: {
      it: "Eva sui trampoli in costume bianco davanti a un portone",
      en: "Eva on stilts in a white costume in front of a doorway",
      fr: "Eva sur échasses en costume blanc devant un portail",
    },
    credito: df,
  },
  {
    src: "/media/eventi/04.jpg",
    alt: { it: "Eva sui trampoli tra le piante, con un cappello verde", en: "Eva on stilts among the plants, in a green hat", fr: "Eva sur échasses parmi les plantes, chapeau vert" },
    credito: df,
  },
  {
    src: "/media/eventi/01.jpg",
    alt: { it: "Eva sui trampoli con pantaloni a colori, in un prato", en: "Eva on stilts in colourful trousers, on a lawn", fr: "Eva sur échasses en pantalon coloré, dans un pré" },
  },
  {
    src: "/media/eventi/07.jpg",
    alt: { it: "Eva che si prepara a salire sui trampoli", en: "Eva getting ready to climb onto her stilts", fr: "Eva se prépare à monter sur ses échasses" },
    credito: df,
  },
  {
    src: "/media/eventi/08.jpg",
    alt: {
      it: "Una clown con la parrucca colorata gioca con una bambina in piazza",
      en: "A clown in a colourful wig playing with a little girl in a square",
      fr: "Une clowne en perruque colorée joue avec une petite fille sur une place",
    },
  },
  {
    src: "/media/eventi/09.jpg",
    alt: {
      it: "Fruoth Fru racconta una storia a una bambina, in un giardino",
      en: "Fruoth Fru telling a story to a little girl, in a garden",
      fr: "Fruoth Fru raconte une histoire à une petite fille, dans un jardin",
    },
  },
];
/* Ritratti per casting e stampa: crediti solo dove il fotografo è noto (dai dati dei file) */
const ritrattiS: { src: string; alt: Tr; credito?: string; fuoco?: string }[] = [
  {
    src: "/media/ritratti/03.jpg",
    alt: { it: "Primo piano di Eva Maesa con la giacca sulla spalla, contro un muro chiaro", en: "Close-up of Eva Maesa with a jacket over her shoulder, against a pale wall", fr: "Gros plan d'Eva Maesa, veste sur l'épaule, contre un mur clair" },
    credito: df,
  },
  {
    src: "/media/ritratti/04.jpg",
    fuoco: "78% 50%",
    alt: { it: "Eva Maesa che ride, in bianco e nero", en: "Eva Maesa laughing, in black and white", fr: "Eva Maesa qui rit, en noir et blanc" },
  },
  {
    src: "/media/ritratti/05.jpg",
    alt: { it: "Eva Maesa sorridente con il viso tra le mani", en: "Eva Maesa smiling with her face in her hands", fr: "Eva Maesa souriante, le visage entre les mains" },
  },
  {
    src: "/media/ritratti/06.jpg",
    alt: { it: "Eva Maesa a figura intera, in salopette bianca e anfibi", en: "Full-length shot of Eva Maesa in white dungarees and boots", fr: "Eva Maesa en pied, salopette blanche et rangers" },
  },
  {
    src: "/media/ritratti/07.jpg",
    alt: { it: "Eva Maesa in salopette bianca, con un braccio dietro la testa", en: "Eva Maesa in white dungarees, one arm behind her head", fr: "Eva Maesa en salopette blanche, un bras derrière la tête" },
  },
  {
    src: "/media/ritratti/08.jpg",
    fuoco: "25% 50%",
    alt: { it: "Eva Maesa di tre quarti, con lo sguardo lontano", en: "Eva Maesa in three-quarter view, gazing into the distance", fr: "Eva Maesa de trois quarts, le regard au loin" },
  },
];
export const ritrattiIn = (l: Lingua): Media[] => ritrattiS.map((g) => ({ src: g.src, alt: g.alt[l], credito: g.credito, fuoco: g.fuoco }));

export const galleriaEventiIn = (l: Lingua): Media[] => galleriaS.map((g) => ({ src: g.src, alt: g.alt[l], credito: g.credito }));
