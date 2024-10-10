import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login, Register } from "./type";
import { signIn } from "../slice/authSlice";

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const { data } = response;
          dispatch(signIn(`${data}`));
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
    register: builder.mutation<void, Register>({
      query: (credential) => ({
        url: "registration",
        method: "POST",
        body: credential,
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Registration failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
