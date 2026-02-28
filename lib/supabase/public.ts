import type { Product } from "@/lib/types";
import type { ProductRow } from "./types";
import { createClient } from "./client";

function getClientSafe() {
  try {
    return createClient();
  } catch {
    return null;
  }
}

function rowToProduct(row: ProductRow): Product {
  const images = row.images ?? [];
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    price: Number(row.price),
    image: images[0] ?? "",
    images: images.length > 0 ? images : undefined,
    category: row.category,
    brand: row.brand,
    family: row.category,
    sections: Array.isArray(row.sections) ? row.sections : undefined,
  };
}

export async function fetchVisibleProductsFromSupabase(): Promise<Product[]> {
  const supabase = getClientSafe();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return ((data ?? []) as ProductRow[]).map(rowToProduct);
}

export async function fetchProductByIdFromSupabase(id: string): Promise<Product | null> {
  const supabase = getClientSafe();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();
  if (error || !data) return null;
  return rowToProduct(data as ProductRow);
}

/** Para listado: combina productos de Supabase con los estáticos (evitando duplicados por id). */
export async function getMarketplaceProducts(): Promise<Product[]> {
  const fromDb = await fetchVisibleProductsFromSupabase();
  if (fromDb.length > 0) return fromDb;
  const { allProducts } = await import("@/lib/products-data");
  return allProducts;
}

/** Para detalle: busca en Supabase por id; si no hay, en datos estáticos. */
export async function getMarketplaceProductById(id: string): Promise<Product | null> {
  const fromDb = await fetchProductByIdFromSupabase(id);
  if (fromDb) return fromDb;
  const { getProductById } = await import("@/lib/products-data");
  return getProductById(id) ?? null;
}

/** Productos que tienen un motivo/sección (para la home). */
export async function fetchProductsBySection(sectionKey: string): Promise<Product[]> {
  const supabase = getClientSafe();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .contains("sections", [sectionKey])
    .order("created_at", { ascending: false });
  if (error) return [];
  return ((data ?? []) as ProductRow[]).map(rowToProduct);
}

/** Productos por sección para la página principal (promociones, últimos modelos, destacados, nuevos). */
export async function getProductsForHomeSections(): Promise<{
  promociones: Product[];
  ultimos_modelos: Product[];
  destacados: Product[];
  nuevos: Product[];
} | null> {
  const supabase = getClientSafe();
  if (!supabase) return null;
  const [promociones, ultimos_modelos, destacados, nuevos] = await Promise.all([
    fetchProductsBySection("promociones"),
    fetchProductsBySection("ultimos_modelos"),
    fetchProductsBySection("destacados"),
    fetchProductsBySection("nuevos"),
  ]);
  if (promociones.length === 0 && ultimos_modelos.length === 0 && destacados.length === 0 && nuevos.length === 0) {
    return null;
  }
  return { promociones, ultimos_modelos, destacados, nuevos };
}
