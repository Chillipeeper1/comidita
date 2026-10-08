import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Elige el viernes",
    text: "Publicamos el menú de la semana siguiente con 3 opciones. Eliges la tuya por WhatsApp o Instagram.",
    icon: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 16l2 2 4-4" />,
  },
  {
    title: "Cocinamos bajo demanda",
    text: "Solo preparamos lo que se pidió: comida fresca del día y cero desperdicio.",
    icon: <path d="M6 13.9A4 4 0 0 1 7 6a5 5 0 0 1 10 0 4 4 0 0 1 1 7.9V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM6 17h12" />,
  },
  {
    title: "Recibe en horario fijo",
    text: `Llegamos a tu oficina o casa de ${site.deliveryTime}, todos los días hábiles.`,
    icon: <path d="M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Cómo funciona" title="Tu almuerzo resuelto en 3 pasos" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cream-200">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {step.icon}
                  </svg>
                </span>
                <span className="font-display text-sm font-semibold text-accent-600">Paso {index + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-ink-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
