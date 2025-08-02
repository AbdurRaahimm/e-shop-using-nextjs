import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./features/cartSlice";
import ordersReducer from "./features/ordersSlice"
import { Api } from "./api/api"


export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
