export default function NavBar() {
  const links = [
    { label: "FAQ", href: "#faq" },
    { label: "Novedades", href: "#novedades" },
    { label: "Blog", href: "#blog" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Talleres", href: "#talleres" },
  ];

  return (
    <nav className="bg-white border-b-2 border-foto-red shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-1 flex-wrap py-3">
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-gray-700 hover:text-foto-red hover:bg-red-50 font-medium transition-colors rounded-lg"
              >
                {link.label}
              </a>
              {i < links.length - 1 && (
                <span className="text-gray-300 select-none" aria-hidden>
                  |
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
