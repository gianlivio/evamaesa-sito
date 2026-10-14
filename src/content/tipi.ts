export type Media = {
  /** percorso in /public oppure URL; se assente si mostra un segnaposto */
  src?: string;
  alt: string;
  credito?: string;
};

export type Data = {
  data: string; // ISO yyyy-mm-dd
  luogo: string;
  citta: string;
};

export type Opera = {
  slug: string;
  titolo: string;
  anno?: number;
  tipo: "spettacolo" | "performance" | "installazione";
  sottotitolo: string;
  sinossi: string;
  testo: string[];
  durata?: string;
  formato?: string;
  lingua?: string;
  crediti: { ruolo: string; nome: string }[];
  /** mostra l'avviso sui contenuti e tiene l'opera fuori dalla home */
  perAdulti: boolean;
  avviso?: string;
  /** genera il richiamo nella pagina Eventi */
  ancheInEventi: boolean;
  copertina: Media;
  galleria: Media[];
  teaser?: string;
  schedaTecnica?: string;
  date: Data[];
};

export type Esperienza = {
  anno?: string;
  tipo: "formazione" | "compagnia" | "collaborazione" | "educazione";
  titolo: string;
  descrizione: string;
};

export type FormatEvento = {
  slug: string;
  nome: string;
  descrizione: string;
  contenuto: string[];
  durata?: string;
  requisiti?: string;
};
