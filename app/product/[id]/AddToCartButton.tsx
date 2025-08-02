"use client"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cartSlice"
import type { Product } from "@/lib/types"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    )
  }
  return (
    <button
    onClick={handleAddToCart}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
    >
      <ShoppingCart className="h-5 w-5" />
      <span>Add to Cart</span>
    </button>
  )
}
  