"use client";

import { useRef } from "react";
import { categories } from "@/lib/data";
import { CategoryIcon } from "./CategoryIcons";

export default function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="w-full px-2 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="shrink-0 w-9 h-9 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-1"
          >
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.slug}`}
                className="flex items-center gap-2.5 shrink-0 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/80 hover:bg-gray-100 hover:border-gray-300 transition-colors text-gray-800"
              >
                <CategoryIcon category={cat} highlight={cat.iconKey === "alarm"} />
                <span className="text-sm font-medium whitespace-nowrap">{cat.name}</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="shrink-0 w-9 h-9 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
