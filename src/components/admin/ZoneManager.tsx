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
      window.location.reload();
    } else {
      alert(res.error || 'Error al crear la zona');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-neutral-900">Gestión de Zonas y Horarios</h3>
          <p className="text-neutral-600 text-sm mt-0.5">Configura las zonas de cobertura y sus ventanas de entrega.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#236B4D] hover:bg-[#1C573D] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
        >
          + Nueva Zona
        </button>
      </div>

      <div className="overflow-x-auto border border-[#EBE3D5] rounded-2xl bg-white shadow-sm">
        <table className="min-w-full divide-y divide-[#EBE3D5]">
          <thead className="bg-[#FAF6F0]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Zona</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Ventana de Entrega</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#236B4D] uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#EBE3D5]">
            {zones.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-neutral-500">
                  No hay zonas registradas. Agrega una nueva zona.
                </td>
              </tr>
            ) : (
              zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{zone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    <span className="bg-[#D2ECE1] text-[#236B4D] px-2.5 py-1 rounded-full text-xs font-semibold">
                      {zone.deliveryWindow}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button className="text-[#236B4D] hover:text-[#1C573D] transition-colors">Editar</button>
                    <button className="text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear Zona */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-xl border border-[#EBE3D5]">
            <h4 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Agregar Nueva Zona</h4>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nombre de la Zona</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Centro, Norte, etc."
                  className="w-full bg-[#FAF6F0] border border-[#EBE3D5] rounded-2xl p-3 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Ventana de Entrega</label>
                <input
                  type="text"
                  required
                  value={deliveryWindow}
                  onChange={(e) => setDeliveryWindow(e.target.value)}
                  placeholder="Ej. 13:00 - 14:00 hrs"
                  className="w-full bg-[#FAF6F0] border border-[#EBE3D5] rounded-2xl p-3 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D] focus:bg-white transition-all"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#236B4D] hover:bg-[#1C573D] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
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