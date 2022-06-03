import { CallAPI } from "./axiosBase";
import {
  PATIENT_END_POINT,
  MANAGER_END_POINT,
} from "../end-points/RegisterEndPoint";

export const patientRegisterAPI = (patientInfo) =>
  CallAPI(PATIENT_END_POINT, "POST", patientInfo);

export const managerRegisterAPI = (managerInfo) =>
  CallAPI(MANAGER_END_POINT, "POST", managerInfo);
