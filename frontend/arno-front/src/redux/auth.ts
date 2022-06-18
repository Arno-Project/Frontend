import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
  isLoggedIn: boolean;
  name: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
