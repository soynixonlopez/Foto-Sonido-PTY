"use client";

import { useRef } from "react";
import Image from "next/image";
import type { PromoCarouselItem } from "@/lib/types";

interface PromoCarouselProps {
  items: PromoCarouselItem[];
}

export default function PromoCarousel({ items }: PromoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="w-full py-6 sm:py-8">
      <div className="w-full px-2 flex items-center gap-2">
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
          {items.map((item) => (
            <article
              key={item.id}
              className="relative shrink-0 w-[280px] sm:w-[300px] rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[5/4]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                  <p className="text-sm text-white/95 mt-1">{item.subtitle}</p>
                  {item.cta && (
                    <span className="inline-block mt-2 px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg">
                      {item.cta}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3 flex items-center justify-end border-t border-gray-100">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  Ver más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
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
    </section>
  );
}
