import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Foto Sonido | Marketplace - Línea Blanca, Electrodomésticos y Tecnología",
  description: "Tu marketplace de confianza para línea blanca, electrodomésticos, tecnología y más.",
  icons: {
    icon: [{ url: "/images/logos/logoFotoSonido.png", type: "image/png" }],
    apple: "/images/logos/logoFotoSonido.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <WhatsAppFloat />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
