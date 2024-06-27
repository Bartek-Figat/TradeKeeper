import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login, Register } from "./type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<void, Login>({
      query: (credential) => ({
        url: "login",
        method: "POST",
        body: credential,
      }),
    }),
    register: builder.mutation<void, Register>({
      query: (credential) => ({
        url: "api/auth/registration",
        method: "POST",
        body: credential,
        credentials: "include"
      }),
    }),
  }),
});


export const { useLoginMutation, useRegisterMutation } = userApi;
