import { REQUIRED_VALIDATOR } from "./GeneralValidation";
import { convertMomentToDate } from "../convert.utils/";
import { checkAvailableTime } from "../services/teeth-apis/BookingController";

export const BookingServiceFormValidation = {
  desiredCheckingTime: [
    REQUIRED_VALIDATOR("Desire checking time"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const clinicId = getFieldValue("clinicId");
        const handleCheckAvailableTime = async () => {
          try {
            await checkAvailableTime(clinicId, value.valueOf());
            return true;
          } catch (e) {
            return false;
          }
        };

        if (!value || convertMomentToDate(value) > Date.now()) {
          return handleCheckAvailableTime()
            ? Promise.resolve()
            : Promise.reject(new Error("You can't book at this time"));
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
