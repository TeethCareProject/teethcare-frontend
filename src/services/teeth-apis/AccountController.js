import { CallAPI } from "./axiosBase";
import { ACCOUNT_END_POINT } from "../end-points/AccountEndPoints";

export const getAllAccounts = (options) =>
  CallAPI(`${ACCOUNT_END_POINT}`, "GET", {}, options);

export const getAccountById = (accountId) =>
  CallAPI(`${ACCOUNT_END_POINT}/${accountId}`, "GET");

export const setAccountStatus = (status, accountId) =>
  CallAPI(`${ACCOUNT_END_POINT}/${accountId}`, "PUT", status);

export const updateProfile = (accountData) =>
  CallAPI(`${ACCOUNT_END_POINT}`, "PUT", accountData);

export const updateImageProfile = (image) =>
  CallAPI(`${ACCOUNT_END_POINT}/update-image`, "PUT", image);
