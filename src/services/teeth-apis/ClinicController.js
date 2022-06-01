import { CallAPI } from "./axiosBase";

export const getClinicsAPI = () => CallAPI("/clinics", "GET", {});

export const filterClinicAPI = (params) =>
  CallAPI("/clinics", "GET", {}, params);
