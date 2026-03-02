"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import type { ProductRow, ProductUpdate } from "@/lib/supabase/types";
import { categories } from "@/lib/data";
import { FILTER_BRANDS } from "@/lib/products-data";

const MAX_IMAGES = 5;

/** Motivos para mostrar en el marketplace; al marcar, el producto aparece en esa sección. */
export const PRODUCT_SECTIONS = [
  { key: "promociones", label: "Promociones" },
  { key: "ultimos_modelos", label: "Últimos modelos" },
  { key: "destacados", label: "Destacados" },
  { key: "nuevos", label: "Nuevos" },
] as const;

type FormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  product_id: string;
  is_visible: boolean;
  stock: string;
  sections: string[];
};

const defaultForm: FormData = {
  name: "",
  description: "",
  price: "",
  category: categories[0]?.name ?? "",
  brand: FILTER_BRANDS[0] ?? "",
  product_id: "",
  is_visible: false,
  stock: "",
  sections: [],
};

interface ProductFormProps {
  product?: ProductRow | null;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(product ? {
    name: product.name,
    description: product.description ?? "",
    price: String(product.price),
    category: product.category,
    brand: product.brand,
    product_id: product.product_id,
    is_visible: product.is_visible,
    stock: product.stock != null ? String(product.stock) : "",
    sections: Array.isArray(product.sections) ? [...product.sections] : [],
  } : defaultForm);
  const [existingImages, setExistingImages] = useState<string[]>(product?.images ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const totalImages = existingImages.length + newFiles.length;
  const canAddMore = totalImages < MAX_IMAGES;

  const validateFile = (file: File): string | null => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) return `"${file.name}": solo JPG, PNG, WebP o GIF.`;
    return null;
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length + totalImages > MAX_IMAGES) {
      setError(`Máximo ${MAX_IMAGES} imágenes.`);
      return;
    }
    for (const f of files) {
      const err = validateFile(f);
      if (err) {
        setError(err);
        return;
      }
    }
    setError(null);
    setNewFiles((prev) => [...prev, ...files].slice(0, MAX_IMAGES - existingImages.length));
    e.target.value = "";
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    const supabase = createClient();
    const urls: string[] = [];
    const prefix = product ? product.id : `temp-${Date.now()}`;
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${prefix}/${Date.now()}-${i}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("product-images")
        .upload(path, file, { upsert: true });
      if (uploadErr) throw new Error(uploadErr.message);
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const price = parseFloat(form.price);
    const stock = form.stock.trim() ? parseInt(form.stock, 10) : null;
    if (isNaN(price) || price < 0) {
      setError("Precio no válido.");
      return;
    }
    if (totalImages === 0) {
      setError("Añade al menos una imagen (máx. 5).");
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      let imageUrls = [...existingImages];
      if (newFiles.length > 0) {
        const uploaded = await uploadFiles();
        imageUrls = [...existingImages, ...uploaded];
      }
      const payload: ProductUpdate = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price,
        category: form.category.trim(),
        brand: form.brand.trim(),
        product_id: form.product_id.trim(),
        images: imageUrls,
        is_visible: form.is_visible,
        stock: stock != null && !isNaN(stock) ? stock : null,
        sections: form.sections.length > 0 ? form.sections : [],
      };

      if (product) {
        const { error: updateErr } = await supabase
          .from("products")
          // @ts-ignore — Supabase infiere 'never' en .update() con tipos Database genéricos
          .update(payload)
          .eq("id", product.id);
        if (updateErr) throw new Error(updateErr.message);
        router.push("/admin/productos");
        router.refresh();
      } else {
        // @ts-ignore — Supabase infiere 'never' en .insert() con tipos Database genéricos
        const { error: insertErr } = await supabase.from("products").insert(payload);
        if (insertErr) throw new Error(insertErr.message);
        router.push("/admin/productos");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-foto-red focus:outline-none focus:ring-1 focus:ring-foto-red";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Sección: Información básica */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 sm:p-6 mb-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-700">
          Información básica
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Nombre del producto</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className={inputClass}
              placeholder='Ej. Smart TV LG 55" 4K'
            />
          </div>
          <div>
            <label className={labelClass}>ID de producto (SKU / código único)</label>
            <input
              type="text"
              value={form.product_id}
              onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))}
              required
              disabled={!!product}
              className={inputClass + " disabled:opacity-60"}
              placeholder="Ej. TV-LG-55-001"
            />
            {product && <p className="text-xs text-slate-500 mt-1">El ID no se puede cambiar después de crear.</p>}
          </div>
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={4}
              className={inputClass + " resize-y min-h-[100px]"}
              placeholder="Descripción del producto..."
            />
          </div>
        </div>
      </section>

      {/* Sección: Precio e inventario */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 sm:p-6 mb-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-700">
          Precio e inventario
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Precio ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Stock (opcional)</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Sección: Categorización */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 sm:p-6 mb-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-700">
          Categorización
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Categoría</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Marca</label>
            <select
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              className={inputClass}
            >
              {FILTER_BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sección: Imágenes */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 sm:p-6 mb-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-700">
          Imágenes (máx. 5)
        </h2>
        <div className="flex flex-wrap gap-3">
          {existingImages.map((url, i) => (
            <div key={url} className="relative group">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-700 relative border border-slate-600">
                <Image src={url} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <button
                type="button"
                onClick={() => removeExistingImage(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white text-xs font-bold hover:bg-red-500"
              >
                ×
              </button>
            </div>
          ))}
          {newFiles.map((file, i) => (
            <div key={i} className="relative group">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 text-xs">
                {(file.size / 1024).toFixed(0)} KB
              </div>
              <button
                type="button"
                onClick={() => removeNewFile(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white text-xs font-bold hover:bg-red-500"
              >
                ×
              </button>
            </div>
          ))}
          {canAddMore && (
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-400 text-sm cursor-pointer hover:border-foto-red hover:text-foto-red transition-colors">
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" onChange={onFileChange} />
              + Añadir
            </label>
          )}
        </div>
      </section>

      {/* Sección: Publicación y motivos */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-700">
          Dónde mostrar en el marketplace
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_visible"
              checked={form.is_visible}
              onChange={(e) => setForm((f) => ({ ...f, is_visible: e.target.checked }))}
              className="rounded border-slate-600 bg-slate-800 text-foto-red focus:ring-foto-red w-4 h-4"
            />
            <label htmlFor="is_visible" className="text-sm text-slate-300 cursor-pointer">
              Catálogo general (visible en listado de productos)
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300 mb-2">Mostrar también en:</p>
            <div className="flex flex-wrap gap-4">
              {PRODUCT_SECTIONS.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.sections.includes(key)}
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        sections: e.target.checked
                          ? [...f.sections, key]
                          : f.sections.filter((s) => s !== key),
                      }));
                    }}
                    className="rounded border-slate-600 bg-slate-800 text-foto-red focus:ring-foto-red w-4 h-4"
                  />
                  <span className="text-sm text-slate-300">{label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              El producto aparecerá automáticamente en la sección elegida de la página principal.
            </p>
          </div>
        </div>
      </section>

      {error && (
        <div className="mb-6 rounded-lg bg-red-400/10 border border-red-500/30 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Acciones centradas */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="order-2 sm:order-1 rounded-lg border border-slate-600 px-6 py-2.5 text-slate-300 hover:bg-slate-800 transition-colors font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="order-1 sm:order-2 rounded-lg bg-foto-red px-6 py-2.5 font-semibold text-white hover:bg-foto-red-dark disabled:opacity-50 transition-colors min-w-[160px]"
        >
          {saving ? "Guardando..." : product ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
}
