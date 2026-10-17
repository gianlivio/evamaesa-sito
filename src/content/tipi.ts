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
  /** opera riservata a un pubblico adulto: avviso sui contenuti, esclusa dalla home */
  pubblicoAdulto: boolean;
  avviso?: string;
  /** genera il richiamo nella pagina Eventi */
  ancheInEventi: boolean;
  copertina: Media;
  galleria: Media[];
  teaser?: string;
  /** id di un video YouTube (trailer o ripresa) */
  youtube?: string;
  /** false: opera non disponibile al momento, resta nell'archivio */
  inRepertorio?: boolean;
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
