import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Order } from "../types"

interface OrdersState {
  orders: Order[]
}

const initialState: OrdersState = {
  orders: [],
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
    },
  },
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer
