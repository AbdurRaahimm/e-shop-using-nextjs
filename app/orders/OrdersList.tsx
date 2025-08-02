"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function OrdersList() {
  const orders = useAppSelector((state) => state.orders.orders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-6">You haven&apos;t placed any orders yet</p>
        <Link
          href="/"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <article key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                <p className="text-sm text-gray-600">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>

              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <span>Details</span>
                {expandedOrder === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Customer:</span>
                <p className="text-gray-900">{order.customerName}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Total Items:</span>
                <p className="text-gray-900">{order.totalItems}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Total Amount:</span>
                <p className="text-green-600 font-semibold">${order.totalAmount.toFixed(2)}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <p className="text-blue-600 font-medium">Processing</p>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingInfo.fullName}</p>
                    <p>{order.shippingInfo.address}</p>
                    <p>Phone: {order.shippingInfo.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
