import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sucursales | Foto Sonido",
  description: "Horarios y ubicaciones de nuestras sucursales.",
};

const sucursales = [
  {
    id: "1",
    name: "Sucursal Central",
    address: "Av. Principal 123, San José",
    phone: "204-3030",
    schedule: "Lun - Sáb: 9:00 - 19:00, Dom: 10:00 - 17:00",
  },
  {
    id: "2",
    name: "Sucursal Mall San Pedro",
    address: "Mall San Pedro, Local 45",
    phone: "204-3031",
    schedule: "Lun - Dom: 10:00 - 21:00",
  },
  {
    id: "3",
    name: "Sucursal Alajuela",
    address: "Centro Comercial Real, Alajuela",
    phone: "204-3032",
    schedule: "Lun - Sáb: 9:00 - 20:00",
  },
  {
    id: "4",
    name: "Sucursal Cartago",
    address: "Plaza Cartago, 2do piso",
    phone: "204-3033",
    schedule: "Lun - Sáb: 9:00 - 18:30",
  },
];

export default function SucursalesPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Horario de sucursales</h1>
          <p className="text-gray-600 mb-8">
            Visítanos en cualquiera de nuestras tiendas. Te esperamos con las mejores ofertas en tecnología y línea blanca.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {sucursales.map((s) => (
              <article
                key={s.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-xl bg-foto-red/10 flex items-center justify-center text-foto-red shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900">{s.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{s.address}</p>
                    <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${s.phone.replace(/-/g, "")}`} className="hover:text-foto-red transition-colors">
                        {s.phone}
                      </a>
                    </p>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {s.schedule}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
