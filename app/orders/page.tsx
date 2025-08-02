import type { Metadata } from "next"
import OrdersList from "./OrdersList"

export const metadata: Metadata = {
  title: "Your Orders - E-Shop",
  description: "View and track all your orders in one place.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      <OrdersList />
    </div>
  )
}
