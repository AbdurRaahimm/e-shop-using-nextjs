"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateQuantity, removeFromCart, clearCart } from "@/lib/features/cartSlice"
import { addOrder } from "@/lib/features/ordersSlice"
import type { ShippingInfo } from "@/lib/types"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CheckoutForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, totalAmount, totalItems } = useAppSelector((state) => state.cart)

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    address: "",
    phone: "",
  })

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {}

    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!shippingInfo.address.trim()) {
      newErrors.address = "Shipping address is required"
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]+$/.test(shippingInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || items.length === 0) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const order = {
      id: `ORDER-${Date.now()}`,
      customerName: shippingInfo.fullName,
      items: [...items],
      totalItems,
      totalAmount,
      orderDate: new Date().toISOString(),
      shippingInfo: { ...shippingInfo },
    }

    dispatch(addOrder(order))
    dispatch(clearCart())

    router.push("/checkout/success")
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart to continue</p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Cart Items */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <div className="w-16 h-16 relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                <p className="text-green-600 font-semibold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-1 hover:bg-red-100 rounded text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total: </span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Form */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={shippingInfo.fullName}
              onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address *
            </label>
            <textarea
              id="address"
              rows={3}
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your shipping address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isSubmitting ? "Processing..." : `Place Order - $${totalAmount.toFixed(2)}`}
          </button>
        </form>
      </section>
    </div>
  )
}
