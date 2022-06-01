import { CallAPI } from "./axiosBase";

export const getAllServices = () => CallAPI("/services", "GET");
