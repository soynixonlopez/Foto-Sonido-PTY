import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Blog | Foto Sonido",
  description: "Consejos y guías sobre tecnología y hogar.",
};

const posts: Record<string, { title: string; date: string; body: string }> = {
  "elegir-televisor": {
    title: "Cómo elegir el mejor televisor para tu sala",
    date: "Febrero 2025",
    body: "El tamaño de la pantalla, la resolución (4K, 8K), el tipo de panel y las entradas HDMI son factores clave. Considera la distancia de visualización y el contenido que más consumes (deportes, películas, juegos) para decidir.",
  },
  "cuidados-linea-blanca": {
    title: "Cuidados de tu línea blanca",
    date: "Enero 2025",
    body: "Limpieza regular, evitar sobrecarga, revisar sellos y filtros, y seguir las indicaciones del fabricante alargan la vida de refrigeradoras, lavadoras y secadoras. En Foto Sonido te asesoramos en el mantenimiento.",
  },
  "fotocredit-ventajas": {
    title: "Ventajas de comprar a crédito con Fotocredit",
    date: "Enero 2025",
    body: "Fotocredit es el crédito exclusivo de Foto Sonido: aprobación rápida, cuotas fijas y promociones con meses sin intereses en productos seleccionados. Puedes solicitar en tienda o durante tu compra en línea.",
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <Link href="/blog" className="text-foto-red text-sm font-medium hover:underline">
            ← Volver al blog
          </Link>
          {!post ? (
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-900">Entrada no encontrada</h1>
              <Link href="/blog" className="text-foto-red mt-2 inline-block">Volver al blog</Link>
            </div>
          ) : (
            <article className="mt-6">
              <span className="text-sm text-gray-500">{post.date}</span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{post.title}</h1>
              <p className="text-gray-600 mt-4 leading-relaxed">{post.body}</p>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
