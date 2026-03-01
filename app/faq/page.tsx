import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Preguntas frecuentes | Foto Sonido",
  description: "Respuestas a las dudas más comunes sobre compras, envíos y garantías.",
};

const faqs = [
  {
    q: "¿Cómo puedo pagar mi compra?",
    a: "Aceptamos efectivo, tarjetas de crédito y débito, y financiamiento con Fotocredit, BAC, KrediYA y epik. En tienda también puedes pagar con transferencia.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí. Ofrecemos acarreo y entrega a domicilio en la GAM y zonas aledañas. Para otras zonas contáctanos al 204-3030 para cotizar.",
  },
  {
    q: "¿Qué garantía tienen los productos?",
    a: "Todos los productos cuentan con garantía de fábrica. El tiempo varía según el fabricante. Además ofrecemos garantía extendida en varios artículos.",
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Sí, según nuestra política de devoluciones. Productos sin usar y en empaque original pueden devolverse en un plazo definido. Revisa términos y condiciones.",
  },
  {
    q: "¿Cómo rastreo mi pedido?",
    a: "Una vez despachado recibirás un número de seguimiento. También puedes ingresar a Mi cuenta y en «Rastrear pedido» consultar el estado.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Preguntas frecuentes</h1>
          <p className="text-gray-600 mb-8">
            Resolvemos las dudas más comunes sobre compras, envíos, garantías y más.
          </p>
          <ul className="space-y-4">
            {faqs.map((faq, i) => (
              <li key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">{faq.q}</h2>
                <p className="text-gray-600 mt-2 text-sm">{faq.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
