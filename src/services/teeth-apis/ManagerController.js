import { CallAPI } from "./axiosBase";
import { MANAGER_END_POINT } from "../end-points/RegisterEndPoint";

export const getManagerById = (managerId) =>
  CallAPI(`${MANAGER_END_POINT}/${managerId}`, "GET");
