import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authentication.slice";
import clinicReducer from "./clinic/clinic.slice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    clinics: clinicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
