"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { Banner } from "@/lib/types";
import AdaptiveBannerMedia from "./AdaptiveBannerMedia";

interface BannerCardProps {
  banner: Banner;
  className?: string;
  priority?: boolean;
}

export default function BannerCard({ banner, className = "", priority = false }: BannerCardProps) {
  const isVertical = banner.variant === "vertical";
  const isHorizontal = banner.variant === "horizontal";
  const tag = banner.tag ?? banner.subtitle;

  const fallbackVertical = 3 / 4;
  const fallbackHorizontal = 2.2;
  const fallbackSquare = 1;

  const outer = (inner: ReactNode) => {
    if (banner.link) {
      return (
        <Link href={banner.link} className={`block ${className}`}>
          {inner}
        </Link>
      );
    }
    return <div className={className}>{inner}</div>;
  };

  if (isVertical) {
    return outer(
      <div
        className={`rounded-2xl overflow-hidden shadow-lg min-h-0 h-full w-full ${banner.bgClass ?? "bg-foto-red"}`}
      >
        <AdaptiveBannerMedia
          src={banner.image}
          alt={banner.title}
          initialAspectRatio={banner.aspectRatio}
          fallbackAspectRatio={fallbackVertical}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 380px"
          className="min-h-0"
          fillParent
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-foto-red/25 to-foto-red/85" />
          <div className="absolute inset-0 z-10 flex flex-col flex-1 justify-end p-5 sm:p-6 text-white pointer-events-none">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/95 drop-shadow-sm">
              {banner.subtitle}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase mt-1 leading-tight max-w-[14ch] drop-shadow-md">
              {banner.title}
            </h2>
          </div>
        </AdaptiveBannerMedia>
      </div>
    );
  }

  if (isHorizontal) {
    return outer(
      <div className={`rounded-2xl overflow-hidden shadow-lg h-full w-full min-h-0 ${banner.bgClass ?? "bg-teal-500"}`}>
        <AdaptiveBannerMedia
          src={banner.image}
          alt={banner.title}
          initialAspectRatio={banner.aspectRatio}
          fallbackAspectRatio={fallbackHorizontal}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 900px"
          fillParent
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6 text-white min-h-[140px]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase drop-shadow-sm">{banner.title}</h2>
              <p className="text-sm text-white/95 mt-1 drop-shadow-sm">{banner.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              {banner.brands && banner.brands.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  {banner.brands.map((b) => (
                    <span
                      key={b.label}
                      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold text-white ${b.bgClass ?? "bg-white/20"}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              ) : null}
              {banner.cta &&
                (banner.link ? (
                  <span className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg text-sm shrink-0">
                    {banner.cta}
                  </span>
                ) : (
                  <button
                    type="button"
                    className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm shrink-0"
                  >
                    {banner.cta}
                  </button>
                ))}
            </div>
          </div>
        </AdaptiveBannerMedia>
      </div>
    );
  }

  // Cuadrados / tarjetas promo: imagen completa + overlay
  return outer(
    <div
      className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-0 h-full w-full group ${className}`}
    >
      <AdaptiveBannerMedia
        src={banner.image}
        alt={banner.title}
        initialAspectRatio={banner.aspectRatio}
        fallbackAspectRatio={fallbackSquare}
        priority={priority}
        sizes="(max-width: 768px) 50vw, 320px"
        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        fillParent
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        {tag && (
          <span className="absolute top-3 left-3 z-10 bg-foto-red text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
            {tag}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-14 z-10 text-white pointer-events-none">
          <h3 className="text-base sm:text-lg font-bold uppercase leading-tight drop-shadow-md">
            {banner.title}
          </h3>
        </div>
        <div className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-foto-red shadow-lg group-hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </AdaptiveBannerMedia>
    </div>
  );
}
