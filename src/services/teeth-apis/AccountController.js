import { CallAPI } from "./axiosBase";

export const getAllAccounts = () => CallAPI("/accounts", "GET");

export const getAccountById = (accountId) =>
  CallAPI("/accounts/" + accountId, "GET");
