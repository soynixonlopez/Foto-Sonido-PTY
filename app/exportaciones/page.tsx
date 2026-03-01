import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Exportaciones | Foto Sonido",
  description: "Información para compras y envíos al exterior.",
};

export default function ExportacionesPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exportaciones</h1>
          <p className="text-gray-600 mb-8">
            ¿Necesitas enviar productos fuera de Costa Rica? En Foto Sonido te apoyamos con cotizaciones y logística de exportación.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <p className="text-gray-600 text-sm">
              Para solicitudes de exportación (envío a otros países), contáctanos con los detalles del producto o productos de interés, cantidad y destino. Te enviaremos una cotización que incluirá producto, flete y documentación según corresponda.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Contacto:</strong> atencion@fotosonido.com | 204-3030. Asunto: «Exportación».
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
