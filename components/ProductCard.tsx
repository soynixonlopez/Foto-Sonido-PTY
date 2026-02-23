import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: ProductCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
      <Link href={`/productos/${product.id}`} className="relative aspect-square bg-gray-50 flex-1 min-h-0 block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 bg-foto-red text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-md rotate-12">
            {product.badge}
          </span>
        )}
      </Link>
      <div className={`p-3 flex flex-col ${compact ? "flex-1 min-h-0" : ""}`}>
        <Link href={`/productos/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-3 leading-snug hover:text-foto-red">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-foto-red">${product.price.toFixed(2)}</span>
          {product.previousPrice && (
            <span className="text-xs text-gray-400">
              Antes: <span className="line-through">${product.previousPrice.toFixed(2)}</span>
            </span>
          )}
        </div>
        {!compact && (
          <button
            type="button"
            className="mt-3 w-full py-2.5 bg-foto-red text-white font-semibold rounded-lg hover:bg-foto-red-dark transition-colors text-sm"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  );
}
