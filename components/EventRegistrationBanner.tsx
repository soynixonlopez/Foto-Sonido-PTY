"use client";

import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import type { EventRegistrationData } from "@/lib/types";

interface EventRegistrationBannerProps {
  data: EventRegistrationData;
}

export default function EventRegistrationBanner({ data }: EventRegistrationBannerProps) {
  return (
    <section className="w-full py-8 sm:py-12 bg-sky-50 border-y border-sky-100">
      <div className="w-full px-2">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              {data.title}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
              <span className="text-pink-600 font-serif italic">{data.subtitle}</span>
              <span className="flex justify-center lg:justify-start mt-3">
                <BrandLogo variant="inline" className="!h-8 sm:!h-9 max-w-[220px]" />
              </span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-md">{data.description}</p>
            <button
              type="button"
              className="mt-4 px-5 py-2.5 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors text-sm"
            >
              {data.cta}
            </button>
          </div>
          <div className="flex gap-3 justify-center flex-wrap max-w-lg">
            {data.images.map((src, i) => (
              <div
                key={i}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shadow-lg border-4 border-white rotate-[-3deg] hover:rotate-0 transition-transform"
                style={{ transform: `rotate(${i % 2 === 0 ? -3 : 2}deg)` }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2 max-w-xs">
            {["TV", "Laptop", "Celular", "Refrigeradora", "Lavadora", "Horno"].map((label, i) => (
              <div
                key={label}
                className="aspect-square bg-white rounded-xl border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shadow-sm"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
