"use client";

import { useEffect, useState } from "react";
import type { BigBannerItem } from "@/lib/types";
import AdaptiveBannerMedia from "./AdaptiveBannerMedia";

interface BigBannersRowProps {
  banners: BigBannerItem[];
  /** Rota qué banner resalta (sutil) cada N ms; 0 = desactivado */
  spotlightMs?: number;
}

export default function BigBannersRow({ banners, spotlightMs = 8000 }: BigBannersRowProps) {
  const [spotlight, setSpotlight] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || spotlightMs <= 0 || banners.length < 2) return;
    const id = window.setInterval(() => {
      setSpotlight((i) => (i + 1) % banners.length);
    }, spotlightMs);
    return () => window.clearInterval(id);
  }, [banners.length, reduceMotion, spotlightMs]);

  return (
    <section className="w-full py-6 sm:py-8 px-2" aria-label="Banners destacados">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full items-start">
        {banners.map((b, i) => (
          <article
            key={b.id}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-[transform,box-shadow] duration-500 ${
              i === spotlight ? "md:ring-2 md:ring-foto-red/80 md:shadow-xl md:-translate-y-0.5" : ""
            } ${b.bgClass ?? "bg-gray-100"}`}
          >
            <AdaptiveBannerMedia
              src={b.image}
              alt={b.title}
              initialAspectRatio={b.aspectRatio}
              fallbackAspectRatio={16 / 10}
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 400px"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              {b.brand && (
                <span className="absolute top-3 right-3 z-10 text-white text-sm font-bold tracking-wider drop-shadow-md">
                  {b.brand}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-5 text-white">
                <h3 className="text-xl font-bold drop-shadow-sm">{b.title}</h3>
                {b.subtitle && <p className="text-sm text-white/90 mt-1 drop-shadow-sm">{b.subtitle}</p>}
                <div className="mt-3 flex justify-end">
                  <span className="w-10 h-10 rounded-full bg-foto-red flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </AdaptiveBannerMedia>
          </article>
        ))}
      </div>
    </section>
  );
}
