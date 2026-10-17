import { Sito } from "@/viste/Sito";

export default function LayoutSito({ children }: { children: React.ReactNode }) {
  return <Sito lingua="fr">{children}</Sito>;
}
