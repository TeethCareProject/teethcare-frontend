import { convertMomentToDate } from "../utils/convert.utils";
import { REQUIRED_VALIDATOR } from "./GeneralValidation";

const VoucherValidation = {
  voucherCode: [REQUIRED_VALIDATOR("voucherCode")],
  quantity: [
    ({ getFieldValue }) => ({
      validator(_, value) {
        if ((value && value?.length > 0) || getFieldValue("expiredTime")) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Quantity or expired time should be filled")
        );
      },
    }),
  ],
  discountValue: [REQUIRED_VALIDATOR("discountValue")],
  expiredTime: [
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (
          (getFieldValue("quantity") &&
            getFieldValue("quantity")?.length > 0) ||
          (value && convertMomentToDate(value) > Date.now())
        ) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Expired date should be from tomorrow")
        );
      },
    }),
  ],
};

export default VoucherValidation;
