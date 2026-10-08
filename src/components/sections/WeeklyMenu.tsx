import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDeadline, formatWeek, getWeeklyMenu } from "@/lib/menu";
import { instagramLink, whatsappLink } from "@/lib/site";

export async function WeeklyMenu() {
  const menu = await getWeeklyMenu();

  return (
    <section id="menu" className="bg-cream-100 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Menú semanal"
          title="Las 3 opciones de esta semana"
          intro={menu ? `Semana del ${formatWeek(menu.weekStart)}. Todas incluyen agua fresca del día.` : undefined}
        />

        {menu ? (
          <>
            <p className="mx-auto mt-6 w-fit rounded-full bg-accent-100 px-4 py-2 text-center text-sm font-semibold text-accent-600">
              Haz tu pedido antes del <time dateTime={menu.orderDeadline.toISOString()}>{formatDeadline(menu.orderDeadline)}</time>
            </p>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {menu.options.map((option, index) => (
                <li key={option.id}>
                  <Card className="flex h-full flex-col">
                    {option.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- las fotos pueden venir de cualquier URL del panel admin
                      <img src={option.imageUrl} alt={option.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-brand-50 text-5xl" aria-hidden="true">
                        🍲
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <Badge className="w-fit">Opción {index + 1}</Badge>
                      <h3 className="mt-3 text-xl font-semibold text-ink-900">{option.name}</h3>
                      <p className="mt-2 flex-1 text-ink-700">{option.description}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={whatsappLink()} target="_blank" rel="noopener noreferrer" size="lg">
                Pedir por WhatsApp
              </ButtonLink>
              <ButtonLink href={instagramLink()} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
                Pedir por Instagram
              </ButtonLink>
            </div>
          </>
        ) : (
          <Card className="mx-auto mt-10 max-w-xl p-8 text-center">
            <p className="text-4xl" aria-hidden="true">🧑‍🍳</p>
            <h3 className="mt-3 text-xl font-semibold">Estamos preparando el menú</h3>
            <p className="mt-2 text-ink-700">
              El menú de la próxima semana se publica el viernes. Suscríbete y te avisamos en cuanto esté listo.
            </p>
            <ButtonLink href="/suscribirse" className="mt-6">
              Avísame
            </ButtonLink>
          </Card>
        )}
      </Container>
    </section>
  );
}
