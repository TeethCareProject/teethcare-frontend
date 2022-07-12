import {
  EMAIL_VALIDATOR,
  REQUIRED_VALIDATOR,
  MAX_LENGTH_VALIDATOR,
} from "./GeneralValidation";

import { checkTimeOverlapped } from "../utils/convert.utils";

export const UserRegisterValidation = {
  email: [REQUIRED_VALIDATOR("Email"), ...EMAIL_VALIDATOR()],
  username: [REQUIRED_VALIDATOR("Username")],
  firstName: [REQUIRED_VALIDATOR("First name")],
  lastName: [REQUIRED_VALIDATOR("Last name")],
  phone: [REQUIRED_VALIDATOR("Phone number")],
  gender: [REQUIRED_VALIDATOR("Gender")],
  specialization: [REQUIRED_VALIDATOR("Specialization")],
  description: [REQUIRED_VALIDATOR("Description")],
  password: [REQUIRED_VALIDATOR("Password")],
  rePassword: [
    REQUIRED_VALIDATOR("Confirm password"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value)
          return Promise.resolve();

        return Promise.reject(
          new Error("Your confirm password does not match")
        );
      },
    }),
  ],
};

export const ClinicRegisterValidation = {
  email: [REQUIRED_VALIDATOR("Email"), ...EMAIL_VALIDATOR()],
  clinicName: [REQUIRED_VALIDATOR("Clinic name")],
  taxId: [REQUIRED_VALIDATOR("Tax ID")],
  address: [
    REQUIRED_VALIDATOR("Address"),
    MAX_LENGTH_VALIDATOR("Address", 300),
  ],
  province: [REQUIRED_VALIDATOR("Province")],
  district: [REQUIRED_VALIDATOR("District")],
  ward: [REQUIRED_VALIDATOR("Ward")],
  phone: [REQUIRED_VALIDATOR("Phone number")],
  password: [REQUIRED_VALIDATOR("Password")],
  rePassword: [
    REQUIRED_VALIDATOR("Confirm password"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value)
          return Promise.resolve();

        return Promise.reject(
          new Error("Your confirm password does not match")
        );
      },
    }),
  ],
  operatingTimeMorning: [
    REQUIRED_VALIDATOR("Morning operating time"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (
          !value ||
          !checkTimeOverlapped(value, getFieldValue("operatingTimeEvening"))
        )
          return Promise.resolve();

        return Promise.reject(new Error("Two time mustn't be overlapped!"));
      },
    }),
  ],
  operatingTimeEvening: [
    REQUIRED_VALIDATOR("Evening operating time"),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (
          !value ||
          !checkTimeOverlapped(getFieldValue("operatingTimeMorning"), value)
        )
          return Promise.resolve();

        return Promise.reject(new Error("Two time mustn't be overlapped!"));
      },
    }),
  ],
};
