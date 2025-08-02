"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cartSlice";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };
  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
    >
      <ShoppingCart className="h-5 w-5" />

      {added ? "Added Product" : "Add to Cart"}
      <span className="sr-only">
        Add {product.title} to cart {product.id}
      </span>
    </button>
  );
}
