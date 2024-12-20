import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import scrollReducer from "../slice/scrollSlice";
import { userApi } from "../services/apiCall";
import { tradeApi } from "../services/tradeApi";
import { subscriptionApi } from "../services/subscriptionApi"; // Ensure this import is correct
import darkModeReducer from "../slice/darkModeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    scroll: scrollReducer,
    [tradeApi.reducerPath]: tradeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(tradeApi.middleware)
      .concat(subscriptionApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
