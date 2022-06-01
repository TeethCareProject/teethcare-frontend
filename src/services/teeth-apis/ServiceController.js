import { CallAPI } from "./axiosBase";

export const getAllServicesAPI = () => CallAPI("/services", "GET");
