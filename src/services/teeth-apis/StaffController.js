import { CallAPI } from "./axiosBase";

export const getAllStaffs = (clinicId) =>
  CallAPI("/clinics/" + clinicId + "/staffs", "GET");

export const getStaffById = (staffId) => CallAPI("/accounts/" + staffId, "GET");
