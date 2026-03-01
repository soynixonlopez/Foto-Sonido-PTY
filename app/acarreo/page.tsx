import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Acarreo | Foto Sonido",
  description: "Servicio de acarreo y entrega a domicilio. Llevamos tu compra hasta tu casa.",
};

export default function AcarreoPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-foto-red text-white p-8 text-center">
              <span className="inline-flex w-16 h-16 rounded-2xl bg-white/20 items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold">Servicio de acarreo</h1>
              <p className="mt-2 text-white/90">
                Llevamos tu compra hasta tu hogar de forma segura y puntual.
              </p>
            </div>
            <div className="p-8 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-900">¿Qué incluye?</h2>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-foto-red/10 text-foto-red flex items-center justify-center text-xs font-bold">✓</span>
                    Entrega a domicilio en la GAM y zonas aledañas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-foto-red/10 text-foto-red flex items-center justify-center text-xs font-bold">✓</span>
                    Descarga y ubicación del producto donde lo necesites
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-foto-red/10 text-foto-red flex items-center justify-center text-xs font-bold">✓</span>
                    Horarios coordinados según tu disponibilidad
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-foto-red/10 text-foto-red flex items-center justify-center text-xs font-bold">✓</span>
                    Cobertura para electrodomésticos y línea blanca
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-gray-900">Costo y cobertura</h2>
                <p className="text-gray-600 mt-1">
                  El costo del acarreo depende de la zona y del tamaño del producto. Al agregar al carrito podrás ver el monto según tu dirección. Contáctanos al 204-3030 para cotizaciones fuera de la GAM.
                </p>
              </section>
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark transition-colors"
              >
                Ver productos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
