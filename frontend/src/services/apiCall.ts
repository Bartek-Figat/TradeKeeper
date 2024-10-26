import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Register } from "./type";
import { signIn } from "../slice/authSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/auth/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "login",
        method: "POST",
        body: credential,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Data", data);
          dispatch(signIn(data));
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
    validateToken: builder.query({
      query: (token) => ({
        url: "validate-token",
        method: "POST",
        body: { token },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Token validation result:", data);
          // Handle the validation result as needed
        } catch (error) {
          console.error("Token validation failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useValidateTokenQuery } =
  userApi;
