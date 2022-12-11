import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "src/const/types";

export const catalogueApi = createApi({
  reducerPath: "catalogueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-frontend.dev.int.perx.ru/api/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string[]>({
      query: (dealers: string[]) =>
        dealers.length ? `goods/?dealers=${dealers.join(",")}` : "goods/",
    }),
  }),
});

export const { useGetProductsQuery } = catalogueApi;
