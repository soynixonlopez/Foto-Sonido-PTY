"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

function CartItemRow({
  item,
  product,
  onRemove,
}: {
  item: { id: string; qty: number };
  product: Product | null;
  onRemove: () => void;
}) {
  if (!product) return null;
  const subtotal = product.price * item.qty;
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <Image src={product.image} alt={product.name} fill className="object-contain" sizes="96px" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/productos/${product.id}`} className="font-medium text-gray-900 hover:text-foto-red line-clamp-2">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">Cantidad: {item.qty}</p>
        <p className="text-foto-red font-semibold mt-1">${subtotal.toFixed(2)}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
        aria-label="Quitar del carrito"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

export default function CarritoPage() {
  const { items, remove } = useCart();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  const itemsKey = items.length + "-" + items.map((i) => i.id).sort().join(",");
  useEffect(() => {
    if (items.length === 0) {
      setProducts({});
      setLoading(false);
      return;
    }
    setLoading(true);
    const load = async () => {
      const map: Record<string, Product> = {};
      await Promise.all(
        items.map(async (item) => {
          try {
            const res = await fetch(`/api/products/${item.id}`);
            if (res.ok) {
              const p = await res.json();
              map[p.id] = p;
            }
          } catch (_) {}
        })
      );
      setProducts(map);
      setLoading(false);
    };
    load();
  }, [itemsKey]);

  const total = items.reduce((sum, item) => {
    const p = products[item.id];
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Carrito de compras</h1>
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Tu carrito está vacío.</p>
              <Link
                href="/productos"
                className="inline-block mt-4 py-2.5 px-5 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark transition-colors"
              >
                Ver productos
              </Link>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
              Cargando...
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      product={products[item.id] ?? null}
                      onRemove={() => remove(item.id)}
                    />
                  ))}
                </div>
                <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-foto-red">${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/productos"
                    className="mt-4 block w-full py-3 rounded-lg bg-foto-red text-white text-center font-semibold hover:bg-foto-red-dark transition-colors"
                  >
                    Proceder al checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
