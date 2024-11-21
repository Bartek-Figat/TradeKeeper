import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (subscriptionData) => ({
        url: "/subscriptions",
        method: "POST",
        body: subscriptionData,
      }),
    }),
    cancelSubscription: builder.mutation({
      query: (subscriptionId) => ({
        url: `/subscriptions/${subscriptionId}`,
        method: "DELETE",
      }),
    }),
    updateSubscription: builder.mutation({
      query: ({ subscriptionId, priceId }) => ({
        url: `/subscriptions/${subscriptionId}`,
        method: "PATCH",
        body: { priceId },
      }),
    }),
    createOneTimePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useCreateOneTimePaymentMutation,
} = subscriptionApi;
