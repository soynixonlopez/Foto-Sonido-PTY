import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Blog | Foto Sonido",
  description: "Consejos, guías y novedades sobre tecnología y hogar.",
};

const posts = [
  { id: "1", title: "Cómo elegir el mejor televisor para tu sala", date: "Feb 2025", slug: "elegir-televisor" },
  { id: "2", title: "Cuidados de tu línea blanca", date: "Ene 2025", slug: "cuidados-linea-blanca" },
  { id: "3", title: "Ventajas de comprar a crédito con Fotocredit", date: "Ene 2025", slug: "fotocredit-ventajas" },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600 mb-8">
            Consejos, guías y novedades para sacar el máximo a tu tecnología.
          </p>
          <ul className="space-y-4">
            {posts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-foto-red/30 transition-all"
                >
                  <span className="text-sm text-gray-500">{p.date}</span>
                  <h2 className="text-lg font-semibold text-gray-900 mt-1">{p.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
