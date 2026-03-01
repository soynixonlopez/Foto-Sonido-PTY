import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Novedades | Foto Sonido",
  description: "Últimos productos y ofertas en tecnología y línea blanca.",
};

const novedades = [
  { id: "1", title: "Nueva línea de aires acondicionados 2025", date: "Febrero 2025", excerpt: "Eficiencia y diseño para tu hogar." },
  { id: "2", title: "Smart TVs con IA y mejor imagen", date: "Enero 2025", excerpt: "Descubre la nueva generación de televisores." },
  { id: "3", title: "Promoción Back to School", date: "Enero 2025", excerpt: "Descuentos en cómputo y útiles escolares." },
];

export default function NovedadesPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Novedades</h1>
          <p className="text-gray-600 mb-8">
            Entérate de los últimos lanzamientos y ofertas de Foto Sonido.
          </p>
          <div className="space-y-4">
            {novedades.map((n) => (
              <article
                key={n.id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm text-gray-500">{n.date}</span>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">{n.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{n.excerpt}</p>
                <Link href="/productos" className="inline-block mt-3 text-foto-red font-semibold text-sm hover:underline">
                  Ver productos →
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
