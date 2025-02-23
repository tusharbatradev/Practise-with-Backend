import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
