import { REQUIRED_VALIDATOR } from "./GeneralValidation";
import { convertMomentToDate } from "../convert.utils/";

export const BookingServiceFormValidation = {
  desiredCheckingTime: [
    REQUIRED_VALIDATOR("Desire checking time"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || convertMomentToDate(value) > Date.now()) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Booking date should be from tomorow"));
      },
    }),
  ],
  description: [REQUIRED_VALIDATOR("Description")],
};
