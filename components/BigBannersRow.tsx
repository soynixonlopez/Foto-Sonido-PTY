"use client";

import Image from "next/image";
import type { BigBannerItem } from "@/lib/types";

interface BigBannersRowProps {
  banners: BigBannerItem[];
}

export default function BigBannersRow({ banners }: BigBannersRowProps) {
  return (
    <section className="w-full py-6 sm:py-8 px-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 w-full">
        {banners.map((b) => (
          <article
            key={b.id}
            className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] ${b.bgClass ?? "bg-gray-800"}`}
          >
            <div className="absolute inset-0">
              <Image
                src={b.image}
                alt={b.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            {b.brand && (
              <span className="absolute top-3 right-3 z-10 text-white text-sm font-bold tracking-wider">
                {b.brand}
              </span>
            )}
            <div className="relative z-10 flex flex-col justify-end p-5 h-full min-h-[220px] text-white">
              <h3 className="text-xl font-bold">{b.title}</h3>
              {b.subtitle && (
                <p className="text-sm text-white/90 mt-1">{b.subtitle}</p>
              )}
              <div className="mt-3 flex justify-end">
                <span className="w-10 h-10 rounded-full bg-foto-red flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
