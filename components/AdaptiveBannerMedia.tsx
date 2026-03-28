"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

export interface AdaptiveBannerMediaProps {
  src: string;
  alt: string;
  /** Proporción ancho/alto inicial (solo modo intrínseco) */
  initialAspectRatio?: number;
  fallbackAspectRatio?: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
  /**
   * true = ocupa todo el padre (h-full); imagen con object-contain (sin recorte).
   * Ideal para grillas con celdas fijas.
   * false = el contenedor toma la proporción real de la imagen.
   */
  fillParent?: boolean;
}

export default function AdaptiveBannerMedia({
  src,
  alt,
  initialAspectRatio,
  fallbackAspectRatio = 16 / 9,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  children,
  fillParent = false,
}: AdaptiveBannerMediaProps) {
  const [aspectRatio, setAspectRatio] = useState<number>(
    initialAspectRatio ?? fallbackAspectRatio
  );

  const onLoadingComplete = useCallback((img: HTMLImageElement) => {
    if (fillParent) return;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    }
  }, [fillParent]);

  if (fillParent) {
    return (
      <div className={`relative w-full h-full min-h-0 overflow-hidden bg-gray-100 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-contain object-center ${imgClassName}`}
          sizes={sizes}
        />
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-contain object-center ${imgClassName}`}
        sizes={sizes}
        onLoadingComplete={onLoadingComplete}
      />
      {children}
    </div>
  );
}
