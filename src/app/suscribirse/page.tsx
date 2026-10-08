import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Suscríbete · Comidita" };

// Página provisional: el formulario real llega con HU-14 (feature/subscription).
export default function SubscribePage() {
  return (
    <Container className="max-w-xl py-20 text-center">
      <h1 className="font-display text-4xl font-semibold">Suscríbete a Comidita</h1>
      <p className="mt-4 text-lg text-ink-700">
        El formulario de suscripción estará listo muy pronto. Mientras tanto, escríbenos por WhatsApp.
      </p>
      <ButtonLink href={whatsappLink("¡Hola Comidita! Quiero suscribirme.")} target="_blank" rel="noopener noreferrer" size="lg" className="mt-8">
        Escribir por WhatsApp
      </ButtonLink>
    </Container>
  );
}
