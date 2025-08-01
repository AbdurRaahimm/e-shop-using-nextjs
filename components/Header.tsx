"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Header() {

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            E-Shop
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-gray-900">
              Orders
            </Link>
            <Link href="/checkout" className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
