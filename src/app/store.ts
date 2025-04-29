import { configureStore } from "@reduxjs/toolkit";
import { updateProductApi } from "../features/api/updateProductApi";
import { getProductsApi } from "../features/api/getProduct";
import { getProductByIdApi } from "../features/api/getProductById";
import { getCategoriesApi } from "../features/api/getCategories";

export const store = configureStore({
  reducer: {
    [getProductsApi.reducerPath]: getProductsApi.reducer,
    [getProductByIdApi.reducerPath]: getProductByIdApi.reducer,
    [getCategoriesApi.reducerPath]: getCategoriesApi.reducer,
    [updateProductApi.reducerPath]: updateProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(getProductsApi.middleware)
      .concat(getProductByIdApi.middleware)
      .concat(getCategoriesApi.middleware)
      .concat(updateProductApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
