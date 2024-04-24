import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isScrolled: false,
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setIsScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
  },
});

export const { setIsScrolled } = scrollSlice.actions;
export default scrollSlice.reducer;
