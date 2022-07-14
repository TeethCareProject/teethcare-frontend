import {
  EMAIL_VALIDATOR,
  MAX_LENGTH_VALIDATOR,
  REQUIRED_VALIDATOR,
} from "./GeneralValidation";

export const ClinicProfileValidation = {
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
  bookingGap: [REQUIRED_VALIDATOR("Booking gap")],
  facebookPageId: [REQUIRED_VALIDATOR("Facebook page ID")],
  expiredDay: [REQUIRED_VALIDATOR("Expired booking day")],
};
