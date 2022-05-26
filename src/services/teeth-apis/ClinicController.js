import { CallAPI } from "./axiosBase";

export const getClinicsAPI = () => CallAPI("/clinics", "GET");
