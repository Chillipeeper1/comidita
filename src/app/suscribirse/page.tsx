"use client";

import { useActionState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";
import { registerSubscriber, FormState } from "./actions";

const initialState: FormState = {};

export default function SubscribePage() {
  const [state, formAction, isPending] = useActionState(registerSubscriber, initialState);

  // HU-18 y HU-20: Confirmación con mensaje y enlace directo a WhatsApp
  if (state.success && state.data) {
    const message = `¡Hola Comidita! Acabo de suscribirme. Mi nombre es ${state.data.name}, zona: ${state.data.zone}, horario: ${state.data.schedule}.`;

    return (
      <Container className="max-w-xl py-16">
        <Card className="p-8 text-center bg-white border-brand-600 border-2 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand-100 text-brand-700">
            ✓
          </div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            ¡Suscripción Registrada!
          </h1>
          <p className="mt-3 text-ink-700">
            Gracias <strong>{state.data.name}</strong>. Tu registro ha sido procesado correctamente.
          </p>
          <p className="mt-2 text-sm text-ink-700">
            Para completar la confirmación de tu menú, haz clic en el siguiente botón para escribirnos directamente por WhatsApp.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <ButtonLink
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              Confirmar pedido por WhatsApp
            </ButtonLink>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="max-w-xl py-12">
      <Card className="p-8 bg-white shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-ink-900 text-center">
          Suscríbete a Comidita
        </h1>
        <p className="mt-2 text-ink-700 text-center text-sm">
          Recibe tus almuerzos caseros semanales en la puerta de tu oficina o residencia.
        </p>

        {/* HU-16: Mensajes de error en pantalla */}
        {state.error && (
          <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {state.error}
          </div>
        )}

        {/* HU-12 y HU-14: Formulario de suscripción */}
        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink-900 mb-1">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ej. Ana García"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-600 text-ink-900"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-ink-900 mb-1">
              Teléfono / WhatsApp
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              required
              placeholder="Ej. 5512345678"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-600 text-ink-900"
            />
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-ink-900 mb-1">
              Zona de entrega
            </label>
            <input
              id="zone"
              name="zone"
              type="text"
              required
              placeholder="Ej. Zona Centro / Corporativo Sur"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-600 text-ink-900"
            />
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-ink-900 mb-1">
              Horario preferido
            </label>
            <input
              id="schedule"
              name="schedule"
              type="text"
              required
              placeholder="Ej. 13:00 a 14:00 h"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-600 text-ink-900"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-6"
            disabled={isPending}
          >
            {isPending ? "Guardando..." : "Completar Suscripción"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}