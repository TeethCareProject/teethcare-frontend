import { CallAPI } from "./axiosBase";
import {
  PATIENT_END_POINT,
  MANAGER_END_POINT,
} from "../end-points/RegisterEndPoint";

export const patientRegister = (patientInfo) =>
  CallAPI(`${PATIENT_END_POINT}`, "POST", patientInfo);

export const managerRegister = (managerInfo) =>
  CallAPI(`${MANAGER_END_POINT}`, "POST", managerInfo);
