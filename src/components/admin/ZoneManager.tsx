'use client';
import React, { useState } from 'react';
import { createZone } from '@/actions/adminActions';

interface Zone {
  id: string;
  name: string;
  deliveryWindow: string;
}

interface ZoneManagerProps {
  zones: Zone[];
}

export default function ZoneManager({ zones }: ZoneManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [deliveryWindow, setDeliveryWindow] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createZone({ name, deliveryWindow });
    setLoading(false);

    if (res.success) {
      setName('');
      setDeliveryWindow('');
      setIsOpen(false);
      window.location.reload(); // Recarga para reflejar el nuevo registro de Supabase
    } else {
      alert(res.error || 'Error al crear la zona');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Gestión de Zonas y Horarios</h3>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          + Nueva Zona
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventana de Entrega</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {zones.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay zonas registradas. Agrega una nueva zona.
                </td>
              </tr>
            ) : (
              zones.map((zone) => (
                <tr key={zone.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.deliveryWindow}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear Zona */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Agregar Nueva Zona</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Zona</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Centro, Norte, etc."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ventana de Entrega</label>
                <input
                  type="text"
                  required
                  value={deliveryWindow}
                  onChange={(e) => setDeliveryWindow(e.target.value)}
                  placeholder="Ej. 13:00 - 15:00 hrs"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar Zona'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}