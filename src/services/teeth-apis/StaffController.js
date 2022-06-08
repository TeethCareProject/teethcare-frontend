import { ACCOUNT_END_POINT } from "../end-points/AccountEndPoints";
import { CLINIC_END_POINT } from "../end-points/ClinicEndPoints";
import { CallAPI } from "./axiosBase";

export const getAllStaffs = (clinicId) =>
  CallAPI(`${CLINIC_END_POINT}/${clinicId}/staffs`, "GET");

export const getStaffById = (staffId) =>
  CallAPI(`${ACCOUNT_END_POINT}/${staffId}`, "GET");
