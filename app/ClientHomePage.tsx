"use client"

import ProductCard from "@/components/ProductCard"
import { useGetProductsQuery } from "@/lib/api/productsApi"
import { Loader2 } from "lucide-react"

export default function ClientHomePage() {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error loading products</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h1>
        <p className="text-gray-600 text-lg">Discover our curated selection of high-quality products</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
