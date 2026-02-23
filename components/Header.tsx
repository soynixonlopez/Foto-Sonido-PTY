"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count: cartCount } = useCart();
  const navLinks = [
    { label: "FAQ", href: "#faq" },
    { label: "Novedades", href: "#novedades" },
    { label: "Blog", href: "#blog" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Talleres", href: "#talleres" },
  ];

  return (
    <header className="bg-foto-red-dark text-white sticky top-0 z-50 shadow-lg">
      {/* Fila superior: logo, búsqueda, iconos usuario */}
      <div className="w-full px-2 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Menú hamburguesa + Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/productos"
              className="p-2 rounded hover:bg-white/10 transition-colors"
              aria-label="Menú de filtros y categorías"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </Link>
            <a href="/" className="flex items-center shrink-0 font-bold text-xl uppercase tracking-tight">
              Foto Sonido
            </a>
          </div>

          {/* Barra de búsqueda con botón amarillo */}
          <div className="flex-1 max-w-xl w-full min-w-[180px]">
            <form className="flex rounded-lg overflow-hidden bg-white shadow-sm">
              <input
                type="search"
                placeholder="Buscar productos..."
                className="flex-1 py-2.5 pl-4 pr-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-foto-yellow text-gray-900 px-4 flex items-center justify-center hover:bg-foto-yellow-dark transition-colors"
                aria-label="Buscar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Iconos: filtro (productos), perfil, chat, carrito */}
          <div className="flex items-center gap-1">
            <a href="/productos" className="p-2.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Filtrar productos">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </a>
            <a href="#perfil" className="p-2.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Mi cuenta">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
            <a href="#chat" className="p-2.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Chat">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <a href="#carrito" className="relative p-2.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Carrito">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-1 right-1 bg-foto-yellow text-gray-900 text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Fila inferior: navegación + horario, crédito, socios */}
      <div className="border-t border-white/20">
        <div className="w-full px-2 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Enlaces de navegación (izquierda) */}
          <nav className="flex items-center gap-0 flex-wrap">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-0">
                <a
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium hover:underline"
                >
                  {link.label}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-white/50 select-none" aria-hidden>|</span>
                )}
              </span>
            ))}
          </nav>

          {/* Horario, crédito y socios (derecha) */}
          <div className="flex items-center gap-0 flex-wrap text-sm">
            <a href="#horario" className="flex items-center gap-1.5 px-3 py-1.5 hover:underline">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Horario de sucursales</span>
            </a>
            <span className="text-white/50 select-none" aria-hidden>|</span>
            <a href="#credito" className="flex items-center gap-1.5 px-3 py-1.5 hover:underline">
              <svg className="w-5 h-5 shrink-0 text-foto-yellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
              </svg>
              <span>Opciones de Crédito</span>
            </a>
            <span className="text-white/50 select-none" aria-hidden>|</span>
            <span className="px-2 font-semibold">BAC</span>
            <span className="text-white/50 select-none">|</span>
            <span className="px-2 font-semibold">KrediYA</span>
            <span className="text-white/50 select-none">|</span>
            <span className="px-2 font-semibold italic">epik</span>
          </div>
        </div>
      </div>
    </header>
  );
}
