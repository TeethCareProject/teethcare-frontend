import { CallAPI, CallAPIOutsite } from "./axiosBase";

export const getAllStaffs = (clinicId) =>
  CallAPI("/clinics/" + clinicId + "/staffs", "GET");

export const getStaffById = () =>
  CallAPIOutsite(window.location.origin + "/staff-fake-data.json", "GET");
