import type { Metadata } from "next"
import ProductCard from "@/components/ProductCard"
import type { Product } from "@/lib/types"

export const metadata: Metadata = {
  title: "Home - E-Shop",
  description: "Browse our collection of high-quality products including electronics, clothing, jewelry and more.",
  openGraph: {
    title: "Home - E-Shop",
    description: "Browse our collection of high-quality products including electronics, clothing, jewelry and more.",
    images: ["/og-image.png"], // Replace with a specific OG image if you have one
  },
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h1>
        <p className="text-gray-600 text-lg">Discover our curated selection of high-quality products</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
