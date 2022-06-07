import { CallAPI, CallAPIOutsite } from "./axiosBase";

export const getServiceById = (serviceId) =>
  //TODO: replace later!
  CallAPIOutsite(window.location.origin + "/service-fake-data.json", "GET");
