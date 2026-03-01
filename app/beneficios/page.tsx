import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Beneficios | Foto Sonido",
  description: "Ventajas de comprar en Foto Sonido: garantía, crédito, envío y más.",
};

const beneficios = [
  {
    title: "Garantía oficial",
    description: "Todos nuestros productos tienen garantía de fábrica. Además ofrecemos garantía extendida en artículos seleccionados.",
    icon: "shield",
  },
  {
    title: "Opciones de crédito",
    description: "Fotocredit, BAC, KrediYA y epik. Elige la opción que se adapte a ti con cuotas y promociones.",
    icon: "credit",
  },
  {
    title: "Acarreo y entrega",
    description: "Llevamos tu compra hasta tu casa de forma segura. Servicio disponible en la GAM y más zonas.",
    icon: "truck",
  },
  {
    title: "Atención al cliente",
    description: "Soporte antes y después de tu compra. Teléfono 204-3030 y redes sociales.",
    icon: "support",
  },
];

const iconSvg = (icon: string) => {
  switch (icon) {
    case "shield":
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      );
    case "credit":
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      );
    case "truck":
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      );
    default:
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      );
  }
};

export default function BeneficiosPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Beneficios</h1>
          <p className="text-gray-600 mb-8">
            Comprar en Foto Sonido tiene ventajas: garantía, financiamiento, envío y atención de calidad.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {beneficios.map((b, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="inline-flex w-12 h-12 rounded-xl bg-foto-red/10 text-foto-red items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {iconSvg(b.icon)}
                  </svg>
                </span>
                <h2 className="text-lg font-semibold text-gray-900 mt-4">{b.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{b.description}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
