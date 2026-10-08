import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { instagramLink, site, whatsappLink } from "@/lib/site";
import { navLinks } from "./navLinks";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-50">
      <Container className="grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold text-white">Comidita</p>
          <p className="mt-3 text-sm text-brand-100">
            Almuerzos saludables cocinados en casa, entregados en tu oficina o casa en horario fijo.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h2 className="text-sm font-semibold text-white">Secciones</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-brand-100 hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Contacto</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-brand-100 hover:text-white hover:underline">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="text-brand-100 hover:text-white hover:underline">
                Instagram @{site.instagramUser}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-brand-100 hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-brand-700">
        <Container className="py-5 text-xs text-brand-100">
          © {new Date().getFullYear()} Comidita · Proyecto de Ingeniería de Software
        </Container>
      </div>
    </footer>
  );
}
