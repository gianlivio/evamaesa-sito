import type { Metadata } from "next";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("en").meta;
export const metadata: Metadata = {
  title: { default: t.titolo, template: "%s | Eva Maesa" },
  description: t.descrizione,
};

export default function LayoutEN({ children }: { children: React.ReactNode }) {
  return children;
}
