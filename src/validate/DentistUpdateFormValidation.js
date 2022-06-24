import { REQUIRED_VALIDATOR } from "./GeneralValidation";

export const DentistUpdateFormValidation = {
  note: [REQUIRED_VALIDATOR("Note")],
  serviceIds: [REQUIRED_VALIDATOR("Services")],
};
