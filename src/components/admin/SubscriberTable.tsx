import React from 'react';

// Definimos la interfaz basada en tu modelo de Prisma
interface Subscriber {
  id: string;
  name: string;
  contact: string;
  zone: string;
  schedule: string;
  createdAt: Date | string;
}

interface SubscriberTableProps {
  subscribers: Subscriber[];
}

export default function SubscriberTable({ subscribers }: SubscriberTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Gestión de Suscriptores</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscribers.map((sub) => (
            <tr key={sub.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.zone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}