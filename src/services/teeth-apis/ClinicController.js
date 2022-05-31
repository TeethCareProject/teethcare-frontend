import { CallAPI } from "./axiosBase";

export const getClinicsAPI = () => CallAPI("/clinics?size=10", "GET");

export const filterClinicAPI = (params) =>
  CallAPI("/clinics", "GET", {}, params);
