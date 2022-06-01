import { CallAPI } from "./axiosBase";

export const getClinicsAPI = () => CallAPI("/clinics", "GET", {});

export const getClinicById = (id) =>
  CallAPI("/clinics/" + id, "GET", {}, { id });

export const filterClinicAPI = (params) =>
  CallAPI("/clinics", "GET", {}, params);
