"use client";

import AdaptiveBannerMedia from "./AdaptiveBannerMedia";

interface BackToSchoolBannerProps {
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
  /** ancho/alto opcional para estabilizar layout */
  imageAspectRatio?: number;
}

export default function BackToSchoolBanner({
  title,
  subtitle,
  image,
  cta = "Ver más",
  imageAspectRatio,
}: BackToSchoolBannerProps) {
  return (
    <section className="w-full py-6 sm:py-8">
      <div className="w-full px-2">
        <div className="w-full rounded-2xl overflow-hidden shadow-xl flex flex-col sm:flex-row bg-foto-red items-stretch">
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center text-white min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">{subtitle}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight">{title}</h2>
            <button
              type="button"
              className="mt-6 w-fit px-6 py-3 bg-white text-foto-red font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              {cta}
            </button>
          </div>
          <div className="w-full sm:w-1/2 min-w-0 sm:max-w-[55%] bg-gray-900/20">
            <AdaptiveBannerMedia
              src={image}
              alt={title}
              initialAspectRatio={imageAspectRatio}
              fallbackAspectRatio={2.2}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
