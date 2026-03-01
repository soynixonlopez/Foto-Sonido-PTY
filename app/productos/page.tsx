"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import {
  filterProducts,
  FILTER_BRANDS,
  FILTER_FAMILIES,
  FILTER_CLASSES,
} from "@/lib/products-data";
<<<<<<< HEAD
import { getMarketplaceProducts } from "@/lib/supabase/public";
=======
import { useCart } from "@/context/CartContext";
>>>>>>> 489535aa1ccb5cbf6788dd4aa79f3d4426b3abb7
import type { Product } from "@/lib/types";

const PRICE_MAX = 9000;
const PAGE_SIZE = 12;

<<<<<<< HEAD
function filterProductList(
  list: Product[],
  opts: { minPrice: number; maxPrice: number; brands: string[]; families: string[]; sort: "relevance" | "price-asc" | "price-desc" }
): Product[] {
  let out = list.filter((p) => p.price >= opts.minPrice && p.price <= opts.maxPrice);
  if (opts.brands.length > 0) out = out.filter((p) => opts.brands.includes(p.brand));
  if (opts.families.length > 0) out = out.filter((p) => opts.families.includes(p.family));
  if (opts.sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
  if (opts.sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
  return out;
}

function ProductListingCard({ product }: { product: Product }) {
=======
function ProductListingCard({ product, onAddToCart }: { product: Product; onAddToCart: (id: string) => void }) {
>>>>>>> 489535aa1ccb5cbf6788dd4aa79f3d4426b3abb7
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <Link href={`/productos/${product.id}`} className="block flex-1">
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          />
        </div>
      </Link>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {product.brand}
        </p>
        <Link href={`/productos/${product.id}`} className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2 hover:text-foto-red">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-foto-red font-bold text-base sm:text-lg">
            Ahora ${product.price.toFixed(2)}
          </span>
          {product.previousPrice && (
            <span className="text-sm text-gray-400">
              Antes <span className="line-through">${product.previousPrice.toFixed(2)}</span>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onAddToCart(product.id); }}
          className="mt-3 w-full py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          AGREGAR AL CARRITO
        </button>
      </div>
    </article>
  );
}

function FilterSection({
  title,
  open: initialOpen,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(initialOpen ?? true);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full py-3 flex items-center justify-between text-left font-semibold text-gray-800"
      >
        {title}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

export default function ProductosPage() {
<<<<<<< HEAD
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
=======
  const { add: addToCart } = useCart();
>>>>>>> 489535aa1ccb5cbf6788dd4aa79f3d4426b3abb7
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMarketplaceProducts().then((list) => {
      setProducts(list);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(
    () =>
      filterProductList(products, {
        minPrice,
        maxPrice,
        brands: selectedBrands,
        families: selectedFamilies,
        classes: selectedClasses,
        sort,
      }),
<<<<<<< HEAD
    [products, minPrice, maxPrice, selectedBrands, selectedFamilies, sort]
=======
    [minPrice, maxPrice, selectedBrands, selectedFamilies, selectedClasses, sort]
>>>>>>> 489535aa1ccb5cbf6788dd4aa79f3d4426b3abb7
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
  const toggleClass = (c: string) => {
    setSelectedClasses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const displayed = filtered.slice(0, PAGE_SIZE);
  const total = filtered.length;

  const sidebarContent = (
    <aside className="lg:w-72 xl:w-80 shrink-0 space-y-1 bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-fit lg:sticky lg:top-24">
      <div className="flex items-center justify-between lg:hidden mb-2">
        <h2 className="font-bold text-gray-800 text-lg">Filtros</h2>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Cerrar filtros"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <FilterSection title="Precio" open={true}>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            min={0}
            max={PRICE_MAX}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
            className="w-20 sm:w-24 rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min={0}
            max={PRICE_MAX}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || PRICE_MAX)}
            className="w-20 sm:w-24 rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-foto-red"
        />
      </FilterSection>

      <FilterSection title="Marca" open={true}>
        <ul className="max-h-44 overflow-y-auto space-y-1.5">
          {FILTER_BRANDS.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`brand-${b}`}
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="rounded border-gray-300 text-foto-red focus:ring-foto-red"
              />
              <label htmlFor={`brand-${b}`} className="text-sm text-gray-700 capitalize cursor-pointer">
                {b}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Familia" open={true}>
        <ul className="max-h-44 overflow-y-auto space-y-1.5">
          {FILTER_FAMILIES.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`fam-${f}`}
                checked={selectedFamilies.includes(f)}
                onChange={() => toggleFamily(f)}
                className="rounded border-gray-300 text-foto-red focus:ring-foto-red"
              />
              <label htmlFor={`fam-${f}`} className="text-sm text-gray-700 cursor-pointer">
                {f}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Clase" open={true}>
        <ul className="max-h-44 overflow-y-auto space-y-1.5">
          {FILTER_CLASSES.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`class-${c}`}
                checked={selectedClasses.includes(c)}
                onChange={() => toggleClass(c)}
                className="rounded border-gray-300 text-foto-red focus:ring-foto-red"
              />
              <label htmlFor={`class-${c}`} className="text-sm text-gray-700 cursor-pointer">
                {c}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  );

  return (
    <>
      <Header />
<<<<<<< HEAD
      <div className="w-full px-2 py-4 min-h-screen bg-gray-50">
        {loading && (
          <div className="flex justify-center py-8 text-gray-500">Cargando productos...</div>
        )}
=======
      <div className="w-full px-2 sm:px-4 py-4 min-h-screen bg-gray-50">
>>>>>>> 489535aa1ccb5cbf6788dd4aa79f3d4426b3abb7
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
          {/* Sidebar desktop: visible en lg+ */}
          <div className="hidden lg:block">{sidebarContent}</div>

          {/* Overlay móvil/tablet para drawer */}
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-xl overflow-y-auto lg:hidden">
                {sidebarContent}
              </div>
            </>
          )}

          {/* Área principal: botón Filtros (móvil) + ordenar + grid */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 shadow-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
                {(selectedBrands.length + selectedFamilies.length + selectedClasses.length) > 0 && (
                  <span className="bg-foto-red text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
                    {selectedBrands.length + selectedFamilies.length + selectedClasses.length}
                  </span>
                )}
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white ml-auto"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {displayed.map((product) => (
                <ProductListingCard key={product.id} product={product} onAddToCart={addToCart} />
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
