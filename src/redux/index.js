import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authentication.slice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
