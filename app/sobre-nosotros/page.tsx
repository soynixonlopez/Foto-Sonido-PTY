import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sobre nosotros | Foto Sonido",
  description: "Conoce la historia y valores de Foto Sonido.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sobre nosotros</h1>
          <p className="text-gray-600 mb-6">
            Foto Sonido es tu tienda de confianza en tecnología, línea blanca y electrodomésticos. Llevamos años ofreciendo las mejores marcas con opciones de crédito, garantía y servicio de acarreo para que tu compra sea fácil y segura.
          </p>
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Nuestra misión</h2>
            <p className="text-gray-600">
              Acercar la tecnología y el confort del hogar a las familias costarricenses con precios justos, financiamiento accesible y atención de calidad.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">Contacto</h2>
            <p className="text-gray-600">
              Teléfono: 204-3030 | Correo: atencion@fotosonido.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
