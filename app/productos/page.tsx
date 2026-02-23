"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import {
  allProducts,
  filterProducts,
  FILTER_BRANDS,
  FILTER_FAMILIES,
} from "@/lib/products-data";
import type { Product } from "@/lib/types";

const PRICE_MAX = 9000;
const PAGE_SIZE = 12;

function ProductListingCard({ product }: { product: Product }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/productos/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 50vw, 280px"
          />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {product.brand}
        </p>
        <Link href={`/productos/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2 hover:text-foto-red">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-foto-red font-bold">Ahora ${product.price.toFixed(2)}</span>
          {product.previousPrice && (
            <span className="text-sm text-gray-400">
              Antes <span className="line-through">${product.previousPrice.toFixed(2)}</span>
            </span>
          )}
        </div>
        <button
          type="button"
          className="mt-3 w-full py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          AGREGAR AL CARRITO
        </button>
      </div>
    </article>
  );
}

export default function ProductosPage() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance");

  const filtered = useMemo(
    () =>
      filterProducts({
        minPrice,
        maxPrice,
        brands: selectedBrands,
        families: selectedFamilies,
        sort,
      }),
    [minPrice, maxPrice, selectedBrands, selectedFamilies, sort]
  );

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };
  const toggleFamily = (f: string) => {
    setSelectedFamilies((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const displayed = filtered.slice(0, PAGE_SIZE);
  const total = filtered.length;

  return (
    <>
      <Header />
      <div className="w-full px-2 py-4 min-h-screen bg-gray-50">
        {/* Breadcrumb y resumen */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-foto-red">Página de inicio</Link>
            <span className="mx-1">&gt;</span>
            <span className="text-gray-700">Categorías</span>
          </nav>
          <p className="text-sm text-gray-600">
            1-{Math.min(PAGE_SIZE, total)} de {total} resultados
          </p>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Sidebar filtros */}
          <aside className="lg:w-64 shrink-0 space-y-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                Precio
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={PRICE_MAX}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                  className="w-24 rounded border border-gray-300 px-2 py-1.5 text-sm"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  min={0}
                  max={PRICE_MAX}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || PRICE_MAX)}
                  className="w-24 rounded border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <input
                type="range"
                min={0}
                max={PRICE_MAX}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-2 w-full h-2 bg-foto-red rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Marca</h3>
              <ul className="mt-2 max-h-48 overflow-y-auto space-y-1.5">
                {FILTER_BRANDS.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`brand-${b}`}
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="rounded border-gray-300 text-foto-red focus:ring-foto-red"
                    />
                    <label htmlFor={`brand-${b}`} className="text-sm text-gray-700 capitalize">
                      {b}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Familia</h3>
              <ul className="mt-2 space-y-1.5">
                {FILTER_FAMILIES.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`fam-${f}`}
                      checked={selectedFamilies.includes(f)}
                      onChange={() => toggleFamily(f)}
                      className="rounded border-gray-300 text-foto-red focus:ring-foto-red"
                    />
                    <label htmlFor={`fam-${f}`} className="text-sm text-gray-700">
                      {f}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid de productos */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-end mb-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {displayed.map((product) => (
                <ProductListingCard key={product.id} product={product} />
              ))}
            </div>
            {displayed.length === 0 && (
              <p className="text-center text-gray-500 py-12">
                No hay productos que coincidan con los filtros.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
