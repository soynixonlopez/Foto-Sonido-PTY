"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RastrearPedidoPage() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState<"idle" | "loading" | "found" | "notfound">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado("loading");
    // Simulación: en producción se consultaría la API de envíos
    setTimeout(() => {
      setResultado(codigo.trim().length >= 5 ? "found" : "notfound");
    }, 800);
  };

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Rastrear pedido</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Ingresa el número de seguimiento que recibiste por correo o SMS.
          </p>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
              Número de pedido o guía
            </label>
            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ej: FS-12345"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-foto-red focus:ring-1 focus:ring-foto-red"
            />
            <button
              type="submit"
              disabled={resultado === "loading"}
              className="mt-4 w-full py-2.5 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark disabled:opacity-60 transition-colors"
            >
              {resultado === "loading" ? "Buscando..." : "Buscar"}
            </button>
          </form>
          {resultado === "found" && (
            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
              <p className="font-medium">Pedido encontrado</p>
              <p className="mt-1">Estado: En tránsito. Te notificaremos cuando esté en camino a tu dirección.</p>
            </div>
          )}
          {resultado === "notfound" && codigo.trim() && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              No encontramos un pedido con ese número. Verifica el código o contáctanos al 204-3030.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
