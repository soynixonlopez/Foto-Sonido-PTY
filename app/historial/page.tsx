"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders } from "@/lib/supabase/client-orders";
import type { OrderRow } from "@/lib/supabase/client-orders";

const STATUS_LABELS: Record<string, string> = {
  pendiente: "En proceso",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-PA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function HistorialPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"todos" | "comprados" | "cancelados" | "proceso">("todos");

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getMyOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user]);

  const filtered =
    filter === "todos"
      ? orders
      : filter === "comprados"
      ? orders.filter((o) => o.status === "entregado")
      : filter === "cancelados"
      ? orders.filter((o) => o.status === "cancelado")
      : orders.filter((o) => o.status === "pendiente" || o.status === "enviado");

  if (authLoading || (user && loading)) {
    return (
      <>
        <Header />
        <main className="w-full min-h-screen py-8 flex items-center justify-center">
          <p className="text-gray-500">Cargando historial...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Historial de compras</h1>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Inicia sesión para ver tu historial de pedidos.</p>
              <Link
                href="/iniciar-sesion"
                className="inline-block mt-4 text-foto-red font-semibold hover:underline"
              >
                Iniciar sesión
              </Link>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Historial de compras</h1>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["todos", "comprados", "proceso", "cancelados"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-foto-red text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f === "todos"
                  ? "Todos"
                  : f === "comprados"
                  ? "Comprados"
                  : f === "proceso"
                  ? "En proceso"
                  : "Cancelados"}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">
                {filter === "todos"
                  ? "Aún no tienes pedidos."
                  : filter === "comprados"
                  ? "No tienes pedidos entregados."
                  : filter === "cancelados"
                  ? "No tienes pedidos cancelados."
                  : "No tienes pedidos en proceso."}
              </p>
              <Link href="/productos" className="inline-block mt-4 text-foto-red font-semibold hover:underline">
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {filtered.map((o) => (
                <li
                  key={o.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex flex-wrap justify-between items-center gap-3"
                >
                  <div>
                    <span className="font-medium text-gray-900">Pedido #{o.id.slice(0, 8)}</span>
                    <span className="text-gray-500 text-sm block mt-0.5">{formatDate(o.created_at)}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foto-red block">
                      ${(o.total ?? 0).toFixed(2)}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        o.status === "entregado"
                          ? "text-green-600"
                          : o.status === "cancelado"
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {STATUS_LABELS[o.status] ?? o.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 text-center">
            <Link href="/cuenta" className="text-foto-red font-medium hover:underline">
              ← Volver a Mi cuenta
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
