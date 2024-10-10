import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    signIn: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
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
export default authSlice.reducer;
