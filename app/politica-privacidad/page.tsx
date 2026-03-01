import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de privacidad | Foto Sonido",
  description: "Cómo tratamos tus datos personales.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de privacidad</h1>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p>
              En Foto Sonido respetamos tu privacidad. Esta política describe qué datos recopilamos, para qué los usamos y cómo los protegemos.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Datos que recopilamos</h2>
            <p>
              Podemos recopilar nombre, correo electrónico, teléfono, dirección y datos de compra cuando te registras, realizas una compra o nos contactas.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Uso de los datos</h2>
            <p>
              Utilizamos la información para procesar pedidos, enviar actualizaciones de envío, mejorar nuestro servicio y, con tu consentimiento, enviar ofertas y novedades.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Contacto</h2>
            <p>
              Para ejercer tus derechos sobre tus datos, escribe a atencion@fotosonido.com o llama al 204-3030.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
