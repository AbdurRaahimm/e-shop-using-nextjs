"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"


interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">

      <div className="aspect-square relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h2>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
