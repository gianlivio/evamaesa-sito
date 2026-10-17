import type { Metadata } from "next";
import { dizionario } from "@/i18n/dizionario";

const t = dizionario("fr").meta;
export const metadata: Metadata = {
  title: { default: t.titolo, template: "%s | Eva Maesa" },
  description: t.descrizione,
};

export default function LayoutFR({ children }: { children: React.ReactNode }) {
  return children;
}
