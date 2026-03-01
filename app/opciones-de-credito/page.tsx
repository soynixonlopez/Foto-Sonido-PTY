import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Opciones de Crédito | Foto Sonido",
  description: "Fotocredit, BAC, KrediYA, epik y más opciones de financiamiento.",
};

const opciones = [
  {
    id: "fotocredit",
    name: "Fotocredit",
    description: "Crédito exclusivo Foto Sonido. Cuotas fijas, aprobación rápida y promociones especiales.",
    cta: "Más información",
  },
  {
    id: "bac",
    name: "BAC",
    description: "Financia tu compra con tarjeta BAC. Meses sin intereses y planes a tu medida.",
    cta: "Ver promociones",
  },
  {
    id: "krediya",
    name: "KrediYA",
    description: "Crédito de consumo con tasas competitivas. Aprobación en minutos.",
    cta: "Solicitar",
  },
  {
    id: "epik",
    name: "epik",
    description: "Paga en cuotas con epik. Sin complicaciones y con beneficios exclusivos.",
    cta: "Conocer más",
  },
];

export default function OpcionesCreditoPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Opciones de crédito</h1>
          <p className="text-gray-600 mb-8">
            En Foto Sonido puedes financiar tu compra con las mejores opciones del mercado. Elige la que más te convenga.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {opciones.map((op) => (
              <article
                key={op.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <h2 className="text-xl font-semibold text-gray-900">{op.name}</h2>
                <p className="text-gray-600 mt-2 flex-1">{op.description}</p>
                <Link
                  href="/productos"
                  className="mt-4 inline-flex items-center gap-2 text-foto-red font-semibold text-sm hover:underline"
                >
                  {op.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
