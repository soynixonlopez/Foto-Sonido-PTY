"use client";

import { createClient } from "@/lib/supabase/client";
import type { ProductRow } from "@/lib/supabase/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PRODUCT_SECTIONS } from "./ProductForm";

const sectionLabel: Record<string, string> = Object.fromEntries(PRODUCT_SECTIONS.map((s) => [s.key, s.label]));

export default function AdminProductosPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const initialFilter = (searchParams.get("visible") === "1" ? "visible" : searchParams.get("visible") === "0" ? "draft" : "all") as "all" | "visible" | "draft";
  const [filterVisible, setFilterVisible] = useState<"all" | "visible" | "draft">(initialFilter);

  useEffect(() => {
    const supabase = createClient();
    let q = supabase.from("products").select("*").order("created_at", { ascending: false });
    if (filterVisible === "visible") q = q.eq("is_visible", true);
    if (filterVisible === "draft") q = q.eq("is_visible", false);
    q.then(({ data, error }) => {
      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts((data ?? []) as ProductRow[]);
      }
      setLoading(false);
    });
  }, [filterVisible]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Productos</h1>
        <div className="flex items-center gap-3">
          <select
            value={filterVisible}
            onChange={(e) => setFilterVisible(e.target.value as "all" | "visible" | "draft")}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
          >
            <option value="all">Todos</option>
            <option value="visible">En marketplace</option>
            <option value="draft">Borrador</option>
          </select>
          <Link
            href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 rounded-lg bg-foto-red px-4 py-2 text-sm font-semibold text-white hover:bg-foto-red-dark transition-colors"
          >
            Nuevo producto
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400">Cargando...</p>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-12 text-center text-slate-400">
          No hay productos.{" "}
          <Link href="/admin/productos/nuevo" className="text-foto-red hover:underline">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-2 text-slate-400 font-medium text-sm">Imagen</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium text-sm">Nombre / ID</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium text-sm">Precio</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium text-sm">Categoría</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium text-sm">Estado</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium text-sm">Secciones</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-700/70 hover:bg-slate-800/50">
                  <td className="py-2 px-2">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700 relative">
                      {p.images?.[0] ? (
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <span className="text-slate-500 text-xs flex items-center justify-center h-full">Sin imagen</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <p className="text-white font-medium line-clamp-2">{p.name}</p>
                    <p className="text-slate-500 text-xs">{p.product_id}</p>
                    {p.color && (
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-slate-600 shrink-0"
                          style={{ backgroundColor: p.color ?? undefined }}
                          aria-label={`Color ${p.color}`}
                          title={`Color: ${p.color}`}
                        />
                        <span className="text-slate-500 text-[11px] line-clamp-1">{p.color}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex flex-col">
                      <span className="text-white">${Number(p.price).toFixed(2)}</span>
                      {p.previous_price != null && p.previous_price > 0 && (
                        <span className="text-slate-500 text-xs line-through">
                          Antes ${Number(p.previous_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 text-slate-300 text-sm">{p.category}</td>
                  <td className="py-2 px-2">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        p.is_visible ? "bg-emerald-900/50 text-emerald-300" : "bg-amber-900/50 text-amber-300"
                      }`}
                    >
                      {p.is_visible ? "En marketplace" : "Borrador"}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(p.sections) ? p.sections : []).map((key) => (
                        <span key={key} className="inline-flex px-1.5 py-0.5 rounded text-xs bg-slate-600 text-slate-200">
                          {sectionLabel[key] ?? key}
                        </span>
                      ))}
                      {(Array.isArray(p.sections) ? p.sections : []).length === 0 && (
                        <span className="text-slate-500 text-xs">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <Link
                      href={`/admin/productos/${p.id}/editar`}
                      className="text-foto-red hover:text-foto-yellow text-sm font-medium"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
