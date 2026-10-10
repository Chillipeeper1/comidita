import React from 'react';

interface Subscriber {
  id: string;
  name: string;
  contact: string;
  zone: string;
  schedule: string;
  createdAt: string;
}

interface SubscriberTableProps {
  subscribers: Subscriber[];
}

export default function SubscriberTable({ subscribers }: SubscriberTableProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-neutral-900">Gestión de Suscriptores</h3>
        <p className="text-neutral-600 text-sm mt-0.5">Listado de usuarios registrados para recibir los menús.</p>
      </div>

      <div className="overflow-x-auto border border-[#EBE3D5] rounded-2xl bg-white shadow-sm">
        <table className="min-w-full divide-y divide-[#EBE3D5]">
          <thead className="bg-[#FAF6F0]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Zona</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Horario</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#EBE3D5]">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-neutral-500">
                  No hay suscriptores registrados todavía.
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{sub.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{sub.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{sub.zone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    <span className="bg-[#D2ECE1] text-[#236B4D] px-2.5 py-1 rounded-full text-xs font-semibold">
                      {sub.schedule}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}