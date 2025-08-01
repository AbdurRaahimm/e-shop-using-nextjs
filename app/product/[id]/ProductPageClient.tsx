"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import { useGetProductQuery } from "@/lib/api/productsApi"
import AddToCartButton from "./AddToCartButton"
import { Loader2 } from "lucide-react"

interface ProductPageProps {
    id: string

}

export default function ProductPageClient({ id }: ProductPageProps) {
  const { data: product, error, isLoading } = useGetProductQuery(parseInt(id))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="aspect-square relative bg-white rounded-lg shadow-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
          />
        </section>

        <section className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-green-600">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-600 ml-1">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <AddToCartButton product={product} />
        </section>
      </div>
    </div>
  )
}
