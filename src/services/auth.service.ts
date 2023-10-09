import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginPayLoad, ILoginResponse, IResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<IResponse<ILoginResponse>, ILoginPayLoad>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body,
      }),
    }),
  }),
});
