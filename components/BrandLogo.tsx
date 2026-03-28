"use client";

import Image from "next/image";
import { BRAND_LOGO } from "@/lib/branding";

export type BrandLogoVariant = "header" | "footer" | "admin" | "inline";

const variantClass: Record<BrandLogoVariant, string> = {
  /** Encabezado rojo: tamaño compacto */
  header: "h-7 w-auto sm:h-8 md:h-9 max-h-9",
  /** Pie oscuro */
  footer: "h-9 w-auto sm:h-10 md:h-11 max-h-11",
  /** Login admin / tarjetas */
  admin: "h-10 w-auto sm:h-12 max-h-12 mx-auto",
  /** Texto en línea */
  inline: "h-6 w-auto sm:h-7 max-h-7",
};

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({ variant = "inline", className = "", priority = false }: BrandLogoProps) {
  return (
    <Image
      src={BRAND_LOGO.src}
      alt="Foto Sonido"
      width={BRAND_LOGO.width}
      height={BRAND_LOGO.height}
      priority={priority}
      className={`object-contain object-center ${variantClass[variant]} ${className}`.trim()}
    />
  );
}
