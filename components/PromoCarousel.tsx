"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PromoCarouselItem } from "@/lib/types";
import AdaptiveBannerMedia from "./AdaptiveBannerMedia";

interface PromoCarouselProps {
  items: PromoCarouselItem[];
  /** Intervalo autoplay (ms) */
  autoPlayMs?: number;
}

export default function PromoCarousel({ items, autoPlayMs = 5500 }: PromoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pauseAuto, setPauseAuto] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (reduceMotion || items.length < 2 || pauseAuto) return;
    const el = scrollRef.current;
    if (!el) return;
    const tick = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 8) return;
      if (el.scrollLeft >= maxScroll - 12) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    };
    const id = window.setInterval(tick, autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, items.length, pauseAuto, reduceMotion, scroll]);

  return (
    <section className="w-full py-6 sm:py-8" aria-roledescription="carrusel">
      <div className="w-full px-2 flex items-stretch gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="shrink-0 self-center w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm z-10"
          aria-label="Anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          onMouseEnter={() => setPauseAuto(true)}
          onMouseLeave={() => setPauseAuto(false)}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2 flex-1 snap-x snap-mandatory"
        >
          {items.map((item, i) => (
            <article
              key={item.id}
              data-carousel-card
              className="relative shrink-0 w-[min(100%,300px)] sm:w-[min(100%,340px)] snap-start rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
            >
              <AdaptiveBannerMedia
                src={item.image}
                alt={item.title}
                initialAspectRatio={item.aspectRatio}
                fallbackAspectRatio={5 / 4}
                priority={i === 0}
                sizes="340px"
                className="rounded-t-2xl"
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{item.title}</h3>
                  <p className="text-sm text-white/95 mt-1 drop-shadow-sm">{item.subtitle}</p>
                  {item.cta && (
                    <span className="inline-block mt-2 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg shadow-sm">
                      {item.cta}
                    </span>
                  )}
                </div>
              </AdaptiveBannerMedia>
              <div className="p-3 flex items-center justify-end border-t border-gray-100 bg-white">
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
          className="shrink-0 self-center w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm z-10"
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
