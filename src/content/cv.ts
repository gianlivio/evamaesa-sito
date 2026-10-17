import type { Lingua, Tr } from "@/i18n/lingue";

/*
 * Curriculum di Eva Maesa: unica fonte per il PDF (tutte le voci) e per la sezione
 * "Percorso" di Chi sono (solo le voci con sulSito).
 * Fonte: CV di Eva del 30/05/2026, più le opere arrivate dopo.
 * Il PDF si rigenera con: python3 scripts/genera-cv.py (a sito avviato su localhost:3000).
 */

export type Gruppo = "scena" | "strada" | "formazione" | "pedagogia";
export const GRUPPI: Gruppo[] = ["scena", "strada", "formazione", "pedagogia"];

type VoceS = { anni?: string; gruppo: Gruppo; titolo: Tr; dettaglio: Tr; sulSito?: boolean };
export type Voce = { anni?: string; gruppo: Gruppo; titolo: string; dettaglio: string };

const t = (it: string, en: string, fr: string): Tr => ({ it, en, fr });
const uguale = (s: string): Tr => ({ it: s, en: s, fr: s });

const voci: VoceS[] = [
  // in scena
  {
    gruppo: "scena",
    titolo: uguale("Cattiva incivile città"),
    dettaglio: t("Performance. Performer.", "Performance. Performer.", "Performance. Performeuse."),
    sulSito: true,
  },
  {
    gruppo: "scena",
    titolo: uguale("Primera soy mujer"),
    dettaglio: t("Spettacolo. Interprete.", "Show. Performer.", "Spectacle. Interprète."),
    sulSito: true,
  },
  {
    anni: "2024",
    gruppo: "scena",
    titolo: uguale("Girandola, Amen"),
    dettaglio: t(
      "Di Eva Maesa, attrice performer. Teatro PanECapperi instabile indipendente nomade, luoghi vari.",
      "By Eva Maesa, actress and performer. Teatro PanECapperi (independent nomadic theatre), various venues.",
      "D'Eva Maesa, comédienne et performeuse. Teatro PanECapperi (théâtre indépendant nomade), lieux divers.",
    ),
    sulSito: true,
  },
  {
    anni: "2023",
    gruppo: "scena",
    titolo: t("Elisir d'amore, opera musicale", "L'elisir d'amore, opera", "L'Élixir d'amour, opéra"),
    dettaglio: t(
      "Regia di Victor Garcia Serra, Teatro Comunale di Bologna. Clownesse trampoliera.",
      "Directed by Victor Garcia Serra, Teatro Comunale di Bologna. Clown on stilts.",
      "Mise en scène de Victor Garcia Serra, Teatro Comunale di Bologna. Clowne échassière.",
    ),
    sulSito: true,
  },
  {
    anni: "2021",
    gruppo: "scena",
    titolo: uguale("CorpoMente"),
    dettaglio: t(
      "Testi di Giulia Berra, regia di Eva Maesa. Teatro PanECapperi, luoghi vari.",
      "Texts by Giulia Berra, directed by Eva Maesa. Teatro PanECapperi, various venues.",
      "Textes de Giulia Berra, mise en scène d'Eva Maesa. Teatro PanECapperi, lieux divers.",
    ),
    sulSito: true,
  },
  {
    anni: "2020",
    gruppo: "scena",
    titolo: uguale("Gorgoglìo"),
    dettaglio: t(
      "Spettacolo clown, autoproduzione nata dal seminario intensivo con Jean Meningault.",
      "Clown show, self-produced after the intensive workshop with Jean Meningault.",
      "Spectacle de clown, autoproduit après le stage intensif avec Jean Meningault.",
    ),
    sulSito: true,
  },
  {
    anni: "2018",
    gruppo: "scena",
    titolo: t("Compagnia Ensemble Lodi", "Ensemble Lodi company", "Compagnie Ensemble Lodi"),
    dettaglio: t(
      "“Volver!” e “Don Juan”, regia di Francesco Suardi. Attrice performer in vari ruoli; festival a Shanghai, Cina.",
      "“Volver!” and “Don Juan”, directed by Francesco Suardi. Actress and performer in several roles; festival in Shanghai, China.",
      "« Volver! » et « Don Juan », mise en scène de Francesco Suardi. Comédienne et performeuse dans plusieurs rôles ; festival à Shanghai, Chine.",
    ),
    sulSito: true,
  },
  {
    anni: "2013",
    gruppo: "scena",
    titolo: t("Shakespeare On Stage, Roma", "Shakespeare On Stage, Rome", "Shakespeare On Stage, Rome"),
    dettaglio: t(
      "Laboratorio con la regia di Guido D'Avino; Elena in “Sogno di una notte di mezza estate”, Teatro Colosseo.",
      "Workshop directed by Guido D'Avino; Helena in “A Midsummer Night's Dream”, Teatro Colosseo.",
      "Atelier mis en scène par Guido D'Avino ; Héléna dans « Le Songe d'une nuit d'été », Teatro Colosseo.",
    ),
    sulSito: true,
  },
  {
    anni: "2009–2011",
    gruppo: "scena",
    titolo: t("Teatro dei Limoni, Foggia", "Teatro dei Limoni, Foggia", "Teatro dei Limoni, Foggia"),
    dettaglio: t(
      "Laboratori e creazione di spettacoli originali.",
      "Workshops and creation of original shows.",
      "Ateliers et création de spectacles originaux.",
    ),
  },

  // strada, trampoli, grandi eventi
  {
    anni: "2024",
    gruppo: "strada",
    titolo: t("Compagnia Piccolo Nuovo Teatro, Assisi", "Piccolo Nuovo Teatro company, Assisi", "Compagnie Piccolo Nuovo Teatro, Assise"),
    dettaglio: t(
      "Performer trampoliera nello spettacolo di strada “Zoè”.",
      "Stilt performer in the street show “Zoè”.",
      "Performeuse sur échasses dans le spectacle de rue « Zoè ».",
    ),
    sulSito: true,
  },
  {
    anni: "2023",
    gruppo: "strada",
    titolo: uguale("Elrow"),
    dettaglio: t(
      "Eventi di musica elettronica con incursioni performative sui trampoli: Bologna, Rimini, Padova, Reggio Emilia, Francoforte.",
      "Electronic music events with performance raids on stilts: Bologna, Rimini, Padua, Reggio Emilia, Frankfurt.",
      "Événements de musique électronique avec des irruptions performatives sur échasses : Bologne, Rimini, Padoue, Reggio Emilia, Francfort.",
    ),
    sulSito: true,
  },
  {
    anni: "2022",
    gruppo: "strada",
    titolo: t("Compagnia Parola Bianca, Modena", "Parola Bianca company, Modena", "Compagnie Parola Bianca, Modène"),
    dettaglio: t(
      "Performer trampoliera in “Invasioni lunari” e “Crystal”, regia di Francesca Krnjak.",
      "Stilt performer in “Invasioni lunari” and “Crystal”, directed by Francesca Krnjak.",
      "Performeuse sur échasses dans « Invasioni lunari » et « Crystal », mise en scène de Francesca Krnjak.",
    ),
    sulSito: true,
  },

  // formazione
  {
    anni: "2025",
    gruppo: "formazione",
    titolo: t("Workshop Floorwork & Release", "Floorwork & Release workshop", "Stage Floorwork & Release"),
    dettaglio: t("Con Antonella Boccadamo, PraT, Bologna.", "With Antonella Boccadamo, PraT, Bologna.", "Avec Antonella Boccadamo, PraT, Bologne."),
  },
  {
    anni: "2024",
    gruppo: "formazione",
    titolo: t("Teatrodanza", "Dance theatre", "Danse-théâtre"),
    dettaglio: t(
      "Seminario con Marigia Maggipinto, Cà Bigia circus house e Teatro dei Limoni.",
      "Workshop with Marigia Maggipinto, Cà Bigia circus house and Teatro dei Limoni.",
      "Stage avec Marigia Maggipinto, Cà Bigia circus house et Teatro dei Limoni.",
    ),
    sulSito: true,
  },
  {
    anni: "2023",
    gruppo: "formazione",
    titolo: t("Metodo Meisner, CSC Roma", "Meisner technique, CSC Rome", "Méthode Meisner, CSC Rome"),
    dettaglio: t("Laboratorio.", "Workshop.", "Atelier."),
    sulSito: true,
  },
  {
    anni: "2023",
    gruppo: "formazione",
    titolo: t("Clown con Willy the clown", "Clowning with Willy the clown", "Clown avec Willy the clown"),
    dettaglio: t(
      "Seminario intensivo “Il gioco, l'ascolto, il clown”, Valle Gaudia.",
      "Intensive workshop “Play, listening, the clown”, Valle Gaudia.",
      "Stage intensif « Le jeu, l'écoute, le clown », Valle Gaudia.",
    ),
    sulSito: true,
  },
  {
    anni: "2020–2022",
    gruppo: "formazione",
    titolo: t("Mimo drammatico", "Dramatic mime", "Mime dramatique"),
    dettaglio: t(
      "Laboratorio intensivo con Agnese Mattanò, Centro movimento Solaris, Bologna.",
      "Intensive workshop with Agnese Mattanò, Centro movimento Solaris, Bologna.",
      "Atelier intensif avec Agnese Mattanò, Centro movimento Solaris, Bologne.",
    ),
    sulSito: true,
  },
  {
    anni: "2020",
    gruppo: "formazione",
    titolo: t("Clown con Jean Meningault", "Clowning with Jean Meningault", "Clown avec Jean Meningault"),
    dettaglio: t("Seminario intensivo, Montevaso.", "Intensive workshop, Montevaso.", "Stage intensif, Montevaso."),
    sulSito: true,
  },
  {
    anni: "2019–2021",
    gruppo: "formazione",
    titolo: t("Scuola Danza Duende, Bologna", "Duende dance school, Bologna", "École de danse Duende, Bologne"),
    dettaglio: t("Danza.", "Dance.", "Danse."),
    sulSito: true,
  },
  {
    anni: "2019–2021",
    gruppo: "formazione",
    titolo: t("Canto corale", "Choral singing", "Chant choral"),
    dettaglio: t(
      "Con la direzione di Meike Clarelli, con Le Core e Chemin des femmes, Bologna e Modena.",
      "Conducted by Meike Clarelli, with Le Core and Chemin des femmes, Bologna and Modena.",
      "Sous la direction de Meike Clarelli, avec Le Core et Chemin des femmes, Bologne et Modène.",
    ),
    sulSito: true,
  },
  {
    anni: "2019",
    gruppo: "formazione",
    titolo: t("Clown con Andrea Casaca", "Clowning with Andrea Casaca", "Clown avec Andrea Casaca"),
    dettaglio: t("Seminario “Il corpo comico”, Bologna.", "Workshop “The comic body”, Bologna.", "Stage « Le corps comique », Bologne."),
    sulSito: true,
  },
  {
    anni: "2019",
    gruppo: "formazione",
    titolo: t("Laboratorio teatrale con Rossella Dassu", "Theatre workshop with Rossella Dassu", "Atelier théâtral avec Rossella Dassu"),
    dettaglio: t("Bologna.", "Bologna.", "Bologne."),
  },
  {
    anni: "2018",
    gruppo: "formazione",
    titolo: t("“La danza del vento”", "“The dance of the wind”", "« La danse du vent »"),
    dettaglio: t("Seminario con Sofia Monsalve, Torino.", "Workshop with Sofia Monsalve, Turin.", "Stage avec Sofia Monsalve, Turin."),
  },
  {
    anni: "2016",
    gruppo: "formazione",
    titolo: t("Accademia Pietro Sharoff, Roma", "Pietro Sharoff Academy, Rome", "Académie Pietro Sharoff, Rome"),
    dettaglio: t("Secondo anno, allieva attrice.", "Second year, acting student.", "Deuxième année, élève comédienne."),
    sulSito: true,
  },
  {
    gruppo: "formazione",
    titolo: uguale("PATS"),
    dettaglio: t("Formazione attoriale.", "Actor training.", "Formation d'actrice."),
    sulSito: true,
  },
  {
    anni: "2014–2015",
    gruppo: "formazione",
    titolo: t("Musica popolare", "Folk music", "Musique populaire"),
    dettaglio: t("Con Gabriella Aiello.", "With Gabriella Aiello.", "Avec Gabriella Aiello."),
  },
  {
    anni: "2013–2016",
    gruppo: "formazione",
    titolo: t("Palestra dell'attore, Roma", "Palestra dell'attore, Rome", "Palestra dell'attore, Rome"),
    dettaglio: t(
      "“Dalla biomeccanica alla messa in scena”.",
      "“From biomechanics to staging”.",
      "« De la biomécanique à la mise en scène ».",
    ),
    sulSito: true,
  },
  {
    anni: "2004–2007",
    gruppo: "formazione",
    titolo: t("Officina teatrale di Pino Casolaro, Foggia", "Pino Casolaro's theatre workshop, Foggia", "Atelier théâtral de Pino Casolaro, Foggia"),
    dettaglio: t("Diploma.", "Diploma.", "Diplôme."),
  },

  // pedagogia ed educazione
  {
    anni: "2026",
    gruppo: "pedagogia",
    titolo: t("Master in pedagogia teatrale", "Master's in theatre pedagogy", "Master en pédagogie théâtrale"),
    dettaglio: t("“Teatro e disabilità”, Inpef.", "“Theatre and disability”, Inpef.", "« Théâtre et handicap », Inpef."),
    sulSito: true,
  },
  {
    anni: "2025",
    gruppo: "pedagogia",
    titolo: t("Workshop DisCorpi", "DisCorpi workshop", "Stage DisCorpi"),
    dettaglio: t("Facilitatrice. Circolo Hex, Bologna.", "Facilitator. Circolo Hex, Bologna.", "Facilitatrice. Circolo Hex, Bologne."),
    sulSito: true,
  },
  {
    gruppo: "pedagogia",
    titolo: t("Educatrice", "Educator", "Éducatrice"),
    dettaglio: t(
      "Laboratori che favoriscono integrazione e comunicazione non violenta.",
      "Workshops fostering inclusion and non-violent communication.",
      "Ateliers qui favorisent l'intégration et la communication non violente.",
    ),
    sulSito: true,
  },
];

const inLingua = (v: VoceS, l: Lingua): Voce => ({ anni: v.anni, gruppo: v.gruppo, titolo: v.titolo[l], dettaglio: v.dettaglio[l] });

/** Tutte le voci, per il PDF. */
export const vociCv = (l: Lingua) => voci.map((v) => inLingua(v, l));
/** La selezione mostrata in Chi sono. */
export const vociSito = (l: Lingua) => voci.filter((v) => v.sulSito).map((v) => inLingua(v, l));

/* Scheda casting: misure e lingue dal CV */
export const scheda = {
  altezza: t("1,74 m", "1.74 m", "1,74 m"),
  taglia: t("42/44 (IT)", "IT 42/44 (UK 10/12)", "42/44 (IT), 38/40 (FR)"),
  scarpe: "41 (EU)",
  capelli: t("Neri", "Black", "Noirs"),
  lingue: t(
    "Italiano (madrelingua), inglese (B2), spagnolo, francese",
    "Italian (native), English (B2), Spanish, French",
    "Italien (langue maternelle), anglais (B2), espagnol, français",
  ),
  dialetti: t(
    "Pugliese, romanesco, siciliano, sardo, lombardo, emiliano, toscano",
    "Apulian, Roman, Sicilian, Sardinian, Lombard, Emilian, Tuscan",
    "Des Pouilles, romain, sicilien, sarde, lombard, émilien, toscan",
  ),
};

export function schedaIn(l: Lingua) {
  return {
    altezza: scheda.altezza[l],
    taglia: scheda.taglia[l],
    scarpe: scheda.scarpe,
    capelli: scheda.capelli[l],
    lingue: scheda.lingue[l],
    dialetti: scheda.dialetti[l],
  };
}

/* Solo nel PDF */
export const competenze: Tr[] = [
  t("Ottima dizione", "Excellent diction", "Excellente diction"),
  t("Creatività", "Creativity", "Créativité"),
  t("Intelligenza emotiva", "Emotional intelligence", "Intelligence émotionnelle"),
  t("Versatilità", "Versatility", "Polyvalence"),
  t("Ascolto attivo", "Active listening", "Écoute active"),
  t("Buona memoria", "Good memory", "Bonne mémoire"),
  t("Formazione vocale", "Vocal training", "Formation vocale"),
  t("Danza", "Dance", "Danse"),
  t("Resistenza fisica", "Physical stamina", "Endurance physique"),
];

export const bioCv: Tr[] = [
  t(
    "Eva Maesa nasce a Foggia l'8 gennaio 1991: poeta, performer, clownesse, trampoliera, attrice eclettica. Si avvicina giovanissima al teatro a Foggia e continua tra Roma, Bologna e ovunque possibile, trasversale a ogni ambiente. Frequenta la PATS, poi il secondo anno all'Accademia Pietro Sharoff.",
    "Eva Maesa was born in Foggia on 8 January 1991: poet, performer, clown, stilt walker, eclectic actress. She came to theatre very young in Foggia and went on between Rome, Bologna and wherever possible, moving across every kind of setting. She trained at PATS, then attended the second year of the Pietro Sharoff Academy.",
    "Eva Maesa est née à Foggia le 8 janvier 1991 : poète, performeuse, clowne, échassière, comédienne éclectique. Elle découvre le théâtre très jeune à Foggia et poursuit entre Rome, Bologne et partout où c'est possible, à l'aise dans tous les milieux. Elle se forme à la PATS, puis suit la deuxième année de l'Académie Pietro Sharoff.",
  ),
  t(
    "Vicina al circo, alla danza e ai principi del teatro dell'oppresso, lavora anche come educatrice, favorendo integrazione e comunicazione non violenta. È attiva come performer e autrice con gruppi di circo e teatro. Esplora interazioni e scambi tra linguaggi artistici e sperimenta una poetica fisica in dialogo con la musica elettronica e dal vivo; nell'ostinata ricerca di dar voce all'indicibile ha incontrato diversi artisti e musicisti.",
    "Close to circus, dance and the principles of the Theatre of the Oppressed, she also works as an educator, fostering inclusion and non-violent communication. She is active as a performer and author with circus and theatre groups. She explores exchanges between artistic languages and develops a physical poetics in dialogue with electronic and live music; in her stubborn search to give voice to the unspeakable she has met many artists and musicians.",
    "Proche du cirque, de la danse et des principes du théâtre de l'opprimé, elle travaille aussi comme éducatrice, en favorisant l'intégration et la communication non violente. Elle est active comme performeuse et autrice avec des groupes de cirque et de théâtre. Elle explore les échanges entre langages artistiques et développe une poétique physique en dialogue avec la musique électronique et live ; dans sa recherche obstinée pour donner voix à l'indicible, elle a rencontré de nombreux artistes et musiciens.",
  ),
  t(
    "Ha un'esperienza decennale come animatrice, hostess e barista (con attestato HACCP), maturata nelle situazioni più varie.",
    "She has ten years' experience as an entertainer, hostess and bartender (HACCP certified), gained in the most varied settings.",
    "Elle a dix ans d'expérience comme animatrice, hôtesse et barmaid (certificat HACCP), acquise dans les situations les plus variées.",
  ),
];

export const privacyCv: Tr = t(
  "Autorizzo il trattamento dei miei dati personali presenti nel CV ai sensi del D. Lgs. 196/2003, come modificato dal D. Lgs. 101/2018, e dell'art. 13 del GDPR (Regolamento UE 2016/679) ai fini della ricerca e selezione del personale.",
  "I authorise the processing of the personal data in this CV under Italian Legislative Decree 196/2003, as amended by Legislative Decree 101/2018, and Art. 13 of the GDPR (EU Regulation 2016/679), for recruitment and selection purposes.",
  "J'autorise le traitement des données personnelles figurant dans ce CV conformément au décret législatif italien 196/2003, modifié par le décret législatif 101/2018, et à l'art. 13 du RGPD (Règlement UE 2016/679), à des fins de recrutement et de sélection.",
);
