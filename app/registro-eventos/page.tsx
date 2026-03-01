import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Registro de bodas y eventos | Foto Sonido",
  description: "Regala tecnología en bodas y eventos. Crea tu lista y comparte el link.",
};

export default function RegistroEventosPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de bodas y eventos</h1>
          <p className="text-gray-600 mb-8">
            ¿Tu boda, baby shower o evento especial? Crea tu lista de regalos con Foto Sonido y comparte el link con tus invitados. Ellos eligen qué regalarte y nosotros nos encargamos del resto.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">¿Cómo funciona?</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm">
              <li>Regístrate y crea tu evento (boda, baby shower, etc.).</li>
              <li>Selecciona los productos que te gustaría recibir.</li>
              <li>Recibe un link para compartir con tus invitados.</li>
              <li>Los invitados eligen y pagan su regalo. Tú recibes todo coordinado con nosotros.</li>
            </ol>
            <p className="text-gray-600 text-sm">
              Para más información y activar tu registro, contáctanos al 204-3030 o por correo a atencion@fotosonido.com.
            </p>
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark transition-colors"
            >
              Crear cuenta para registrar evento
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
