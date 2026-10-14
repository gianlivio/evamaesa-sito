import { profilo } from "@/content/profilo";
import { Invito } from "./Invito";

export function Piede() {
  return (
    <footer className="contenitore">
      <div className="piede">
        <Invito />
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
