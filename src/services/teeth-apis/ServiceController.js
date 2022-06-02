import RoutePath from "../../routers/Path";
import { CallAPI } from "./axiosBase";

export const getAllServices = () => CallAPI("/services", "GET");

export const getServiceById = (serviceId) =>
  CallAPI(RoutePath.SERVICE_ENDPOINT + "/" + serviceId, "GET");
