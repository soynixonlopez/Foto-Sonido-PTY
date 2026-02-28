import ProductForm from "../ProductForm";
import Link from "next/link";

export default function NuevoProductoPage() {
  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6"
      >
        ← Productos
      </Link>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Nuevo producto</h1>
        <ProductForm />
      </div>
    </div>
  );
}
