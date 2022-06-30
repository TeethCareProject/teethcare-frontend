import { REQUIRED_VALIDATOR } from "./GeneralValidation";

const ServiceValidation = {
  voucherCode: [REQUIRED_VALIDATOR("voucherCode")],
  quantity: [],
  discountValue: [REQUIRED_VALIDATOR("discountValue")],
  expiredTime: [],
};

export default ServiceValidation;
