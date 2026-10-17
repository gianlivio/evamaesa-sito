import { profiloIn } from "@/content/profilo";
import type { Lingua } from "@/i18n/lingue";
import { Invito } from "./Invito";

export function Piede({ lingua }: { lingua: Lingua }) {
  const profilo = profiloIn(lingua);
  return (
    <footer className="contenitore">
      <div className="piede">
        <Invito lingua={lingua} />
        <div className="minuto">
          <p>
            <a href={`mailto:${profilo.email}`}>{profilo.email}</a>
          </p>
          <p>
            <a href={`tel:${profilo.telefonoHref}`}>{profilo.telefono}</a>
          </p>
          <p>
            <a href={profilo.instagram} rel="noopener">
              Instagram
            </a>
          </p>
          <p>© {new Date().getFullYear()} Eva Maesa</p>
        </div>
      </div>
    </footer>
  );
}
