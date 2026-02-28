export interface Category {
  id: string;
  name: string;
  iconKey: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  previousPrice?: number;
  image: string;
  images?: string[];
  badge?: "TOP SALE" | "NUEVO" | "OFERTA";
  category: string;
  brand: string;
  family: string;
  specs?: string[];
  /** Motivos para mostrar en la home: promociones, ultimos_modelos, destacados, nuevos */
  sections?: string[];
}

export interface BannerBrand {
  label: string;
  /** Clase Tailwind para fondo del badge (ej. "bg-green-600", "bg-foto-red") */
  bgClass?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
  cta?: string;
  variant?: "vertical" | "horizontal" | "square";
  tag?: string;
  bgClass?: string;
  brands?: BannerBrand[];
}

export interface PromoCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
}

export interface BigBannerItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  brand?: string;
  bgClass?: string;
}

export interface EventRegistrationData {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  images: string[];
}
