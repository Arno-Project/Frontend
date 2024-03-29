import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import introReducer from "./intro"

const store = configureStore({
  reducer: {
    auth: authReducer,
    intro: introReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
