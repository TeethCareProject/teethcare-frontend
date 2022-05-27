import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authentication.slice";
import clinicReducer from "./clinic/clinic.slice";
import provinceReducer from "./location/location.slice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    clinics: clinicReducer,
    provinces: provinceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
