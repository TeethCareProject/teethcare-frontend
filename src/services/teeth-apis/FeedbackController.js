import { CallAPI } from "./axiosBase";

export const getClinicFeedBackAPI = (id) => CallAPI("/feedbacks/" + id);
