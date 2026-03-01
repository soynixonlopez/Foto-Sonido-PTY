import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Garantías | Foto Sonido",
  description: "Información sobre garantía de fábrica y garantía extendida.",
};

export default function GarantiasPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Garantías</h1>
          <p className="text-gray-600 mb-8">
            En Foto Sonido todos los productos tienen garantía. Conoce los detalles.
          </p>
          <div className="space-y-6">
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Garantía de fábrica</h2>
              <p className="text-gray-600 mt-2 text-sm">
                Cada producto incluye la garantía del fabricante (1 o 2 años según el artículo). Cubre defectos de fabricación en condiciones de uso normal. Conserva tu factura y el empaque para cualquier reclamo.
              </p>
            </section>
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Garantía extendida</h2>
              <p className="text-gray-600 mt-2 text-sm">
                En artículos seleccionados ofrecemos garantía extendida a un costo adicional. Amplía el periodo de cobertura y en muchos casos incluye daños accidentales. Pregunta en tienda o al 204-3030.
              </p>
            </section>
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Talleres autorizados</h2>
              <p className="text-gray-600 mt-2 text-sm">
                Para hacer válida la garantía, las reparaciones deben realizarse en talleres autorizados. Consulta nuestra sección de talleres para ubicaciones y contacto.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
