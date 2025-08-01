export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }
  
  export interface CartItem {
    id: number
    title: string
    price: number
    image: string
    quantity: number
  }
  
  export interface ShippingInfo {
    fullName: string
    address: string
    phone: string
  }
  
  export interface Order {
    id: string
    customerName: string
    items: CartItem[]
    totalItems: number
    totalAmount: number
    orderDate: string
    shippingInfo: ShippingInfo
  }
  