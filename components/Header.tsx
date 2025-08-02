"use client"

import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"
import { ShoppingCart } from "lucide-react"

export default function Header() {
  const totalItems = useAppSelector((state) => state.cart.totalItems)

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
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
