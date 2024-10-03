import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login, Register } from "./type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/auth/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<void, Login>({
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
