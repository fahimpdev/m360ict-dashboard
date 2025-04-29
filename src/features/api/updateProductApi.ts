import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateProductApi = createApi({
  reducerPath: "updateProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    updateProduct: builder.mutation<
      any,
      { id: string | number; productData: any }
    >({
      query: ({ id, productData }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: productData,
      }),
    }),
  }),
});

export const { useUpdateProductMutation } = updateProductApi;
