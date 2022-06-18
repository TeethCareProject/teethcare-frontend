import { EMAIL_VALIDATOR, REQUIRED_VALIDATOR } from "./GeneralValidation";

export const ProfileValidation = {
  email: [REQUIRED_VALIDATOR("Email"), ...EMAIL_VALIDATOR()],
  username: [REQUIRED_VALIDATOR("Username")],
  firstName: [REQUIRED_VALIDATOR("First name")],
  lastName: [REQUIRED_VALIDATOR("Last name")],
  phone: [REQUIRED_VALIDATOR("Phone number")],
  gender: [REQUIRED_VALIDATOR("Gender")],
  specialization: [REQUIRED_VALIDATOR("Specialization")],
  description: [REQUIRED_VALIDATOR("Description")],
  dateOfBirth: [
    REQUIRED_VALIDATOR("Date of birth"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || value.valueOf() < Date.now().valueOf())
          return Promise.resolve();

        return Promise.reject(new Error("Invalid date of birth"));
      },
    }),
  ],
};
