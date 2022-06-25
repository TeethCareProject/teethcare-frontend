import { CallAPI } from "./axiosBase";
import { FEEDBACK_END_POINT } from "../end-points/FeedbackEndPoints";

export const getClinicFeedBack = (options) =>
  CallAPI(`${FEEDBACK_END_POINT}`, "GET", {}, { ...options });

export const getFeedbackById = (feedbackId) =>
  CallAPI(`${FEEDBACK_END_POINT}/${feedbackId}`);

export const giveFeedBack = (bookingId, detail, ratingScore) =>
  CallAPI(`${FEEDBACK_END_POINT}`, "POST", { bookingId, detail, ratingScore });
