"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: err } = await signUp(email, password, name.trim() || undefined);
      if (err) {
        setError(err);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/cuenta");
        router.refresh();
      }, 1500);
    } catch {
      setError("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Header />
        <main className="w-full min-h-screen py-8 sm:py-12 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">
              <p className="text-green-600 font-medium">Cuenta creada correctamente.</p>
              <p className="text-gray-600 text-sm mt-2">Redirigiendo a Mi cuenta...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full min-h-screen py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Crear cuenta</h1>
            <p className="text-gray-600 text-center mt-2 text-sm">
              Regístrate para ver pedidos, acumular puntos y más.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-foto-red focus:ring-1 focus:ring-foto-red"
                />
              </div>
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
                  autoComplete="email"
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
                  minLength={6}
                  autoComplete="new-password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-foto-red focus:ring-1 focus:ring-foto-red"
                />
                <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres.</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-foto-red text-white font-semibold hover:bg-foto-red-dark transition-colors disabled:opacity-70"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link href="/iniciar-sesion" className="text-foto-red font-semibold hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
