import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Talleres autorizados | Foto Sonido",
  description: "Servicio técnico y talleres autorizados para tus equipos.",
};

const talleres = [
  { name: "Taller Central", address: "Av. Principal 123, San José", phone: "204-3030" },
  { name: "Taller Alajuela", address: "Zona Franca, Alajuela", phone: "204-3032" },
];

export default function TalleresPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talleres autorizados</h1>
          <p className="text-gray-600 mb-8">
            Nuestros talleres ofrecen reparación y mantenimiento con repuestos originales y técnicos certificados.
          </p>
          <div className="space-y-4">
            {talleres.map((t, i) => (
              <article
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <h2 className="font-semibold text-gray-900">{t.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{t.address}</p>
                <a href={`tel:${t.phone.replace(/-/g, "")}`} className="text-foto-red text-sm font-medium mt-2 inline-block hover:underline">
                  {t.phone}
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
