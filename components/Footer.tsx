"use client";

export default function Footer() {
  const comprar = [
    { label: "Televisores", href: "#" },
    { label: "Línea blanca", href: "#" },
    { label: "Electrodomésticos", href: "#" },
    { label: "Cómputo", href: "#" },
    { label: "Celulares y tablets", href: "#" },
    { label: "Audio", href: "#" },
  ];
  const atencion = [
    { label: "Horario y sucursales", href: "#" },
    { label: "Talleres autorizados", href: "#" },
    { label: "Opciones de crédito", href: "#" },
    { label: "Registro de bodas y eventos", href: "#" },
    { label: "Exportaciones", href: "#" },
  ];
  const miCuenta = [
    { label: "Ingresar", href: "#" },
    { label: "Crear cuenta", href: "#" },
    { label: "Historial de compras", href: "#" },
    { label: "Rastrear pedido", href: "#" },
  ];
  const empresa = [
    { label: "Sobre nosotros", href: "#" },
    { label: "Ofertas", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Términos y condiciones", href: "#" },
    { label: "Garantías", href: "#" },
  ];

  const Column = ({
    title,
    links,
  }: {
    title: string;
    links: { label: string; href: string }[];
  }) => (
    <div>
      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-slate-400 text-sm hover:text-white transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      {/* Banner de confianza */}
      <div className="border-b border-slate-700/80">
        <div className="w-full px-2 py-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            </span>
            Envíos a todo el país
          </span>
          <span className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </span>
            Compra protegida
          </span>
          <span className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </span>
            Garantía oficial
          </span>
          <span className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </span>
            Financiamiento disponible
          </span>
        </div>
      </div>

      <div className="w-full px-2 py-12 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {/* Logo + redes */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            <a href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">Foto Sonido</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Tecnología, línea blanca y electrodomésticos. Las mejores marcas con opciones de crédito y envío a domicilio.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "YouTube"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-foto-red hover:border-foto-red hover:text-white transition-colors"
                  aria-label={name}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </a>
              ))}
            </div>
          </div>

          <Column title="Comprar" links={comprar} />
          <Column title="Atención al cliente" links={atencion} />
          <Column title="Mi cuenta" links={miCuenta} />
          <Column title="Empresa" links={empresa} />
        </div>

        {/* Contacto rápido */}
        <div className="mt-10 pt-8 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <a href="tel:2043030" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              204-3030
            </a>
            <a href="mailto:atencion@fotosonido.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              atencion@fotosonido.com
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Métodos de pago</span>
            <div className="flex gap-2">
              {["Visa", "Mastercard", "BAC", "KrediYA", "epik"].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1.5 rounded-md bg-slate-800 text-slate-400 text-xs font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright y legales */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Foto Sonido. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="#" className="text-slate-500 hover:text-slate-400 transition-colors">
              Aviso de privacidad
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-400 transition-colors">
              Términos de uso
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-400 transition-colors">
              Política de cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
