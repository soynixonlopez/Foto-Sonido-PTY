import Image from "next/image";
import type { Banner } from "@/lib/types";

interface BannerCardProps {
  banner: Banner;
  className?: string;
}

export default function BannerCard({ banner, className = "" }: BannerCardProps) {
  const isVertical = banner.variant === "vertical";
  const isHorizontal = banner.variant === "horizontal";
  const isSquare = banner.variant === "square" || (!isVertical && !isHorizontal);
  const tag = banner.tag ?? banner.subtitle;

  if (isVertical) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-lg min-h-0 flex flex-col ${banner.bgClass ?? "bg-foto-red"} ${className}`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover object-left"
            sizes="(max-width: 768px) 100vw, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foto-red/30 to-foto-red/90" />
        </div>
        <div className="relative z-10 flex flex-col flex-1 justify-end p-5 sm:p-6 text-white">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/95">
            {banner.subtitle}
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase mt-1 leading-tight max-w-[12ch]">
            {banner.title}
          </h2>
        </div>
      </div>
    );
  }

  if (isHorizontal) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-lg ${banner.bgClass ?? "bg-teal-500"} ${className}`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-between min-h-[200px] p-5 sm:p-6 text-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">{banner.title}</h2>
            <p className="text-sm text-white/90 mt-1">{banner.subtitle}</p>
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
            {banner.cta && (
              <button
                type="button"
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm shrink-0"
              >
                {banner.cta}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Square: imagen cubre todo el cuadrante, textos superpuestos
  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow aspect-square min-h-0 group ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      </div>
      {tag && (
        <span className="absolute top-3 left-3 z-10 bg-foto-red text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
          {tag}
        </span>
      )}
      <div className="absolute bottom-3 left-3 right-14 z-10 text-white">
        <h3 className="text-lg sm:text-xl font-bold uppercase leading-tight drop-shadow-md">
          {banner.title}
        </h3>
      </div>
      <div className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-foto-red shadow-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
}
