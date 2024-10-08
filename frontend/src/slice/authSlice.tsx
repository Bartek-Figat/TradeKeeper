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
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    checkAuth: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      }
    },
  },
});

export const { signIn, signOut, checkAuth } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   isAuthenticated: boolean;
//   accessToken: string | null;
//   refreshToken: string | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   accessToken: null,
//   refreshToken: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signIn: (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
//       state.isAuthenticated = true;
//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//       localStorage.setItem("accessToken", action.payload.accessToken);
//       localStorage.setItem("refreshToken", action.payload.refreshToken);
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.accessToken = null;
//       state.refreshToken = null;
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//     },
//     checkAuth: (state) => {
//       const accessToken = localStorage.getItem("accessToken");
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (accessToken && refreshToken) {
//         state.isAuthenticated = true;
//         state.accessToken = accessToken;
//         state.refreshToken = refreshToken;
//       }
//     },
//   },
// });

// export const { signIn, signOut, checkAuth } = authSlice.actions;
// export default authSlice.reducer;