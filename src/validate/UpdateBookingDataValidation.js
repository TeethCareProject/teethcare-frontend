import { REQUIRED_VALIDATOR } from "./GeneralValidation";
import { convertMomentToDate } from "../utils/convert.utils";

export const UpdateBookingDataValidation = {
  dentist: [REQUIRED_VALIDATOR("Dentist")],
  services: [REQUIRED_VALIDATOR("Services")],
  examinationTime: [REQUIRED_VALIDATOR("Examination Time")],
};
