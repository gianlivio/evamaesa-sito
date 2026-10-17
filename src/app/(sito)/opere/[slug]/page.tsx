import { SchedaOpera, metaOpera, parametriOpere, type ParametriOpera } from "@/viste/SchedaOpera";

export const generateStaticParams = parametriOpere;
export const generateMetadata = (p: ParametriOpera) => metaOpera("it", p);

export default function Pagina(p: ParametriOpera) {
  return <SchedaOpera lingua="it" params={p.params} />;
}
