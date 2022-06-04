import { CallAPI } from "./axiosBase";
import {
  PATIENT_END_POINT,
  MANAGER_END_POINT,
} from "../end-points/RegisterEndPoint";

import { DENTIST_END_POINT } from "../end-points/DentistEndPoint";
import { CUSTOMER_SERVICE_END_POINT } from "../end-points/CustomerServiceEndPoint";

export const patientRegister = (patientInfo) =>
  CallAPI(`${PATIENT_END_POINT}`, "POST", patientInfo);

export const managerRegister = (managerInfo) =>
  CallAPI(`${MANAGER_END_POINT}`, "POST", managerInfo);

export const dentistCreateAccount = (dentistInfo) =>
  CallAPI(`${DENTIST_END_POINT}`, "POST", dentistInfo);

export const customerServiceCreateAccount = (customerServiceInfo) =>
  CallAPI(`${CUSTOMER_SERVICE_END_POINT}`, "POST", customerServiceInfo);
