import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { instagramLink, whatsappLink } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="rounded-[2rem] bg-accent-100 px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Deja la comida rápida esta semana</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-700">
            Suscríbete en un minuto y recibe el menú cada viernes. ¿Prefieres platicarlo? Escríbenos.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/suscribirse" size="lg">
              Suscribirme
            </ButtonLink>
            <ButtonLink href={whatsappLink()} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
              Escribir por WhatsApp
            </ButtonLink>
            <ButtonLink href={instagramLink()} target="_blank" rel="noopener noreferrer" size="lg" variant="ghost">
              Instagram
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
