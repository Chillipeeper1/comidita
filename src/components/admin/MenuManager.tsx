'use client';
import React, { useState } from 'react';
import { createMenu } from '@/actions/adminActions';

interface MenuOption {
  id: string;
  name: string;
  description: string;
  price: number;
  position: number;
}

interface Menu {
  id: string;
  weekStart: string;
  orderDeadline: string;
  options: MenuOption[];
}

interface MenuManagerProps {
  menus: Menu[];
}

export default function MenuManager({ menus }: MenuManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const weekStart = formData.get('weekStart') as string;
    const orderDeadline = formData.get('orderDeadline') as string;

    // Estructuramos explícitamente incluyendo nombre, descripción, precio y posición
    const payload = {
      weekStart,
      orderDeadline,
      options: [
        {
          name: (formData.get('opt1_name') as string) || '',
          description: (formData.get('opt1_desc') as string) || '',
          price: parseFloat(formData.get('opt1_price') as string) || 0,
          position: 1,
        },
        {
          name: (formData.get('opt2_name') as string) || '',
          description: (formData.get('opt2_desc') as string) || '',
          price: parseFloat(formData.get('opt2_price') as string) || 0,
          position: 2,
        },
      ],
    };

    const res = await createMenu(payload);
    setLoading(false);

    if (res.success) {
      setIsOpen(false);
      window.location.reload();
    } else {
      alert(res.error || 'Error al crear el menú');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Gestión de Menús Diarios</h3>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          + Nuevo Menú
        </button>
      </div>

      <div className="space-y-6">
        {menus.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No hay menús registrados. Agrega uno nuevo.</p>
        ) : (
          menus.map((menu) => (
            <div key={menu.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3 border-b pb-2">
                <div>
                  <span className="font-semibold text-gray-700 block">Inicio de Semana: {new Date(menu.weekStart).toLocaleDateString()}</span>
                  <span className="text-xs text-gray-500">Límite: {new Date(menu.orderDeadline).toLocaleString()}</span>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-semibold">
                  Activo
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menu.options && menu.options.map((option) => (
                  <div key={option.id} className="bg-white p-3 rounded border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-950">{option.name}</h4>
                      <span className="text-emerald-600 font-semibold">${option.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para Crear Menú */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl my-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Crear Nuevo Menú</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inicio de Semana (Fecha)</label>
                  <input
                    type="date"
                    name="weekStart"
                    required
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Límite de Pedidos (Fecha y Hora)</label>
                  <input
                    type="datetime-local"
                    name="orderDeadline"
                    required
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800 text-sm">Opciones de Platillos</h5>
                
                {/* Opción 1 */}
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Opción 1</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="opt1_name"
                        required
                        placeholder="Nombre del platillo (ej. Pechuga asada)"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        name="opt1_price"
                        required
                        placeholder="Precio ($)"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="opt1_desc"
                      required
                      placeholder="Descripción corta (ej. Acompañado de arroz y ensalada)"
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900"
                    />
                  </div>
                </div>

                {/* Opción 2 */}
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Opción 2</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="opt2_name"
                        required
                        placeholder="Nombre del platillo (ej. Milanesa)"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        name="opt2_price"
                        required
                        placeholder="Precio ($)"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="opt2_desc"
                      required
                      placeholder="Descripción corta"
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
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
                  {loading ? 'Guardando menú...' : 'Guardar Menú'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}