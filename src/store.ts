import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./features/router/routerSlice";
import cartReducer from "./features/cart/cartSlice";
import dealersReducer from "./features/dealers/dealersSlice";
import { catalogueApi } from "./features/catalogue/catalogueApi";

export const store = configureStore({
  reducer: {
    router: routerReducer,
    cart: cartReducer,
    dealers: dealersReducer,
    [catalogueApi.reducerPath]: catalogueApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogueApi.middleware),
});

export type StoreState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
