import type { Opera } from "./tipi";
import type { Lingua, Tr } from "@/i18n/lingue";

/*
 * Testi ripresi da evamaesa.it dove disponibili (italiano), tradotti in inglese e francese.
 * Immagini da evamaesa.it, ridimensionate in /public/media.
 * Credito "Dante Farricella" sulle foto con il suo nome o con i prefissi _DFZ/_Z636 nel file originale.
 */

type MediaS = { src: string; alt: Tr; credito?: string; fuoco?: string };
type OperaSorgente = {
  slug: string;
  titolo: string;
  anno?: number;
  tipo: Opera["tipo"];
  sottotitolo: Tr;
  sinossi: Tr;
  testo: Tr[];
  durata?: Tr;
  formato?: Tr;
  lingua?: Tr;
  crediti: { ruolo: Tr; nome: string }[];
  pubblicoAdulto: boolean;
  avviso?: Tr;
  ancheInEventi: boolean;
  copertina: MediaS;
  galleria: MediaS[];
  teaser?: string;
  youtube?: string;
  inRepertorio?: boolean;
  schedaTecnica?: string;
  date: Opera["date"];
};

const df = "Dante Farricella";
const g = (n: number, it: string, en: string, fr: string): MediaS => ({
  src: `/media/girandola-amen/${String(n).padStart(2, "0")}.jpg`,
  alt: { it, en, fr },
  credito: df,
});

const sorgente: OperaSorgente[] = [
  {
    slug: "girandola-amen",
    titolo: "Girandola, Amen",
    anno: 2026,
    tipo: "performance",
    sottotitolo: {
      it: "Teatrodanza con visual e installazione interattiva",
      en: "Dance theatre with visuals and an interactive installation",
      fr: "Danse-théâtre avec projections et installation interactive",
    },
    sinossi: {
      it: "Un corpo attraversa la parola e la parola attraversa il corpo: la poesia diventa gesto, respiro, traccia luminosa.",
      en: "A body passes through the word and the word passes through the body: poetry becomes gesture, breath, a trace of light.",
      fr: "Un corps traverse la parole et la parole traverse le corps : la poésie devient geste, souffle, trace lumineuse.",
    },
    testo: [
      {
        it: "Girandola, Amen prende avvio dall'immagine del seme dell'acero: segno di indipendenza e libertà, ma anche figura ambivalente che nella mitologia greca rimanda all'albero di Fobos, dio della paura. Come il seme che si stacca dalla pianta, volteggia nell'aria e, per germinare, necessita di un periodo di stratificazione, anche la performance attraversa una sospensione: un tempo di caduta, ascolto e trasformazione.",
        en: "Girandola, Amen starts from the image of the maple seed: a sign of independence and freedom, but also an ambivalent figure that in Greek mythology recalls the tree of Phobos, god of fear. Like the seed that leaves the tree, spins through the air and needs a period of stratification before it can germinate, the performance passes through a suspension: a time of falling, listening and transformation.",
        fr: "Girandola, Amen part de l'image de la samare de l'érable : signe d'indépendance et de liberté, mais aussi figure ambivalente qui, dans la mythologie grecque, renvoie à l'arbre de Phobos, dieu de la peur. Comme la graine qui se détache de l'arbre, tournoie dans l'air et doit passer par une stratification pour germer, la performance traverse une suspension : un temps de chute, d'écoute et de transformation.",
      },
      {
        it: "I tarocchi agiscono come grammatica simbolica e come dispositivo rituale, in cui il corpo si fa soglia tra diversi livelli di realtà. La ricerca vocale e fisica si intreccia con suono, luce e proiezioni; il campionamento in tempo reale costruisce un'architettura sensibile che traduce l'interiorità in spazio.",
        en: "The tarot works as a symbolic grammar and as a ritual device, in which the body becomes a threshold between different levels of reality. Vocal and physical research intertwines with sound, light and projections; live sampling builds a sensitive architecture that turns inner life into space.",
        fr: "Le tarot agit comme une grammaire symbolique et comme un dispositif rituel, où le corps devient seuil entre plusieurs niveaux de réalité. La recherche vocale et physique se mêle au son, à la lumière et aux projections ; l'échantillonnage en temps réel construit une architecture sensible qui traduit l'intériorité en espace.",
      },
      {
        it: "In filigrana, la performance interroga le tensioni sociali che attraversano il corpo esposto allo sguardo pubblico, evocando divisioni, disparità e violenze di genere. Lo spettacolo può anche scomporsi in installazioni interattive e materiche.",
        en: "Underneath, the performance questions the social tensions that run through a body exposed to the public gaze, evoking divisions, inequalities and gender violence. The piece can also be broken down into interactive, material installations.",
        fr: "En filigrane, la performance interroge les tensions sociales qui traversent le corps exposé au regard public, en évoquant divisions, inégalités et violences de genre. Le spectacle peut aussi se décomposer en installations interactives et matérielles.",
      },
    ],
    durata: { it: "60 minuti", en: "60 minutes", fr: "60 minutes" },
    formato: {
      it: "Sala, site-specific o all'aperto; solo",
      en: "Indoor, site-specific or outdoor; solo",
      fr: "Salle, in situ ou en plein air ; solo",
    },
    lingua: {
      it: "Italiano, sottotitoli in inglese, spagnolo e francese",
      en: "Italian, with English, Spanish and French subtitles",
      fr: "Italien, sous-titres en anglais, espagnol et français",
    },
    crediti: [
      { ruolo: { it: "Regia e ideazione", en: "Direction and concept", fr: "Mise en scène et conception" }, nome: "Eva Maesa" },
      { ruolo: { it: "Coreografia e performer", en: "Choreography and performer", fr: "Chorégraphie et interprète" }, nome: "Eva Maesa" },
      {
        ruolo: { it: "Visual, interazione e tecnica", en: "Visuals, interaction and tech", fr: "Projections, interaction et technique" },
        nome: "Gianluca Lovreglio",
      },
      { ruolo: { it: "Musiche", en: "Music", fr: "Musique" }, nome: "Francesca Valente, Filippo Poderini, Gianluca Lovreglio" },
    ],
    pubblicoAdulto: false,
    ancheInEventi: false,
    copertina: g(1, "Il volto di Eva Maesa che affiora da un drappo rosso", "Eva Maesa's face emerging from a red drape", "Le visage d'Eva Maesa qui émerge d'un drapé rouge"),
    galleria: [
      g(2, "Eva Maesa illuminata da una luce blu, con il braccio teso", "Eva Maesa lit in blue, her arm stretched out", "Eva Maesa éclairée de bleu, le bras tendu"),
      g(3, "Piedi nudi su un telo, sotto una veste di carta", "Bare feet on a sheet, under a paper dress", "Pieds nus sur une bâche, sous une robe de papier"),
      g(4, "La performer con lo sguardo verso l'alto, oggetti sospesi in aria", "The performer looking up, objects hanging in the air", "La performeuse regarde vers le haut, des objets suspendus en l'air"),
      g(5, "La performer di profilo e la sua ombra sulla parete", "The performer in profile and her shadow on the wall", "La performeuse de profil et son ombre sur le mur"),
      g(6, "La performer con una benda gialla sugli occhi", "The performer with a yellow blindfold", "La performeuse avec un bandeau jaune sur les yeux"),
      g(7, "La performer con le mani dipinte di nero, rivolte verso il pubblico", "The performer with black-painted hands turned to the audience", "La performeuse, mains peintes en noir tournées vers le public"),
      g(8, "La performer con un braccio alzato, in movimento", "The performer moving, one arm raised", "La performeuse en mouvement, un bras levé"),
      g(9, "Una figura in bianco di spalle e un nastro rosso in volo", "A figure in white seen from behind and a flying red ribbon", "Une silhouette en blanc de dos et un ruban rouge en vol"),
      g(10, "La performer che sistema un'installazione di teli bianchi", "The performer arranging an installation of white sheets", "La performeuse installe des voiles blancs"),
      g(11, "La performer di spalle, in controluce", "The performer from behind, backlit", "La performeuse de dos, à contre-jour"),
      g(12, "La performer che disegna su un cubo di tessuto bianco", "The performer drawing on a white fabric cube", "La performeuse dessine sur un cube de tissu blanc"),
      g(13, "La performer con una campana tibetana e una sciarpa rossa", "The performer with a singing bowl and a red scarf", "La performeuse avec un bol chantant et une écharpe rouge"),
      g(14, "La performer avvolta in bende di tessuto bianco", "The performer wrapped in strips of white fabric", "La performeuse enveloppée de bandes de tissu blanc"),
      g(15, "La locandina di Girandola, Amen", "The poster of Girandola, Amen", "L'affiche de Girandola, Amen"),
      g(16, "La performer avvolta in un telo di plastica trasparente", "The performer wrapped in clear plastic", "La performeuse enveloppée dans du plastique transparent"),
      g(17, "La scena con l'installazione e la performer in piedi", "The stage with the installation and the performer standing", "La scène avec l'installation et la performeuse debout"),
    ],
    youtube: "qGjU1TjUeeI",
    schedaTecnica: "/documenti/girandola-amen-scheda-tecnica.pdf",
    date: [{ data: "2026-05-20", luogo: "Lorem Teatro", citta: "Bologna" }],
  },
  {
    slug: "animali-mai",
    titolo: "Animali MAI",
    tipo: "spettacolo",
    sottotitolo: {
      it: "Spettacolo itinerante sui trampoli, con musica dal vivo",
      en: "Roaming stilt show with live music",
      fr: "Spectacle déambulatoire sur échasses, avec musique live",
    },
    sinossi: {
      it: "Gli sgruzzi, animali fantastici disubbidienti e generosi, attraversano la piazza accompagnati da una domatrice e dai musicisti.",
      en: "The sgruzzi, disobedient and generous fantastic animals, cross the square with their tamer and the musicians.",
      fr: "Les sgruzzi, animaux fantastiques désobéissants et généreux, traversent la place avec leur dompteuse et les musiciens.",
    },
    testo: [
      {
        it: "Spettacolo itinerante sui trampoli con musica dal vivo, giocoleria e fuoco su richiesta. Attraverso linguaggi non verbali e teatro fisico trasforma lo spazio urbano in un palcoscenico a cielo aperto.",
        en: "A roaming stilt show with live music, juggling and fire on request. Through non-verbal languages and physical theatre it turns the urban space into an open-air stage.",
        fr: "Un spectacle déambulatoire sur échasses avec musique live, jonglerie et feu sur demande. Par le langage non verbal et le théâtre physique, il transforme l'espace urbain en scène à ciel ouvert.",
      },
      {
        it: "I costumi degli sgruzzi, ideati e costruiti da Monica Bellei, raccontano una storia che viene da un posto così lontano da non poterne più sapere il nome. Gli sgruzzi si sfidano in gare di abilità; chi li cavalca vorrebbe sposarsi ma non ci riesce mai, per la gelosia degli animali. Domatrice e musica ricordano a tutti l'importanza di restare insieme e rispettare le diversità.",
        en: "The sgruzzi costumes, designed and built by Monica Bellei, tell a story from a place so far away that nobody remembers its name. The sgruzzi compete in contests of skill; their riders would like to marry but never manage, because the animals get jealous. The tamer and the music remind everyone how important it is to stay together and respect differences.",
        fr: "Les costumes des sgruzzi, conçus et fabriqués par Monica Bellei, racontent une histoire venue d'un endroit si lointain qu'on en a oublié le nom. Les sgruzzi s'affrontent dans des concours d'adresse ; ceux qui les montent voudraient se marier mais n'y parviennent jamais, à cause de la jalousie des animaux. La dompteuse et la musique rappellent à tous l'importance de rester ensemble et de respecter les différences.",
      },
      {
        it: "Il pubblico partecipa direttamente. Lo spettacolo si adatta a festival, piazze, manifestazioni culturali e feste di paese, e si può declinare su temi diversi. È senza parole, comprensibile a tutti, bambini e stranieri compresi.",
        en: "The audience takes part directly. The show fits festivals, squares, cultural events and village fêtes, and can be adapted to different themes. It has no words, so everyone understands it, children and visitors from abroad included.",
        fr: "Le public participe directement. Le spectacle s'adapte aux festivals, aux places, aux manifestations culturelles et aux fêtes de village, et peut se décliner selon différents thèmes. Il est sans paroles, compréhensible par tous, enfants et étrangers compris.",
      },
    ],
    formato: { it: "Itinerante, all'aperto", en: "Roaming, outdoor", fr: "Déambulatoire, en plein air" },
    lingua: { it: "Senza parole", en: "No words", fr: "Sans paroles" },
    crediti: [
      { ruolo: { it: "Ideazione e domatrice", en: "Concept and tamer", fr: "Conception et dompteuse" }, nome: "Eva Maesa" },
      { ruolo: { it: "Costumi", en: "Costumes", fr: "Costumes" }, nome: "Monica Bellei" },
    ],
    pubblicoAdulto: false,
    ancheInEventi: true,
    copertina: {
      src: "/media/animali-mai/01.jpg",
      alt: {
        it: "Gli sgruzzi sui trampoli sotto le volte di un sotterraneo",
        en: "The sgruzzi on stilts under the vaults of a cellar",
        fr: "Les sgruzzi sur échasses sous les voûtes d'un souterrain",
      },
    },
    galleria: [
      {
        src: "/media/animali-mai/02.jpg",
        alt: {
          it: "La parata degli sgruzzi in un parco, tra il pubblico",
          en: "The sgruzzi parade in a park, among the audience",
          fr: "La parade des sgruzzi dans un parc, au milieu du public",
        },
      },
      {
        src: "/media/animali-mai/03.jpg",
        fuoco: "50% 4%",
        alt: {
          it: "Uno sgruzzo con il becco arancione e le piume, sui trampoli tra il pubblico di un parco",
          en: "A sgruzzo with an orange beak and feathers, on stilts among the audience in a park",
          fr: "Un sgruzzo au bec orange et aux plumes, sur échasses parmi le public d'un parc",
        },
      },
      {
        src: "/media/animali-mai/04.jpg",
        fuoco: "50% 6%",
        alt: {
          it: "Eva in sella a uno sgruzzo sui trampoli, durante una parata in strada",
          en: "Eva riding a sgruzzo on stilts during a street parade",
          fr: "Eva sur un sgruzzo, sur échasses, pendant une parade dans la rue",
        },
      },
    ],
    schedaTecnica: "/documenti/animali-mai-scheda-tecnica.pdf",
    date: [],
  },
  {
    slug: "gorgoglio",
    titolo: "Gorgoglìo",
    tipo: "spettacolo",
    sottotitolo: {
      it: "Spettacolo di clown per bambini e adulti",
      en: "Clown show for children and adults",
      fr: "Spectacle de clown pour enfants et adultes",
    },
    sinossi: {
      it: "Fruoth Fru, clownesse in bicicletta, trasforma i gorgoglii della vita quotidiana in un'orchestra di suoni e gesti.",
      en: "Fruoth Fru, a clown on a bicycle, turns the gurgles of everyday life into an orchestra of sounds and gestures.",
      fr: "Fruoth Fru, clowne à vélo, transforme les gargouillis de la vie quotidienne en un orchestre de sons et de gestes.",
    },
    testo: [
      {
        it: "Fruoth Fru pratica stupore e immaginazione per curare gli incastri del tran tran quotidiano: scuola, lavoro, traffico, cucina, lavatrici, telefonate. Viaggia su Fruetta, una battecletta pesante o leggera a seconda della fretta.",
        en: "Fruoth Fru practises wonder and imagination to cure the jams of the daily grind: school, work, traffic, cooking, laundry, phone calls. She travels on Fruetta, a drum-bicycle that is heavy or light depending on how much of a hurry she is in.",
        fr: "Fruoth Fru pratique l'émerveillement et l'imagination pour soigner les engrenages du train-train quotidien : école, travail, circulation, cuisine, lessives, coups de fil. Elle voyage sur Fruetta, une bicyclette-tambour lourde ou légère selon qu'on est pressé ou non.",
      },
      {
        it: "Il pubblico entra nella narrazione: bambini e adulti improvvisano, ridono insieme e scoprono il proprio clown interiore. Dietro le risate, lo spettacolo parla di amicizia, diversità, gentilezza, rispetto per la natura e per la donna.",
        en: "The audience steps into the story: children and adults improvise, laugh together and discover their inner clown. Behind the laughter, the show talks about friendship, difference, kindness, and respect for nature and for women.",
        fr: "Le public entre dans l'histoire : enfants et adultes improvisent, rient ensemble et découvrent leur clown intérieur. Derrière les rires, le spectacle parle d'amitié, de différence, de gentillesse, de respect de la nature et des femmes.",
      },
    ],
    durata: { it: "Lorem minuti", en: "Lorem minutes", fr: "Lorem minutes" },
    formato: { it: "Sala o all'aperto", en: "Indoor or outdoor", fr: "En salle ou en plein air" },
    lingua: {
      it: "Italiano, con molta azione non verbale",
      en: "Italian, with plenty of non-verbal action",
      fr: "Italien, avec beaucoup d'action non verbale",
    },
    crediti: [{ ruolo: { it: "Ideazione e interpretazione", en: "Concept and performance", fr: "Conception et interprétation" }, nome: "Eva Maesa" }],
    pubblicoAdulto: false,
    ancheInEventi: true,
    copertina: {
      src: "/media/gorgoglio/01.jpg",
      alt: {
        it: "Fruoth Fru con il naso rosso, in piedi tra gli oggetti di scena, con un nastro in volo",
        en: "Fruoth Fru with her red nose, standing among her props, a ribbon in the air",
        fr: "Fruoth Fru au nez rouge, debout parmi ses accessoires, un ruban en l'air",
      },
      credito: df,
    },
    galleria: [
      {
        src: "/media/gorgoglio/02.jpg",
        alt: {
          it: "Fruoth Fru seduta a terra mentre fa giocoleria con tre palline",
          en: "Fruoth Fru sitting on the floor juggling three balls",
          fr: "Fruoth Fru assise par terre, jonglant avec trois balles",
        },
        credito: df,
      },
      {
        src: "/media/gorgoglio/03.jpg",
        alt: { it: "Fruoth Fru mostra un piccolo maglione a righe", en: "Fruoth Fru holding up a small striped jumper", fr: "Fruoth Fru montre un petit pull rayé" },
        credito: df,
      },
      {
        src: "/media/gorgoglio/04.jpg",
        alt: {
          it: "Fruoth Fru con un palloncino lungo teso tra le braccia",
          en: "Fruoth Fru stretching a long balloon between her arms",
          fr: "Fruoth Fru tend un long ballon entre ses bras",
        },
        credito: df,
      },
      {
        src: "/media/gorgoglio/05.jpg",
        alt: {
          it: "Fruoth Fru con una bambina e un palloncino, in giardino",
          en: "Fruoth Fru with a little girl and a balloon, in a garden",
          fr: "Fruoth Fru avec une petite fille et un ballon, dans un jardin",
        },
      },
      {
        src: "/media/gorgoglio/06.jpg",
        alt: { it: "Fruoth Fru sorride con il naso rosso e il cappello", en: "Fruoth Fru smiling in her red nose and cap", fr: "Fruoth Fru sourit, nez rouge et casquette" },
      },
    ],
    teaser: "/media/gorgoglio/teaser.mp4",
    date: [],
  },
  {
    // DA COMPLETARE con Eva: sinossi e testo (dal CV: 2021, testi di Giulia Berra, regia di Eva)
    slug: "corpomente",
    titolo: "CorpoMente",
    anno: 2021,
    tipo: "spettacolo",
    sottotitolo: { it: "Spettacolo", en: "Show", fr: "Spectacle" },
    sinossi: {
      it: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    testo: [],
    crediti: [
      { ruolo: { it: "Regia", en: "Director", fr: "Mise en scène" }, nome: "Eva Maesa" },
      { ruolo: { it: "Testi", en: "Texts", fr: "Textes" }, nome: "Giulia Berra" },
      { ruolo: { it: "Produzione", en: "Production", fr: "Production" }, nome: "Teatro PanECapperi" },
    ],
    pubblicoAdulto: false,
    ancheInEventi: false,
    copertina: {
      src: "/media/corpomente/01.jpg",
      fuoco: "50% 30%",
      alt: {
        it: "Eva distesa su un cubo bianco, in un cortile, con altri cubi scritti a mano",
        en: "Eva lying on a white cube in a courtyard, beside other handwritten cubes",
        fr: "Eva allongée sur un cube blanc dans une cour, près d'autres cubes écrits à la main",
      },
    },
    galleria: [
      {
        src: "/media/corpomente/02.jpg",
        alt: {
          it: "In bianco e nero, Eva piegata all'indietro sopra un cubo bianco",
          en: "In black and white, Eva arched backwards over a white cube",
          fr: "En noir et blanc, Eva cambrée en arrière au-dessus d'un cube blanc",
        },
      },
      {
        src: "/media/corpomente/03.jpg",
        alt: {
          it: "In bianco e nero, il profilo di Eva dietro un telo bianco",
          en: "In black and white, Eva's profile behind a white sheet",
          fr: "En noir et blanc, le profil d'Eva derrière un drap blanc",
        },
      },
    ],
    date: [],
  },
  {
    // DA COMPLETARE con Eva: anno, descrizione, crediti, foto
    slug: "cattiva-incivile-citta",
    titolo: "Cattiva incivile città",
    tipo: "performance",
    sottotitolo: { it: "Performance", en: "Performance", fr: "Performance" },
    sinossi: {
      it: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    testo: [],
    crediti: [{ ruolo: { it: "Performer", en: "Performer", fr: "Performeuse" }, nome: "Eva Maesa" }],
    pubblicoAdulto: false,
    ancheInEventi: false,
    copertina: { src: "", alt: { it: "Cattiva incivile città", en: "Cattiva incivile città", fr: "Cattiva incivile città" } },
    galleria: [],
    youtube: "4Lf-Z8IsEb4",
    date: [],
  },
  {
    // DA COMPLETARE con Eva: anno, descrizione, crediti, foto. Al momento non in repertorio.
    slug: "primera-soy-mujer",
    titolo: "Primera soy mujer",
    tipo: "spettacolo",
    sottotitolo: {
      it: "Spettacolo, al momento non in repertorio",
      en: "Show, not currently in the repertoire",
      fr: "Spectacle, actuellement hors répertoire",
    },
    sinossi: {
      it: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    testo: [],
    crediti: [{ ruolo: { it: "Interprete", en: "Performer", fr: "Interprète" }, nome: "Eva Maesa" }],
    pubblicoAdulto: false,
    ancheInEventi: false,
    inRepertorio: false,
    copertina: { src: "", alt: { it: "Primera soy mujer", en: "Primera soy mujer", fr: "Primera soy mujer" } },
    galleria: [],
    youtube: "iHP0Tj9OZLg",
    date: [],
  },
];

const m = (x: MediaS, l: Lingua) => ({ src: x.src || undefined, alt: x.alt[l], credito: x.credito, fuoco: x.fuoco });

/** Le opere nella lingua richiesta, ordinate dalla più recente. */
export function opereIn(l: Lingua): Opera[] {
  return sorgente
    .map((o) => ({
      slug: o.slug,
      titolo: o.titolo,
      anno: o.anno,
      tipo: o.tipo,
      sottotitolo: o.sottotitolo[l],
      sinossi: o.sinossi[l],
      testo: o.testo.map((t) => t[l]),
      durata: o.durata?.[l],
      formato: o.formato?.[l],
      lingua: o.lingua?.[l],
      crediti: o.crediti.map((c) => ({ ruolo: c.ruolo[l], nome: c.nome })),
      pubblicoAdulto: o.pubblicoAdulto,
      avviso: o.avviso?.[l],
      ancheInEventi: o.ancheInEventi,
      copertina: m(o.copertina, l),
      galleria: o.galleria.map((x) => m(x, l)),
      teaser: o.teaser,
      youtube: o.youtube,
      inRepertorio: o.inRepertorio ?? true,
      schedaTecnica: o.schedaTecnica,
      date: o.date,
    }))
    .sort((a, b) => (b.anno ?? 0) - (a.anno ?? 0));
}

export const slugOpere = sorgente.map((o) => o.slug);

export function trovaOpera(slug: string, l: Lingua) {
  return opereIn(l).find((o) => o.slug === slug);
}
