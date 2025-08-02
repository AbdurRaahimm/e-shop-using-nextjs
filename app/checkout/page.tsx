import type { Metadata } from "next"
import CheckoutForm from "./CheckoutForm"

export const metadata: Metadata = {
  title: "Checkout - E-Shop",
  description: "Complete your purchase securely with our easy checkout process.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}
