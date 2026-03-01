import type { Category, Product, Banner, PromoCarouselItem, BigBannerItem, EventRegistrationData } from "./types";

export const categories: Category[] = [
  { id: "1", name: "Back 2 School", iconKey: "alarm", slug: "back-2-school" },
  { id: "2", name: "Televisores", iconKey: "tv", slug: "televisores" },
  { id: "3", name: "Audio", iconKey: "headphones", slug: "audio" },
  { id: "4", name: "Línea Blanca", iconKey: "washing", slug: "linea-blanca" },
  { id: "5", name: "Electrodomésticos", iconKey: "iron", slug: "electrodomesticos" },
  { id: "6", name: "Celulares y Tablets", iconKey: "phone", slug: "celulares-tablets" },
  { id: "7", name: "Cómputo", iconKey: "laptop", slug: "computo" },
  { id: "8", name: "Smartwatches", iconKey: "watch", slug: "smartwatches" },
  { id: "9", name: "Hogar", iconKey: "home", slug: "hogar" },
  { id: "10", name: "Video Juegos", iconKey: "gamepad", slug: "video-juegos" },
  { id: "11", name: "Cámaras y Lentes", iconKey: "camera", slug: "camaras-lentes" },
  { id: "12", name: "Salud y Belleza", iconKey: "beauty", slug: "salud-belleza" },
];

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Impresora Multifuncional HP Smart Tank 750 Tinta Color Wi-Fi | Blanco",
    price: 284.95,
    previousPrice: 349.95,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop",
    badge: "TOP SALE",
    category: "Cómputo",
    brand: "HP",
    family: "Impresoras",
  },
  {
    id: "2",
    name: "Lavadora Samsung Carga Superior 18 kg",
    price: 449.99,
    previousPrice: 529.99,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    badge: "OFERTA",
    category: "Línea Blanca",
    brand: "Samsung",
    family: "Lavadoras",
  },
  {
    id: "3",
    name: "Smart TV LG 55\" 4K UHD",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    badge: "NUEVO",
    category: "Televisores",
    brand: "LG",
    family: "Televisores",
  },
];

// Rutas de imágenes locales en public/images/banners (espacios → %20 en URL)
const BANNERS_BASE = "/images/banners";
const img = (name: string) => `${BANNERS_BASE}/${encodeURIComponent(name)}`;

export const banners: Banner[] = [
  {
    id: "b1",
    title: "FOTO SONIDO TE LLAMA.",
    subtitle: "PARA ESTE REGRESO A CLASES",
    image: img("Perfil.jpg"),
    variant: "vertical",
    bgClass: "bg-foto-red",
  },
  {
    id: "b2",
    title: "SONIDO Y ENTERTENIMIENTO",
    subtitle: "Clases, música y más",
    tag: "Pluxee",
    image: img("Pluxee.jpg"),
    variant: "square",
  },
  {
    id: "b3",
    title: "MEGA COMBOS SANKEY",
    subtitle: "TV's y más para tu hogar",
    tag: "Combos",
    image: img("Mega Combos Sankey.jpg"),
    variant: "square",
  },
  {
    id: "b4",
    title: "EQUIPA TU HOGAR",
    subtitle: "Tecnología y línea blanca",
    tag: "Hogar",
    image: img("equipa tu hogar.jpg"),
    variant: "square",
  },
  {
    id: "b5",
    title: "DESCUENTOS",
    subtitle: "Aprovecha las ofertas",
    tag: "Ofertas",
    image: img("Descuentos_.jpg"),
    variant: "square",
  },
  {
    id: "b6",
    title: "LLEVA MÁS PAGA MENOS",
    subtitle: "Promociones especiales",
    tag: "Promo",
    image: img("lleva mas paga menos.jpg"),
    variant: "square",
  },
  {
    id: "b7",
    title: "LLÉVALO A CRÉDITO",
    subtitle: "Fotocredit y opciones de financiamiento",
    image: img("Llevalo a credito.jpg"),
    variant: "horizontal",
    cta: "CONOCE MÁS",
    bgClass: "bg-teal-600",
    brands: [
      { label: "FOTOCREDIT", bgClass: "bg-foto-red" },
      { label: "Financiamiento", bgClass: "bg-green-600" },
    ],
  },
];

export const brandMarks = [
  { id: "1", name: "Samsung" },
  { id: "2", name: "HP" },
  { id: "3", name: "Panasonic" },
  { id: "4", name: "LG" },
  { id: "5", name: "Hisense" },
  { id: "6", name: "Logitech" },
  { id: "7", name: "TCL" },
  { id: "8", name: "Apple" },
  { id: "9", name: "Huawei" },
  { id: "10", name: "DRIJA" },
];

export const promoCarouselItems: PromoCarouselItem[] = [
  {
    id: "pc1",
    title: "Prepárate para este Verano",
    subtitle: "Con la mejor tecnología para cada momento",
    image: img("bannerverano.jpg"),
  },
  {
    id: "pc2",
    title: "Equipa tu hogar",
    subtitle: "Línea blanca y electrodomésticos",
    image: img("equipa tu hogar.jpg"),
  },
  {
    id: "pc3",
    title: "Descuentos especiales",
    subtitle: "Aprovecha las mejores ofertas",
    image: img("Descuentos_.jpg"),
    cta: "COMPRA AQUÍ",
  },
  {
    id: "pc4",
    title: "Llévelo a crédito con Fotocredit",
    subtitle: "¡Aprovecha nuestras opciones de financiamiento!",
    image: img("Fotocreditactivo.jpg"),
  },
  {
    id: "pc5",
    title: "Lleva más, paga menos",
    subtitle: "Promociones y combos para toda la familia",
    image: img("lleva mas paga menos.jpg"),
  },
];

export const bigBanners: BigBannerItem[] = [
  {
    id: "bb1",
    title: "Fotocredit activo",
    subtitle: "Financia tu próxima compra con facilidad",
    image: img("Fotocreditactivo.jpg"),
    brand: "FOTOCREDIT",
    bgClass: "bg-gradient-to-br from-foto-red to-red-900",
  },
  {
    id: "bb2",
    title: "Fotocredit collage",
    subtitle: "Opciones de crédito para ti",
    image: img("Fotocredit colage.jpg"),
    bgClass: "bg-gray-900",
  },
  {
    id: "bb3",
    title: "Mega Combos Sankey",
    subtitle: "TV y más para tu hogar",
    image: img("Mega Combos Sankey.jpg"),
    brand: "SANKEY",
    bgClass: "bg-gray-900",
  },
];

export const eventRegistrationData: EventRegistrationData = {
  title: "TUS REGALOS PARA ESE DÍA ESPECIAL CON",
  subtitle: "Registro de eventos",
  description: "Es fácil: solo regístrate y comparte el link.",
  cta: "Click para +info",
  images: [
    img("Perfil.jpg"),
    img("Pluxee.jpg"),
    img("Descuentos_.jpg"),
    img("Fotocredit colage.jpg"),
  ],
};

export const backToSchoolBannerData = {
  title: "FOTO SONIDO TE LLAMA.",
  subtitle: "PARA ESTE REGRESO A CLASES",
  image: img("bannerverano.jpg"),
  cta: "Ver más",
};
