import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="overflow-hidden bg-cream-100">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge tone="accent">Menú nuevo cada viernes</Badge>
          <h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-ink-900 sm:text-5xl lg:text-6xl">
            Comida casera de verdad, <span className="text-brand-600">sin salir de la oficina</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-700">
            Almuerzos saludables cocinados en casa, con ingredientes reales y porciones justas. Eliges entre 3 opciones
            y te lo llevamos todos los días de {site.deliveryTime}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/suscribirse" size="lg">
              Suscríbete gratis
            </ButtonLink>
            <ButtonLink href="/#menu" size="lg" variant="secondary">
              Ver el menú de la semana
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-ink-500">Sin pagos en línea: confirmas tu pedido por WhatsApp.</p>
        </div>
        <Image
          src="/hero.svg"
          alt="Plato con arroz, pollo a la plancha y verduras"
          width={600}
          height={480}
          priority
          className="mx-auto w-full max-w-md lg:max-w-none"
        />
      </Container>
    </section>
  );
}
