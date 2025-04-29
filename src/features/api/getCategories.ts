import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getCategoriesApi = createApi({
  reducerPath: "getCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => "products/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = getCategoriesApi;
