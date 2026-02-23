"use client";

import { useRef } from "react";
import { brandMarks } from "@/lib/data";

export default function BrandStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-gray-100/80 py-6 sm:py-8 border-y border-gray-200">
      <div className="w-full px-2">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Nuestras Marcas</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2 flex-1"
          >
            {brandMarks.map((brand) => (
              <div
                key={brand.id}
                className="shrink-0 w-32 h-14 sm:w-36 sm:h-14 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm font-semibold text-gray-700 hover:border-foto-red hover:text-foto-red transition-colors px-4"
              >
                {brand.name}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
