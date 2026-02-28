"use client";

import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProductRow } from "@/lib/supabase/types";
import ProductForm from "../../ProductForm";
import Link from "next/link";

export default function EditarProductoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [product, setProduct] = useState<ProductRow | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setProduct(null);
          return;
        }
        setProduct(data as ProductRow);
      });
  }, [id]);

  if (product === undefined) {
    return (
      <div className="py-12 text-center text-slate-400">Cargando...</div>
    );
  }

  if (product === null) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400 mb-4">Producto no encontrado.</p>
        <Link href="/admin/productos" className="text-foto-red hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6"
      >
        ← Productos
      </Link>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Editar producto</h1>
        <ProductForm product={product} />
      </div>
    </div>
  );
}
