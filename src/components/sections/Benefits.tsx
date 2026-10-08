import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { deliveryZones } from "@/lib/sample-data";
import { site } from "@/lib/site";

const benefits = [
  { emoji: "🥕", title: "Ingredientes reales", text: "Nada ultraprocesado: verduras del mercado, carnes magras y granos enteros." },
  { emoji: "🍽️", title: "Porciones justas", text: "Te llenas sin quedar pesado para la tarde de trabajo." },
  { emoji: "♻️", title: "Sin desperdicio", text: "Cocinamos bajo pedido, así que no tiramos comida ni la recalentamos." },
  { emoji: "⏰", title: "Puntualidad", text: `Horario fijo de entrega: ${site.deliveryTime}. Planea tu día sin sorpresas.` },
];

export function Benefits() {
  return (
    <>
      <section id="beneficios" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Beneficios"
            title="Mejor que la comida rápida"
            intro="Comer bien entre semana no debería costar tiempo ni salud."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cream-200">
                <span className="text-3xl" aria-hidden="true">{benefit.emoji}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{benefit.title}</h3>
                <p className="mt-2 text-ink-700">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="zonas" className="bg-brand-600 py-16 text-white sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">¿Llegamos a tu zona?</h2>
            <p className="mt-4 text-lg text-brand-50">
              Entregamos de lunes a viernes en oficinas y zonas residenciales, siempre dentro del mismo horario para que
              sepas a qué hora comes.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2 font-semibold">
              <span aria-hidden="true">🕐</span> Horario de entrega: {site.deliveryTime}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {deliveryZones.map((zone) => (
              <li key={zone.name} className="rounded-2xl bg-white p-5 text-ink-900">
                <p className="font-semibold">{zone.name}</p>
                <p className="mt-1 text-sm text-ink-700">{zone.deliveryWindow}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
