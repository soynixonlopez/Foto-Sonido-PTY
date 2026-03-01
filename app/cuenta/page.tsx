"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CuentaPage() {
  // TODO: mostrar datos del usuario si está logueado
  const isLoggedIn = false;

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi cuenta</h1>
          {!isLoggedIn ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Inicia sesión para ver tu cuenta, pedidos y favoritos.</p>
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
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/historial"
                className="block p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-foto-red/30 transition-all"
              >
                <span className="font-semibold text-gray-900">Historial de compras</span>
                <p className="text-sm text-gray-500 mt-1">Ver tus pedidos anteriores</p>
              </Link>
              <Link
                href="/rastrear-pedido"
                className="block p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-foto-red/30 transition-all"
              >
                <span className="font-semibold text-gray-900">Rastrear pedido</span>
                <p className="text-sm text-gray-500 mt-1">Consulta el estado de tu envío</p>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
