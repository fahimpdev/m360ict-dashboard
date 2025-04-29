// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the response type for categories (direct array of strings)
export interface CategoriesResponse {
  // Direct array of strings
  categories: string[];
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    // Get product categories
    getCategories: builder.query<string[], void>({
      query: () => "products/categories", // Fetch from API
    }),
  }),
});

// Export the hooks
export const { useGetCategoriesQuery } = apiSlice;
