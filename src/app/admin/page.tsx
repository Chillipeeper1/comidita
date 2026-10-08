'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SubscriberTable from '@/components/admin/SubscriberTable';
import MenuManager from '@/components/admin/MenuManager';
import ZoneManager from '@/components/admin/ZoneManager';
import { getSubscribers, getMenus, getZones } from '@/actions/adminActions';

export default function AdminDashboardPage() {
  const router = useRouter();
  // Tipamos explícitamente los estados para evitar conflictos con TypeScript
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
        setSubscribers(subsData);
        setMenus(menusData);
        setZones(zonesData);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-medium">Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración - Comidita</h1>
            <p className="text-gray-600">Gestión general de suscriptores, menús y configuración de zonas.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Secciones del Panel */}
        <div className="space-y-8">
          <SubscriberTable subscribers={subscribers} />
          <MenuManager menus={menus} />
          <ZoneManager zones={zones} />
        </div>

      </div>
    </div>
  );
}