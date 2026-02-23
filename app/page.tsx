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

export default function Home() {
  const [bannerVertical, bannerSonido, bannerTv, bannerLaptop, bannerClases, bannerDesayuno, bannerHorizontal] =
    banners;
  const [productDestacado] = featuredProducts;

  return (
    <>
      <Header />
      <CategoryStrip />

      <main className="w-full py-4 sm:py-6">
        {/* Móvil: columna única */}
        <div className="grid grid-cols-1 gap-3 lg:hidden">
          <div className="aspect-[2/3] min-h-[320px]">
            <BannerCard banner={bannerVertical} className="h-full min-h-0" />
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
          <div className="min-h-[200px]">
            <BannerCard banner={bannerHorizontal} className="h-full min-h-[200px]" />
          </div>
        </div>

        {/* Desktop: grid igual a referencia — vertical 2 filas | 4 cards + producto | 2 cards + horizontal */}
        <div
          className="hidden lg:grid gap-2 sm:gap-3 w-full"
          style={{
            gridTemplateColumns: "minmax(160px, 1.15fr) repeat(4, minmax(0, 1fr))",
            gridTemplateRows: "minmax(220px, 1fr) minmax(220px, 1fr)",
          }}
        >
          <div className="row-span-2 min-h-[440px]">
            <BannerCard banner={bannerVertical} className="h-full min-h-0" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerTv} className="h-full w-full" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerLaptop} className="h-full w-full" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerDesayuno} className="h-full w-full" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <ProductCard product={productDestacado} compact />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerSonido} className="h-full w-full" />
          </div>
          <div className="min-h-0 aspect-square max-h-full">
            <BannerCard banner={bannerClases} className="h-full w-full" />
          </div>
          <div className="min-h-0 col-span-2" style={{ minHeight: "220px" }}>
            <BannerCard banner={bannerHorizontal} className="h-full w-full min-h-[200px]" />
          </div>
        </div>

        {/* Marcas debajo del grid */}
        <BrandStrip />

        {/* Carrusel + 3 banners (debajo de marcas) */}
        <section className="w-full bg-gray-50/50 mt-6" aria-label="Promociones y eventos">
          <PromoCarousel items={promoCarouselItems} />
          <BigBannersRow banners={bigBanners} />
        </section>

        {/* Sección más productos */}
        <section className="mt-10 sm:mt-14 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">Ofertas destacadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 px-0">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

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
