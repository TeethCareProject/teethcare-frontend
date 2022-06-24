import { REQUIRED_VALIDATOR } from "./GeneralValidation";
import { convertMomentToDate } from "../utils/convert.utils";

export const BookingFromAppointmentValidation = {
  description: [REQUIRED_VALIDATOR("description")],
  desiredCheckingTime: [
    REQUIRED_VALIDATOR("Desired checking time"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || convertMomentToDate(value) > Date.now()) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Booking date should be from tomorrow")
        );
      },
    }),
  ],
};
