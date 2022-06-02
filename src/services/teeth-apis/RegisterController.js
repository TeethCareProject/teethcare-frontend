import { CallAPI } from "./axiosBase";

export const patientRegisterAPI = (patientInfo) =>
  CallAPI("/patients", "POST", patientInfo);

export const managerRegisterAPI = (managerInfo) =>
  CallAPI("/managers", "POST", managerInfo);
