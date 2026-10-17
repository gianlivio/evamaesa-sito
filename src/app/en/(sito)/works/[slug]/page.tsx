import { SchedaOpera, metaOpera, parametriOpere, type ParametriOpera } from "@/viste/SchedaOpera";

export const generateStaticParams = parametriOpere;
export const generateMetadata = (p: ParametriOpera) => metaOpera("en", p);

export default function Pagina(p: ParametriOpera) {
  return <SchedaOpera lingua="en" params={p.params} />;
}
