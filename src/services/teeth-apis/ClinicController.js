import { CallAPI } from "./axiosBase";
import { CLINIC_END_POINT } from "../end-points/ClinicEndPoints";

export const getClinicById = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}`, "GET", {}, { clinicId });

export const getClinics = (option) =>
  CallAPI(`${CLINIC_END_POINT}`, "GET", {}, option);

export const updateClinic = (data) =>
  CallAPI(`${CLINIC_END_POINT}`, "PUT", { ...data });

export const updateClinicImage = (image) =>
  CallAPI(`${CLINIC_END_POINT}/update-image`, "PUT", image);

export const approveClinic = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}/approve`, "PUT");

export const rejectClinic = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}/reject`, "PUT");

export const getFacebookPageIdByClinicId = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}/facebookPageId`, "GET");
