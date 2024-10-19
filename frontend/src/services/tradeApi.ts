import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateTrade, TradeDto } from "./type";

export const tradeApi = createApi({
  reducerPath: "tradeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/custom-trades/",
  }),
  tagTypes: ["Trade"],
  endpoints: (builder) => ({
    createTrade: builder.mutation<TradeDto, ICreateTrade>({
      query: (newTrade) => ({
        url: "create",
        method: "POST",
        body: newTrade,
      }),
      invalidatesTags: ["Trade"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error creating trade:", error);
          // Optionally, dispatch an action to update the UI or log the error
        }
      },
    }),
    getTradeById: builder.query<TradeDto, string>({
      query: (tradeId) => `get-trade/${tradeId}`,
      providesTags: (_result, _error, tradeId) => [
        { type: "Trade", id: tradeId },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error fetching trade by ID:", error);
          // Handle error, e.g., show a notification
        }
      },
    }),
    getAllTrades: builder.query<TradeDto[], void>({
      query: () => "get-all-trades",
      providesTags: ["Trade"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error fetching all trades:", error);
          // Handle error
        }
      },
    }),
    updateTrade: builder.mutation<
      void,
      { tradeId: string; updatedTrade: Partial<ICreateTrade> }
    >({
      query: ({ tradeId, updatedTrade }) => ({
        url: `update-existing-trade/${tradeId}`,
        method: "PUT",
        body: updatedTrade,
      }),
      invalidatesTags: (_result, _error, { tradeId }) => [
        { type: "Trade", id: tradeId },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error updating trade:", error);
          // Handle error
        }
      },
    }),
    filterTrades: builder.query({
      query: (filter) => {
        const queryString = new URLSearchParams(filter).toString();
        return {
          url: `filter-trades?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Trade"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Error filtering trades:", error);
          // Handle error
        }
      },
    }),
  }),
});

export const {
  useCreateTradeMutation,
  useGetTradeByIdQuery,
  useGetAllTradesQuery,
  useUpdateTradeMutation,
  useFilterTradesQuery,
} = tradeApi;
