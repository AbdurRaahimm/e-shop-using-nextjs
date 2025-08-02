import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Order Confirmed - E-Shop",
  description: "Your order has been successfully placed. Thank you for shopping with us!",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>

      <p className="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
      </p>

      <div className="space-y-4">
        <Link
          href="/orders"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          View Your Orders
        </Link>

        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
