// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/product";

// Define the response type for paginated products
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Define the response type for categories
export interface CategoriesResponse {
  categories: string[];
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    // Get all products (paginated)
    getProducts: builder.query<
      ProductsResponse,
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),

    // Get single product by ID
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),

    // Get product categories
    // getCategories: builder.query<CategoriesResponse, void>({
    //   query: () => "products/categories",
    // }),
  }),
});

// Export the hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  // useGetCategoriesQuery,
} = apiSlice;
