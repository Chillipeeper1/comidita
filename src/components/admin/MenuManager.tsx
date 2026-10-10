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
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-neutral-900">Gestión de Menús Diarios</h3>
          <p className="text-neutral-600 text-sm mt-0.5">Administra las opciones de platillos para cada semana.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-[#236B4D] hover:bg-[#1C573D] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
        >
          + Nuevo Menú
        </button>
      </div>

      <div className="space-y-6">
        {menus.length === 0 ? (
          <div className="text-center py-10 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#EBE3D5]">
            <p className="text-sm text-neutral-500">No hay menús registrados. Agrega uno nuevo.</p>
          </div>
        ) : (
          menus.map((menu) => (
            <div key={menu.id} className="border border-[#EBE3D5] rounded-2xl p-5 md:p-6 bg-[#FAF6F0]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-[#EBE3D5] pb-3 gap-2">
                <div>
                  <span className="font-semibold text-neutral-900 block">
                    Inicio de Semana: {new Date(menu.weekStart).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Límite de pedidos: {new Date(menu.orderDeadline).toLocaleString()}
                  </span>
                </div>
                <span className="text-xs bg-[#D2ECE1] text-[#236B4D] px-3 py-1 rounded-full font-semibold">
                  Activo
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menu.options && menu.options.map((option) => (
                  <div key={option.id} className="bg-white p-4 rounded-2xl border border-[#EBE3D5] shadow-sm">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-neutral-900">{option.name}</h4>
                      <span className="text-[#236B4D] font-bold">${option.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para Crear Menú */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-xl my-8 border border-[#EBE3D5]">
            <h4 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Crear Nuevo Menú</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Inicio de Semana (Fecha)</label>
                  <input
                    type="date"
                    name="weekStart"
                    required
                    className="w-full bg-[#FAF6F0] border border-[#EBE3D5] rounded-2xl p-3 text-sm focus:ring-2 focus:ring-[#236B4D] focus:bg-white text-neutral-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Límite de Pedidos</label>
                  <input
                    type="datetime-local"
                    name="orderDeadline"
                    required
                    className="w-full bg-[#FAF6F0] border border-[#EBE3D5] rounded-2xl p-3 text-sm focus:ring-2 focus:ring-[#236B4D] focus:bg-white text-neutral-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-neutral-900 text-sm">Opciones de Platillos</h5>
                
                {/* Opción 1 */}
                <div className="p-4 border border-[#EBE3D5] rounded-2xl bg-[#FAF6F0] space-y-3">
                  <p className="text-xs font-semibold text-[#236B4D] uppercase">Opción 1</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="opt1_name"
                        required
                        placeholder="Nombre del platillo (ej. Pechuga asada)"
                        className="w-full bg-white border border-[#EBE3D5] rounded-xl p-2.5 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D]"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        name="opt1_price"
                        required
                        placeholder="Precio ($)"
                        className="w-full bg-white border border-[#EBE3D5] rounded-xl p-2.5 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D]"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="opt1_desc"
                      required
                      placeholder="Descripción corta (ej. Con arroz y ensalada)"
                      className="w-full bg-white border border-[#EBE3D5] rounded-xl p-2.5 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D]"
                    />
                  </div>
                </div>

                {/* Opción 2 */}
                <div className="p-4 border border-[#EBE3D5] rounded-2xl bg-[#FAF6F0] space-y-3">
                  <p className="text-xs font-semibold text-[#236B4D] uppercase">Opción 2</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="opt2_name"
                        required
                        placeholder="Nombre del platillo (ej. Milanesa)"
                        className="w-full bg-white border border-[#EBE3D5] rounded-xl p-2.5 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D]"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        name="opt2_price"
                        required
                        placeholder="Precio ($)"
                        className="w-full bg-white border border-[#EBE3D5] rounded-xl p-2.5 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D]"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="opt2_desc"
                      required
                      placeholder="Descripción corta"
                      className="w-full bg-white border border-[#EBE3D5] rounded-xl p-2.5 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-[#236B4D]"
                    />
                  </div>
                </div>
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