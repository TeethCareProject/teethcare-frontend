import { CallAPI } from "./axiosBase";

export const patientRegisterAPI = (values) =>
  CallAPI("/patients", "POST", values);

export const managerRegisterAPI = (values) =>
  CallAPI("/managers", "POST", values);
