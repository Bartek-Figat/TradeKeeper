import { configureStore } from "@reduxjs/toolkit";

import scrollReducer from "../slice/scrollSlice";
import { userApi } from "../services/apiCall"

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    [userApi.reducerPath] : userApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
