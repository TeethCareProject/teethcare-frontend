import { CallAPI } from "./axiosBase";
import { FEEDBACK_END_POINT } from "../end-points/FeedbackEndPoints";

export const getClinicFeedBackAPI = (id) =>
  CallAPI(FEEDBACK_END_POINT + "/" + id);
