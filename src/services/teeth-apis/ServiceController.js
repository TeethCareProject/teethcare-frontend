import { CallAPI } from "./axiosBase";
import { SERVICE_END_POINT } from "../end-points/ServiceEndPoint";

export const getAllServices = (options) =>
  CallAPI(`${SERVICE_END_POINT}`, "GET", {}, options ? { ...options } : {});

export const getServiceById = (serviceId) =>
  CallAPI(`${SERVICE_END_POINT}/${serviceId}`, "GET");
