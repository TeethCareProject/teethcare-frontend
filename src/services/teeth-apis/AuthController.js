import { CallAPI } from "./axiosBase";

export const loginAPI = (username, password) =>
  CallAPI("/auth/login", "POST", { username, password });
