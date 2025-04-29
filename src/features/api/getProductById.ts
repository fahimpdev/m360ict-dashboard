import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/product";

export const getProductByIdApi = createApi({
  reducerPath: "getProductByIdApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProductById: builder.query<Product, string | number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductByIdQuery } = getProductByIdApi;
