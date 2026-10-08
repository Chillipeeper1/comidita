import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const questions = [
  {
    q: "¿Cómo hago mi pedido?",
    a: "Cada viernes publicamos el menú. Te suscribes una vez y eliges tu opción de la semana por WhatsApp o Instagram antes de la fecha límite.",
  },
  {
    q: "¿A qué hora llega la comida?",
    a: `Entregamos de lunes a viernes de ${site.deliveryTime}. Cada zona tiene su ventana dentro de ese horario.`,
  },
  {
    q: "¿Cómo se paga?",
    a: "Por ahora el pago es por transferencia o en efectivo al recibir. No pedimos datos bancarios en el sitio.",
  },
  {
    q: "¿Tienen opciones vegetarianas?",
    a: "Sí, cada semana al menos una de las 3 opciones es vegetariana.",
  },
  {
    q: "¿Puedo cancelar mi suscripción?",
    a: "Claro. La suscripción no tiene costo ni plazo forzoso: solo avísanos por WhatsApp y te damos de baja.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
        <div className="mt-10 space-y-3">
          {questions.map(({ q, a }) => (
            <details key={q} className="group rounded-2xl bg-white shadow-sm ring-1 ring-cream-200">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-lg font-semibold text-ink-900 focus-visible:outline-2 focus-visible:outline-brand-600 [&::-webkit-details-marker]:hidden">
                {q}
                <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-ink-700">{a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
