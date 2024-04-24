import { configureStore } from "@reduxjs/toolkit";

import scrollReducer from "./scroll/scrollSlice";

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
