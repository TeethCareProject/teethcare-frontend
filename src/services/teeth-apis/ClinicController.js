import { CallAPI } from "./axiosBase";
import { CLINIC_END_POINT } from "../end-points/ClinicEndPoints";

export const getClinicsAPI = () => CallAPI(CLINIC_END_POINT, "GET", {});

export const getClinicById = (id) =>
  CallAPI(CLINIC_END_POINT + "/" + id, "GET", {}, { id });

export const filterClinicAPI = (params) =>
  CallAPI(CLINIC_END_POINT, "GET", {}, params);
