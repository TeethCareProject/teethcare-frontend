import { CallAPI } from "./axiosBase";
import { CLINIC_END_POINT } from "../end-points/ClinicEndPoints";

export const getClinicById = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}`, "GET", {}, { clinicId });

export const getClinics = (option) =>
  CallAPI(`${CLINIC_END_POINT}`, "GET", {}, option);
