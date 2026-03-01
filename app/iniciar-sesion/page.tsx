"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function IniciarSesionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar con auth (Supabase u otro)
  };

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Iniciar sesión</h1>
            <p className="text-gray-600 text-center mt-2 text-sm">
              Accede a tu cuenta para ver pedidos, favoritos y más.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-foto-red focus:ring-1 focus:ring-foto-red"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-foto-red focus:ring-1 focus:ring-foto-red"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark transition-colors"
              >
                Entrar
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="text-foto-red font-semibold hover:underline">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
