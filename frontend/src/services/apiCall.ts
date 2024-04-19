import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login, Register } from "./type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<Login, void>({
      query: (credential) => ({
        url: "login",
        method: "POST",
        body: credential,
      }),
    }),
    register: builder.mutation<Register, void>({
      query: (credential) => ({
        url: "register",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
