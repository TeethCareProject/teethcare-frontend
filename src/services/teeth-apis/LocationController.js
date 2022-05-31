import { CallAPI } from "./axiosBase";

export const getLocationApi = () => CallAPI("/provinces", "GET");
