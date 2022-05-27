import { CallAPI } from "./axiosBase";

export const getLocationApi = () => CallAPI("/locationmetadata", "GET");
