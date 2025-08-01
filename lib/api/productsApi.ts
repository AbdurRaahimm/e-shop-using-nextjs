import type { Product } from "../types";
import { Api } from "./api";


const productsApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
          query: () => "products",
          providesTags: ["Product"],
        }),
        getProduct: builder.query<Product, number>({
          query: (id) => `products/${id}`,
          providesTags: (result, error, id) => [{ type: "Product", id }],
        }),
        getProductsByCategory: builder.query<Product[], string>({
          query: (category) => `products/category/${category}`,
          providesTags: ["Product"],
        }),
        getCategories: builder.query<string[], void>({
          query: () => "products/categories",
        }),
      }),
});


export const { 
    useGetProductsQuery, 
    useGetProductQuery, 
    useGetProductsByCategoryQuery, 
    useGetCategoriesQuery 
} = productsApi

export { productsApi };
export type { Product };
    