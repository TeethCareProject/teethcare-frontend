import { DENTIST_END_POINT } from "../end-points/DentistEndPoint";
import { CallAPI } from "./axiosBase";

export const getAllDentists = (options) =>
  CallAPI(`${DENTIST_END_POINT}`, "GET", {}, { size: 6, ...options });
