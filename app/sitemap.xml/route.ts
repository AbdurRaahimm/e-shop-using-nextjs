import { Product } from "@/lib/types"
import { NextResponse } from "next/server"

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")
  return res.json()
}

export async function GET() {
  const products = await getProducts()
  const baseUrl = "http://localhost:3000/"

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  const productPages = products.map((product: Product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const allPages = [...staticPages, ...productPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified.toISOString()}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>`,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
