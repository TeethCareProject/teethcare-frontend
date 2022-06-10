import { CallAPI } from "./axiosBase";
import { FEEDBACK_END_POINT } from "../end-points/FeedbackEndPoints";

export const getClinicFeedBack = (clinicId, options) =>
  CallAPI(`${FEEDBACK_END_POINT}/${clinicId}`, "GET", {}, { ...options });

export const getFeedbackById = (feedbackId) =>
  CallAPI(`${FEEDBACK_END_POINT}/${feedbackId}`);
