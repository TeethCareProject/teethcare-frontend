import { REQUIRED_VALIDATOR } from "./GeneralValidation";
import { checkAvailableTime } from "../services/teeth-apis/BookingController";
import { convertMomentToDate } from "../utils/convert.utils";

export const BookingServiceFormValidation = {
  desiredCheckingTime: [
    REQUIRED_VALIDATOR("Desire checking time"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const clinicId = getFieldValue("clinicId");
        const handleCheckAvailableTime = async () => {
          try {
            await checkAvailableTime(clinicId, value.valueOf());
            return Promise.resolve();
          } catch (e) {
            return Promise.reject(new Error("You can't book at this time"));
          }
        };

        if (!value || convertMomentToDate(value) > Date.now()) {
          return handleCheckAvailableTime();
        } else {
          return Promise.reject(
            new Error("Booking date should be from tomorow")
          );
        }
      },
    }),
    ,
  ],
  description: [REQUIRED_VALIDATOR("Description")],
};
