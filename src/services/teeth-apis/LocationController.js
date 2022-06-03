import { CallAPI } from "./axiosBase";
import { LOCATION_END_POINT } from "../end-points/LocationEndPoints";

export const getLocationApi = () => CallAPI(LOCATION_END_POINT, "GET");
