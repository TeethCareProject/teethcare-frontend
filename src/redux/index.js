import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authentication.slice";
import notificationSlice from "./notification/notification.slice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
