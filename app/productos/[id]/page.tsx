"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { getMarketplaceProductById } from "@/lib/supabase/public";
import { getProductById } from "@/lib/products-data";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

const WHATSAPP_NUMBER = "50760000000";
const WHATSAPP_MSG = (name: string, price: number) =>
  `Hola, me interesa comprar: ${encodeURIComponent(name)} - $${price.toFixed(2)}`;

export default function ProductoDetallePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [orderModal, setOrderModal] = useState(false);
  const [orderEmail, setOrderEmail] = useState("");
  const [orderQty, setOrderQty] = useState(1);
  const [orderSending, setOrderSending] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      return;
    }
    getMarketplaceProductById(id).then((p) => {
      if (p) setProduct(p);
      else setProduct(getProductById(id) ?? null);
    });
  }, [id]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setOrderError(null);
    setOrderSending(true);
    try {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        setOrderError("Supabase no configurado. Configura las variables de entorno para registrar pedidos.");
        setOrderSending(false);
        return;
      }
      const total = product.price * orderQty;
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({ status: "pendiente", total, user_email: orderEmail || null })
        .select("id")
        .single();
      if (orderErr || !order) {
        setOrderError(orderErr?.message ?? "No se pudo crear el pedido.");
        return;
      }
      const { error: itemErr } = await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: product.id,
        quantity: orderQty,
        price: product.price,
      });
      if (itemErr) {
        setOrderError(itemErr.message);
        return;
      }
      setOrderDone(true);
      setTimeout(() => {
        setOrderModal(false);
        setOrderDone(false);
        setOrderEmail("");
        setOrderQty(1);
      }, 2000);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Error al registrar el pedido.");
    } finally {
      setOrderSending(false);
    }
  };

  if (product === undefined) {
    return (
      <>
        <Header />
        <div className="w-full px-2 py-12 text-center text-gray-500">Cargando...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="w-full px-2 py-12 text-center">
          <p className="text-gray-500">Producto no encontrado.</p>
          <Link href="/productos" className="mt-4 inline-block text-foto-red font-medium">
            Ver todos los productos
          </Link>
        </div>
      </>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG(product.name, product.price))}`;

  return (
    <>
      <Header />
      <div className="w-full px-2 py-6 min-h-screen bg-gray-50">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-foto-red">Inicio</Link>
          <span className="mx-1">&gt;</span>
          <Link href="/productos" className="hover:text-foto-red">Productos</Link>
          <span className="mx-1">&gt;</span>
          <span className="text-gray-700 line-clamp-1">{product.name}</span>
        </nav>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 space-y-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200"
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/2">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {product.brand}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-foto-red">
                ${product.price.toFixed(2)}
              </span>
              {product.previousPrice && (
                <span className="text-gray-400 line-through">
                  Antes ${product.previousPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {product.specs && product.specs.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm text-gray-600">
                {product.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-foto-red" />
                    {s}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Comprar por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setOrderModal(true)}
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Hacer pedido
              </button>
            </div>
          </div>
        </div>
      </div>

      {orderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900">Registrar pedido</h3>
            <p className="text-sm text-gray-500 mt-1">
              {product.name} — ${product.price.toFixed(2)} × {orderQty} = ${(product.price * orderQty).toFixed(2)}
            </p>
            {orderDone ? (
              <p className="mt-4 text-green-600 font-medium">Pedido registrado correctamente.</p>
            ) : (
              <form onSubmit={handleSubmitOrder} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="order-email" className="block text-sm font-medium text-gray-700 mb-1">Correo (opcional)</label>
                  <input
                    id="order-email"
                    type="email"
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="tu@correo.com"
                  />
                </div>
                <div>
                  <label htmlFor="order-qty" className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    id="order-qty"
                    type="number"
                    min={1}
                    value={orderQty}
                    onChange={(e) => setOrderQty(Number(e.target.value) || 1)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                  />
                </div>
                {orderError && <p className="text-sm text-red-600">{orderError}</p>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => { setOrderModal(false); setOrderError(null); }}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={orderSending}
                    className="px-4 py-2 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark disabled:opacity-50"
                  >
                    {orderSending ? "Enviando..." : "Confirmar pedido"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
