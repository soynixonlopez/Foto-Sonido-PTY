"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function getSupabaseClientSafe(): ReturnType<typeof createClient> | null {
  try {
    return createClient();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClientSafe();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseClientSafe();
    if (!supabase) return { error: "Servicio no disponible." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return {
      error: error
        ? error.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : error.message
        : null,
    };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const supabase = getSupabaseClientSafe();
      if (!supabase) return { error: "Servicio no disponible." };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: fullName ? { data: { full_name: fullName } } : undefined,
      });
      if (error)
        return {
          error:
            error.message === "User already registered"
              ? "Ya existe una cuenta con ese correo."
              : error.message,
        };
      if (data?.user) {
        try {
          await (supabase.from("customer_profiles") as any).upsert(
            {
              id: data.user.id,
              email: data.user.email ?? email,
              full_name: fullName ?? "",
              points: 0,
            },
            { onConflict: "id" }
          );
        } catch {
          // Tabla customer_profiles puede no existir aún; el trigger en DB también puede crear el perfil.
        }
      }
      return { error: null };
    },
    []
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClientSafe();
    if (supabase) await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
