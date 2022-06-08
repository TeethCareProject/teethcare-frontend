import { CallAPI } from "./axiosBase";
import { FEEDBACK_END_POINT } from "../end-points/FeedbackEndPoints";

export const getClinicFeedBack = (clinicId) =>
  CallAPI(`${FEEDBACK_END_POINT}/${clinicId}`);
