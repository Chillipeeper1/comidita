'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SubscriberTable from '@/components/admin/SubscriberTable';
import MenuManager from '@/components/admin/MenuManager';
import ZoneManager from '@/components/admin/ZoneManager';
import { getSubscribers, getMenus, getZones } from '@/actions/adminActions';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [menus, setMenus] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('comidita_admin_auth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    async function fetchData() {
      try {
        const [subsData, menusData, zonesData] = await Promise.all([
          getSubscribers(),
          getMenus(),
          getZones(),
        ]);

        console.log('📌 DATOS RECIBIDOS DEL SERVIDOR:', {
          suscriptores: subsData,
          menus: menusData,
          zonas: zonesData,
        });

        // Forzamos la serialización segura a objetos planos
        setSubscribers(subsData ? JSON.parse(JSON.stringify(subsData)) : []);
        setMenus(menusData ? JSON.parse(JSON.stringify(menusData)) : []);
        setZones(zonesData ? JSON.parse(JSON.stringify(zonesData)) : []);
      } catch (error) {
        console.error('Error cargando datos del panel:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('comidita_admin_auth');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <p className="text-[#236B4D] font-medium animate-pulse">Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] p-6 md:p-10 font-sans text-neutral-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-[#EBE3D5] gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#236B4D] uppercase bg-[#D2ECE1] px-3 py-1 rounded-full">
              Panel Interno
            </span>
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mt-2">
              Comidita <span className="text-[#236B4D] font-normal text-xl">/ Administración</span>
            </h1>
            <p className="text-neutral-600 text-sm mt-1">Gestión general de suscriptores, menús y configuración de zonas.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-neutral-100 hover:bg-red-50 text-neutral-700 hover:text-red-600 border border-neutral-200 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Secciones del Panel */}
        <div className="space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#EBE3D5]">
            <SubscriberTable subscribers={subscribers} />
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#EBE3D5]">
            <MenuManager menus={menus} />
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#EBE3D5]">
            <ZoneManager zones={zones} />
          </div>
        </div>

      </div>
    </div>
  );
}