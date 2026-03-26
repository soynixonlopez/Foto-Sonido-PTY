"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders, getMyPoints } from "@/lib/supabase/client-orders";

export default function CuentaPage() {
  const { user, loading: authLoading } = useAuth();
  const [points, setPoints] = useState<number | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      setPoints(null);
      setOrdersCount(null);
      return;
    }
    getMyPoints().then(setPoints);
    getMyOrders().then((orders) => setOrdersCount(orders.length));
  }, [user]);

  if (authLoading) {
    return (
      <>
        <Header />
        <main className="w-full min-h-screen py-8 flex items-center justify-center">
          <p className="text-gray-500">Cargando...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="w-full min-h-screen py-8 sm:py-12">
          <div className="w-full max-w-2xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi cuenta</h1>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Inicia sesión para ver tu cuenta, pedidos y puntos.</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/iniciar-sesion"
                  className="py-2.5 px-5 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  className="py-2.5 px-5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mi cuenta</h1>
          <p className="text-gray-600 text-sm mb-6">{user.email}</p>

          {/* Resumen: puntos y pedidos */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Puntos acumulados</p>
              <p className="text-2xl font-bold text-foto-red mt-1">
                {points !== null ? points : "—"}
              </p>
              <p className="text-xs text-gray-500 mt-1">Ganas puntos con cada compra entregada.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Mis pedidos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {ordersCount !== null ? ordersCount : "—"}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total de pedidos realizados.</p>
            </div>
          </div>

          {/* Accesos rápidos */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Accesos rápidos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/historial"
              className="block p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-foto-red/30 transition-all"
            >
              <span className="font-semibold text-gray-900">Historial de compras</span>
              <p className="text-sm text-gray-500 mt-1">Ver pedidos, comprados y cancelados</p>
            </Link>
            <Link
              href="/rastrear-pedido"
              className="block p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-foto-red/30 transition-all"
            >
              <span className="font-semibold text-gray-900">Rastrear pedido</span>
              <p className="text-sm text-gray-500 mt-1">Consulta el estado de tu envío</p>
            </Link>
            <Link
              href="/productos"
              className="block p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-foto-red/30 transition-all sm:col-span-2"
            >
              <span className="font-semibold text-gray-900">Seguir comprando</span>
              <p className="text-sm text-gray-500 mt-1">Explorar productos y ofertas</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
