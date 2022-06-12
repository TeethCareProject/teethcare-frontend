import { CallAPI } from "./axiosBase";
import { SERVICE_END_POINT } from "../end-points/ServiceEndPoint";

export const getAllServices = (options) =>
  CallAPI(`${SERVICE_END_POINT}`, "GET", {}, options ? { ...options } : {});

export const getServiceById = (serviceId) =>
  CallAPI(`${SERVICE_END_POINT}/${serviceId}`, "GET");

export const updateService = (serviceData) =>
  CallAPI(`${SERVICE_END_POINT}`, "PUT", { ...serviceData });

export const createService = (serviceData) =>
  CallAPI(`${SERVICE_END_POINT}`, "POST", { ...serviceData });

export const deleteService = (serviceId) =>
  CallAPI(`${SERVICE_END_POINT}/${serviceId}`, "DELETE");
