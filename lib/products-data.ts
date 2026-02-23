import type { Product } from "./types";

export const FILTER_BRANDS = [
  "Apple", "Belkin", "Black and Decker", "Canon", "Cubitt", "Cuisinart", "DRIJA", "Ezviz",
  "HP", "Hisense", "LG", "Logitech", "Panasonic", "Samsung", "Whirlpool",
];

export const FILTER_FAMILIES = [
  "Accesorios", "Electrodomésticos", "Impresoras", "Lavadoras", "Línea blanca",
  "Microondas", "Televisores", "Cómputo", "Extractores", "Estufas",
];

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Impresora Multifuncional HP Smart Tank 750 Tinta Color Wi-Fi | Blanco",
    description: "Impresora multifunción con tanques de tinta de alta capacidad. Wi-Fi, impresión a doble cara, escáner y copiadora. Ideal para hogar y oficina.",
    price: 284.95,
    previousPrice: 349.95,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=800&fit=crop",
    ],
    badge: "TOP SALE",
    category: "Cómputo",
    brand: "HP",
    family: "Impresoras",
    specs: ["Wi-Fi", "Tanque de tinta", "Escáner", "Copiadora"],
  },
  {
    id: "2",
    name: "Lavadora Samsung Carga Superior 18 kg",
    description: "Lavadora de carga superior con capacidad de 18 kg. Múltiples programas, ahorro de agua y energía. Panel digital.",
    price: 449.99,
    previousPrice: 529.99,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=800&fit=crop"],
    badge: "OFERTA",
    category: "Línea Blanca",
    brand: "Samsung",
    family: "Lavadoras",
    specs: ["18 kg", "Carga superior", "Digital"],
  },
  {
    id: "3",
    name: "Smart TV LG 55\" 4K UHD",
    description: "Televisor 55 pulgadas 4K UHD con webOS. Smart TV, HDMI, USB, Bluetooth. Imagen y sonido inmersivos.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop"],
    badge: "NUEVO",
    category: "Televisores",
    brand: "LG",
    family: "Televisores",
    specs: ["55\"", "4K UHD", "webOS", "Smart TV"],
  },
  {
    id: "4",
    name: "Microondas Whirlpool | 20 Lts | 5 Niveles De Potencia | Pantalla Digital Led | Blanco",
    description: "Horno microondas 20 litros con 5 niveles de potencia. Pantalla digital LED, plato giratorio y diseño blanco.",
    price: 49.99,
    previousPrice: 59.95,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    brand: "Whirlpool",
    family: "Microondas",
    category: "Electrodomésticos",
  },
  {
    id: "5",
    name: "Microondas Samsung 23 L | Interior cerámico | Descongelado rápido | Modo eco",
    description: "Microondas Samsung 23 litros con interior cerámico fácil de limpiar. Descongelado rápido y modo ecológico.",
    price: 79.95,
    previousPrice: 109.95,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    brand: "Samsung",
    family: "Microondas",
    category: "Electrodomésticos",
  },
  {
    id: "6",
    name: "Extractor de grasa DRIJA Compatto 76 | 2 focos LED | 3 velocidades | 3 filtros de carbón",
    description: "Extractor de cocina negro. 2 focos LED, 3 velocidades con botón, 3 filtros de carbón incluidos.",
    price: 99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    brand: "DRIJA",
    family: "Extractores",
    category: "Electrodomésticos",
  },
  {
    id: "7",
    name: "Estufa empotrable Hisense 30\" | 5 quemadores | Parrilla de hierro | Garantía 2 años",
    description: "Estufa de empotrar Hisense 30 pulgadas. 5 quemadores, parrilla de hierro fundido. Garantía de 2 años.",
    price: 149.95,
    previousPrice: 219.95,
    image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=400&fit=crop",
    brand: "Hisense",
    family: "Estufas",
    category: "Electrodomésticos",
  },
  {
    id: "8",
    name: "Laptop HP 15.6\" | 8GB RAM | 256GB SSD",
    price: 399.99,
    previousPrice: 479.99,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
    brand: "HP",
    family: "Cómputo",
    category: "Cómputo",
  },
  {
    id: "9",
    name: "Refrigeradora Samsung French Door 28 pies",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b1bc4?w=400&h=400&fit=crop",
    brand: "Samsung",
    family: "Línea blanca",
    category: "Línea Blanca",
  },
  {
    id: "10",
    name: "Auriculares Logitech G Pro X",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    brand: "Logitech",
    family: "Accesorios",
    category: "Audio",
  },
  {
    id: "11",
    name: "Tablet Samsung Galaxy Tab A8",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    brand: "Samsung",
    family: "Cómputo",
    category: "Celulares y Tablets",
  },
  {
    id: "12",
    name: "TV Panasonic 43\" Full HD Smart",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    brand: "Panasonic",
    family: "Televisores",
    category: "Televisores",
  },
];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function filterProducts(opts: {
  minPrice: number;
  maxPrice: number;
  brands: string[];
  families: string[];
  sort: "relevance" | "price-asc" | "price-desc";
}): Product[] {
  let list = allProducts.filter(
    (p) => p.price >= opts.minPrice && p.price <= opts.maxPrice
  );
  if (opts.brands.length > 0) {
    list = list.filter((p) => opts.brands.includes(p.brand));
  }
  if (opts.families.length > 0) {
    list = list.filter((p) => opts.families.includes(p.family));
  }
  if (opts.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (opts.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  return list;
}
