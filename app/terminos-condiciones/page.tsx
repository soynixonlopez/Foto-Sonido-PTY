import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Términos y condiciones | Foto Sonido",
  description: "Términos de uso del sitio y condiciones de compra.",
};

export default function TerminosCondicionesPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Términos y condiciones</h1>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p>
              Al usar el sitio web y los servicios de Foto Sonido aceptas los siguientes términos.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Condiciones de compra</h2>
            <p>
              Los precios mostrados son en colones costarricenses e incluyen IVA cuando aplica. Nos reservamos el derecho de corregir errores de precio. La compra se confirma al recibir el pago o la aprobación del crédito.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Devoluciones</h2>
            <p>
              Los productos pueden devolverse dentro del plazo indicado, en empaque original y sin uso. Consulta en tienda o al 204-3030 las condiciones específicas por categoría.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Garantías</h2>
            <p>
              Los productos cuentan con garantía de fábrica. Los términos dependen de cada fabricante. Foto Sonido ofrece además garantía extendida en artículos seleccionados.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
