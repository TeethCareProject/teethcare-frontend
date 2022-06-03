import { CallAPI } from "./axiosBase";
import { ACCOUNT_END_POINT } from "../end-points/AccountEndPoint";

export const getAllAccounts = () => CallAPI(`${ACCOUNT_END_POINT}`, "GET");

export const getAccountById = (accountId) =>
  CallAPI(`${ACCOUNT_END_POINT}/${accountId}`, "GET");
