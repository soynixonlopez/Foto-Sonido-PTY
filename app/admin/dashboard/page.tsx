"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalProducts: number;
  visibleProducts: number;
  draftProducts: number;
  totalOrders: number;
  totalOrderItems: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const [productsRes, ordersRes, itemsRes] = await Promise.all([
        supabase.from("products").select("id, is_visible", { count: "exact", head: false }),
        supabase.from("orders").select("id", { count: "exact", head: false }),
        supabase.from("order_items").select("id, quantity", { count: "exact", head: false }),
      ]);

      const products = (productsRes.data ?? []) as { id: string; is_visible: boolean }[];
      const totalProducts = products.length;
      const visibleProducts = products.filter((p) => p.is_visible).length;
      const draftProducts = totalProducts - visibleProducts;

      const orders = (ordersRes.data ?? []) as { id: string }[];
      const orderItems = (itemsRes.data ?? []) as { id: string; quantity: number }[];
      const totalOrderItems = orderItems.reduce((acc, i) => acc + (i.quantity ?? 1), 0);

      setStats({
        totalProducts,
        visibleProducts,
        draftProducts,
        totalOrders: orders.length,
        totalOrderItems,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-slate-400">Cargando estadísticas...</div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total productos",
      value: stats.totalProducts,
      subtitle: "En catálogo",
      href: "/admin/productos",
      color: "bg-slate-700 border-slate-600",
    },
    {
      title: "En el marketplace",
      value: stats.visibleProducts,
      subtitle: "Visibles para clientes",
      href: "/admin/productos?visible=1",
      color: "bg-emerald-900/40 border-emerald-700",
    },
    {
      title: "Listos para publicar",
      value: stats.draftProducts,
      subtitle: "Ocultos (borrador)",
      href: "/admin/productos?visible=0",
      color: "bg-amber-900/40 border-amber-700",
    },
    {
      title: "Pedidos realizados",
      value: stats.totalOrders,
      subtitle: "Total de pedidos",
      color: "bg-slate-700 border-slate-600",
    },
    {
      title: "Unidades pedidas",
      value: stats.totalOrderItems,
      subtitle: "Productos en pedidos",
      color: "bg-slate-700 border-slate-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-xl border p-5 ${card.color}`}
          >
            <p className="text-slate-400 text-sm font-medium">{card.title}</p>
            <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{card.subtitle}</p>
            {"href" in card && (
              <Link
                href={(card as { href: string }).href}
                className="mt-3 inline-block text-sm text-foto-red hover:text-foto-yellow transition-colors"
              >
                Ver →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
