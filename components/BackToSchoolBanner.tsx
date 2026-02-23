"use client";

import Image from "next/image";

interface BackToSchoolBannerProps {
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
}

export default function BackToSchoolBanner({
  title,
  subtitle,
  image,
  cta = "Ver más",
}: BackToSchoolBannerProps) {
  return (
    <section className="w-full py-6 sm:py-8">
      <div className="w-full px-2">
        <div className="w-full rounded-2xl overflow-hidden shadow-xl flex flex-col sm:flex-row bg-foto-red">
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {subtitle}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight">
              {title}
            </h2>
            <button
              type="button"
              className="mt-6 w-fit px-6 py-3 bg-white text-foto-red font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              {cta}
            </button>
          </div>
          <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto sm:min-h-[280px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-right"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
