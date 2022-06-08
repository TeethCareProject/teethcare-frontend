import { LOGIN_END_POINT } from "../end-points/AuthEndPoints";
import { CallAPI } from "./axiosBase";

export const loginAPI = (username, password) =>
  CallAPI(`${LOGIN_END_POINT}`, "POST", { username, password });
