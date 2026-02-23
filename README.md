# Foto Sonido – Marketplace

Marketplace de línea blanca, electrodomésticos y tecnología. Desarrollado con **Next.js 14**, **TypeScript** y **Tailwind CSS**.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura

- **`app/`** – Páginas y layout (App Router)
- **`components/`** – Header, NavBar, CategoryStrip, BannerCard, ProductCard
- **`lib/`** – Tipos y datos de ejemplo (categorías, productos, banners)

## Contenido de ejemplo

- Header rojo con logo **Foto Sonido**, búsqueda, carrito e iconos
- Navegación: FAQ, Novedades, Blog, Beneficios, Talleres
- Franja de categorías desplazable (Back 2 School, Televisores, Audio, Línea Blanca, etc.)
- Grid de banners promocionales y tarjeta de producto destacado (estilo referencia)
- Sección “Ofertas destacadas” con más productos
- Imágenes de ejemplo desde Unsplash

Puedes adaptar colores, textos e imágenes en `tailwind.config.ts`, `lib/data.ts` y los componentes.
