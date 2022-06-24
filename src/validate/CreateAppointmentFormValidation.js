import { REQUIRED_VALIDATOR } from "./GeneralValidation";
import { convertMomentToDate } from "../utils/convert.utils";

export const CreateAppointmentFormValidation = {
  note: [REQUIRED_VALIDATOR("Note")],
  appointmentDate: [
    REQUIRED_VALIDATOR("Appointment day"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || convertMomentToDate(value) > Date.now()) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Appointment date should be from tomorrow")
        );
      },
    }),
  ],
};
