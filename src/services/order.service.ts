import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CollectionStatusEnum, ICreateOrderPayload, IOrder, IOrderCollection, IResponse } from "./types";
import { RootState } from "../store/appSlice";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/order`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<IResponse<IOrder>, { shopId: string; body: ICreateOrderPayload }>({
      query: (payload) => ({
        url: `${payload.shopId}`,
        method: "POST",
        body: payload.body,
      }),
    }),
    getSingleOrder: builder.query<IResponse<IOrder>, string>({
      query: (body) => ({
        url: `/${body}`,
        method: "GET",
      }),
    }),
    getSingleOrderCollection: builder.query<IResponse<IOrderCollection>, string>({
      query: (body) => ({
        url: `/orderCollection/${body}`,
        method: "GET",
      }),
    }),
    acceptOrder: builder.mutation<
      IResponse<IOrder>,
      {
        orderId: string;
        agentId: string;
        useSpikk: boolean;
        collectionStatus: CollectionStatusEnum;
        amount: number;
      }
    >({
      query: (payload) => ({
        url: `/${payload.orderId}/acceptOrder`,
        method: "POST",
        body: { ...payload, agentId: `${payload.agentId}` },
      }),
    }),
    confirmAgentKey: builder.mutation<IResponse<IOrderCollection>, { orderCollectionId: string; agentKey: string }>({
      query: (payload) => ({
        url: `/${payload.orderCollectionId}/confirmAgent`,
        method: "POST",
        body: JSON.stringify({ key: payload.agentKey }),
      }),
    }),
    confirmShopKey: builder.mutation<IResponse<IOrderCollection>, { orderCollectionId: string; shopKey: string }>({
      query: (payload) => ({
        url: `/${payload.orderCollectionId}/confirmShop`,
        method: "POST",
        body: JSON.stringify({ key: payload.shopKey }),
      }),
    }),
    deleteOrder: builder.mutation<IResponse<null>, { orderId: string }>({
      query: (payload) => ({
        url: `/${payload.orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});
