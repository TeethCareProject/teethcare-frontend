import { CallAPI } from "./axiosBase";
import { CLINIC_END_POINT } from "../end-points/ClinicEndPoints";

export const getClinics = () => CallAPI(`${CLINIC_END_POINT}`, "GET", {});

export const getClinicById = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}`, "GET", {}, { clinicId });

export const filterClinic = (option) =>
  CallAPI(`${CLINIC_END_POINT}`, "GET", {}, option);
