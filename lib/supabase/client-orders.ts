import { createClient } from "./client";
import type { Database } from "./types";

export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type CustomerProfileRow = Database["public"]["Tables"]["customer_profiles"]["Row"];

/** Devuelve los pedidos del usuario autenticado. Llamar desde el cliente. */
export async function getMyOrders(): Promise<OrderRow[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return (data ?? []) as OrderRow[];
}

/** Devuelve el perfil del cliente (puntos, nombre). Llamar desde el cliente. */
export async function getMyProfile(): Promise<CustomerProfileRow | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("customer_profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  return data as CustomerProfileRow | null;
}

/** Puntos acumulados: suma de points_earned de pedidos con status entregado. */
export async function getMyPoints(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data } = await supabase
    .from("orders")
    .select("points_earned")
    .eq("user_id", user.id)
    .eq("status", "entregado");
  return (data ?? []).reduce((sum, r) => sum + (r.points_earned ?? 0), 0);
}
