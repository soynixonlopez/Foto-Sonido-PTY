import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Historial de compras | Foto Sonido",
  description: "Consulta tus pedidos anteriores.",
};

export default function HistorialPage() {
  // TODO: cargar pedidos del usuario autenticado
  const pedidos: { id: string; date: string; total: number; status: string }[] = [];

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Historial de compras</h1>
          {pedidos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Aún no tienes pedidos.</p>
              <Link
                href="/iniciar-sesion"
                className="inline-block mt-4 text-foto-red font-semibold hover:underline"
              >
                Inicia sesión
              </Link>
              <span className="text-gray-500"> para ver tu historial, o </span>
              <Link href="/productos" className="text-foto-red font-semibold hover:underline">
                compra ahora
              </Link>
              .
            </div>
          ) : (
            <ul className="space-y-4">
              {pedidos.map((p) => (
                <li
                  key={p.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium text-gray-900">Pedido #{p.id}</span>
                    <span className="text-gray-500 text-sm block">{p.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foto-red">${p.total.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm block">{p.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
