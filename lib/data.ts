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

export const banners: Banner[] = [
  {
    id: "b1",
    title: "FOTO SONIDO TE LLAMA.",
    subtitle: "PARA ESTE REGRESO A CLASES",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop",
    variant: "vertical",
    bgClass: "bg-foto-red",
  },
  {
    id: "b2",
    title: "SONIDO PARA ESTUDIAR",
    subtitle: "Clases, música y entretenimiento",
    tag: "Clases, música y entretenimiento",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
    variant: "square",
  },
  {
    id: "b3",
    title: "VÍVELO EN GRANDE",
    subtitle: "TV's para cada espacio",
    tag: "TV's para cada espacio",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
    variant: "square",
  },
  {
    id: "b4",
    title: "IMPULSA TU FUTURO",
    subtitle: "Rendimiento para aprender",
    tag: "Rendimiento para aprender",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    variant: "square",
  },
  {
    id: "b5",
    title: "LISTOS PARA CLASES",
    subtitle: "Organiza tu día escolar",
    tag: "Organiza tu día escolar",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    variant: "square",
  },
  {
    id: "b6",
    title: "ENERGÍA PARA APRENDER",
    subtitle: "Desayunos rápidos y prácticos",
    tag: "Desayunos rápidos y prácticos",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=500&fit=crop",
    variant: "square",
  },
  {
    id: "b7",
    title: "Futboleros de corazón",
    subtitle: "Lo mejor en TV, refrigeración y clima",
    image: "https://images.unsplash.com/photo-1631545914468-f8f24d2c2e7c?w=800&h=400&fit=crop",
    variant: "horizontal",
    cta: "CONOCE MÁS",
    bgClass: "bg-teal-500",
    brands: [
      { label: "GARANTÍA POR VIDA", bgClass: "bg-green-600" },
      { label: "Panasonic QUALITY", bgClass: "bg-foto-red" },
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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop",
  },
  {
    id: "pc2",
    title: "Este regreso a clases, que el calor no sea un problema.",
    subtitle: "Aires acondicionados para tu hogar",
    image: "https://images.unsplash.com/photo-1631545914468-f8f24d2c2e7c?w=500&h=400&fit=crop",
  },
  {
    id: "pc3",
    title: "Renueva tu escritorio",
    subtitle: "Muestra tu estilo en este regreso a clases con LOGITECH",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    cta: "COMPRA AQUÍ",
  },
  {
    id: "pc4",
    title: "TU PRÓXIMO EQUIPO, A CRÉDITO CON",
    subtitle: "¡Aprovecha nuestras opciones de financiamiento!",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=400&fit=crop",
  },
  {
    id: "pc5",
    title: "Back to School sin manchas.",
    subtitle: "Línea blanca para toda la familia",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&h=400&fit=crop",
  },
];

export const bigBanners: BigBannerItem[] = [
  {
    id: "bb1",
    title: "Galaxy Unpacked",
    subtitle: "Febrero 25, 2026 | En vivo en fotosonido.com/samsung",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=350&fit=crop",
    brand: "SAMSUNG",
    bgClass: "bg-gradient-to-br from-violet-600 to-violet-900",
  },
  {
    id: "bb2",
    title: "El juego Evoluciona",
    subtitle: "Vive el deporte en grande",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=350&fit=crop",
    bgClass: "bg-gray-900",
  },
  {
    id: "bb3",
    title: "TV y Audio",
    subtitle: "Experiencia inmersiva",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=350&fit=crop",
    brand: "SAMSUNG",
    bgClass: "bg-gray-900",
  },
];

export const eventRegistrationData: EventRegistrationData = {
  title: "TUS REGALOS PARA ESE DÍA ESPECIAL CON",
  subtitle: "Registro de eventos",
  description: "Es fácil: solo regístrate y comparte el link.",
  cta: "Click para +info",
  images: [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1523050852018-4360e3b461c0?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop",
  ],
};

export const backToSchoolBannerData = {
  title: "FOTO SONIDO TE LLAMA.",
  subtitle: "PARA ESTE REGRESO A CLASES",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
  cta: "Ver más",
};
