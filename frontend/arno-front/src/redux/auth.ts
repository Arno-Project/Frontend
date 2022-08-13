import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models";
import type { RootState } from "./store";

interface AuthState {
  needUpdate: boolean
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  notificationCount: number;
}

const initialState: AuthState = {
  needUpdate: true,
  isLoggedIn: false,
  user: null,
  token: window.localStorage.getItem("token"),
  notificationCount: 0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      window.localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      window.localStorage.removeItem("token");

      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setUserNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload
    },
    setNeedUpdate: (state, action: PayloadAction<boolean>) => {
      state.needUpdate = action.payload
    }
  },
});

export const { login, logout, setUserInfo, setUserNotificationCount, setNeedUpdate } = authSlice.actions;

export default authSlice.reducer;
