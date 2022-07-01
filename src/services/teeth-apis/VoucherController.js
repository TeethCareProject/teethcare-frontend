import { CallAPI } from "./axiosBase";
import { VOUCHER_END_POINT } from "../end-points/VoucherEndPoint";

export const getAllVouchers = (options) =>
  CallAPI(`${VOUCHER_END_POINT}`, "GET", {}, options ? { ...options } : {});

export const getVoucherById = (voucherId) =>
  CallAPI(`${VOUCHER_END_POINT}/${voucherId}`, "GET");

export const updateVoucher = (voucherData) =>
  CallAPI(`${VOUCHER_END_POINT}`, "PUT", { ...voucherData });

export const createVoucher = (voucherData) =>
  CallAPI(`${VOUCHER_END_POINT}`, "POST", { ...voucherData });

export const deleteVoucher = (voucherId) =>
  CallAPI(`${VOUCHER_END_POINT}/${voucherId}`, "DELETE");

export const checkAvailableVoucherCode = (voucherCode, clinicId) =>
  CallAPI(
    `${VOUCHER_END_POINT}/${voucherCode}/check-available`,
    "GET",
    {},
    { clinicId }
  );
