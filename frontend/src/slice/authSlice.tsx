import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      console.log("payload.token", payload.token);
      state.isAuthenticated = true;
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
    },
    signOut: (state) => {
      console.log("State action sinOut", state);
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    checkAuth: (state) => {
      const token = localStorage.getItem("token");
      console.log("Checking token from localStorage:", token);
      state.isAuthenticated = true;
      state.token = token;
    },
  },
});

export const { signIn, signOut, checkAuth } = authSlice.actions;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
