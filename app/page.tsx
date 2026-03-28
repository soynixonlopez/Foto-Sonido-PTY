import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import BannerCard from "@/components/BannerCard";
import ProductCard from "@/components/ProductCard";
import BrandStrip from "@/components/BrandStrip";
import PromoCarousel from "@/components/PromoCarousel";
import BigBannersRow from "@/components/BigBannersRow";
import EventRegistrationBanner from "@/components/EventRegistrationBanner";
import BackToSchoolBanner from "@/components/BackToSchoolBanner";
import Footer from "@/components/Footer";
import {
  banners,
  featuredProducts,
  promoCarouselItems,
  bigBanners,
  eventRegistrationData,
  backToSchoolBannerData,
} from "@/lib/data";
import { getProductsForHomeSections } from "@/lib/supabase/public";
import type { Product } from "@/lib/types";

export default async function Home() {
  const [bannerVertical, bannerSonido, bannerTv, bannerLaptop, bannerClases, bannerDesayuno, bannerHorizontal] =
    banners;
  const [productDestacado] = featuredProducts;
  const sectionProducts = await getProductsForHomeSections();

  return (
    <>
      <Header />
      <CategoryStrip />

      <main className="w-full py-4 sm:py-6">
        {/* Móvil: misma estructura de antes; las imágenes usan object-contain dentro de cada celda */}
        <div className="grid grid-cols-1 gap-3 lg:hidden">
          <div className="aspect-[2/3] min-h-[280px]">
            <BannerCard banner={bannerVertical} className="h-full min-h-0" priority />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <BannerCard banner={bannerTv} />
            <BannerCard banner={bannerLaptop} />
            <BannerCard banner={bannerDesayuno} />
            <ProductCard product={productDestacado} compact />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <BannerCard banner={bannerSonido} />
            <BannerCard banner={bannerClases} />
          </div>
          <div className="min-h-[180px]">
            <BannerCard banner={bannerHorizontal} className="h-full min-h-[180px]" />
          </div>
        </div>

        {/* Desktop: grid fijo como antes (2 + columna central + 2, dos filas) */}
        <div
          className="hidden lg:grid gap-2 sm:gap-3 w-full"
          style={{
            gridTemplateColumns: "repeat(2, minmax(0, 1fr)) minmax(160px, 1.15fr) repeat(2, minmax(0, 1fr))",
            gridTemplateRows: "minmax(220px, 1fr) minmax(220px, 1fr)",
          }}
        >
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerDesayuno} className="h-full w-full" priority />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <ProductCard product={productDestacado} compact />
          </div>
          <div className="row-span-2 min-h-[440px]" style={{ gridColumn: 3 }}>
            <BannerCard banner={bannerVertical} className="h-full min-h-0" priority />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerTv} className="h-full w-full" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerLaptop} className="h-full w-full" />
          </div>
          <div className="min-h-0 col-span-2 row-span-1" style={{ minHeight: "220px", gridColumn: "1 / 3" }}>
            <BannerCard banner={bannerHorizontal} className="h-full w-full min-h-[200px]" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerSonido} className="h-full w-full" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerClases} className="h-full w-full" />
          </div>
        </div>

        {/* Marcas debajo del grid */}
        <BrandStrip />

        {/* Carrusel + 3 banners (debajo de marcas) */}
        <section className="w-full bg-gray-50/50 mt-6" aria-label="Promociones y eventos">
          <PromoCarousel items={promoCarouselItems} />
          <BigBannersRow banners={bigBanners} />
        </section>

        {/* Secciones dinámicas desde el panel (Promociones, Últimos modelos, Destacados, Nuevos) */}
        {sectionProducts && (
          <>
            {sectionProducts.promociones.length > 0 && (
              <ProductSection title="Promociones" products={sectionProducts.promociones} />
            )}
            {sectionProducts.ultimos_modelos.length > 0 && (
              <ProductSection title="Últimos modelos" products={sectionProducts.ultimos_modelos} />
            )}
            {sectionProducts.destacados.length > 0 && (
              <ProductSection title="Ofertas destacadas" products={sectionProducts.destacados} />
            )}
            {sectionProducts.nuevos.length > 0 && (
              <ProductSection title="Nuevos" products={sectionProducts.nuevos} />
            )}
          </>
        )}

        {/* Ofertas destacadas: estático solo cuando no hay secciones desde el panel */}
        {(!sectionProducts || sectionProducts.destacados.length === 0) && (
          <section className="mt-10 sm:mt-14 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">Ofertas destacadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 px-0">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Registro de eventos */}
        <EventRegistrationBanner data={eventRegistrationData} />

        {/* Banner regreso a clases */}
        <BackToSchoolBanner
          title={backToSchoolBannerData.title}
          subtitle={backToSchoolBannerData.subtitle}
          image={backToSchoolBannerData.image}
          cta={backToSchoolBannerData.cta}
        />
      </main>

      <Footer />
    </>
  );
}

function ProductSection({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="mt-10 sm:mt-14 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 px-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </section>
  );
}
