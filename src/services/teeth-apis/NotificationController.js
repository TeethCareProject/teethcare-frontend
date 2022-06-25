import {
  ADD_TOKEN_END_POINT,
  NOTIFICATION_END_POINT,
} from "../end-points/NotifcationEndPoint";
import { CallAPI } from "./axiosBase";

export const addFcmToken = (fcmToken) =>
  CallAPI(`${ADD_TOKEN_END_POINT}`, "POST", { fcmToken: fcmToken });

export const getNotifications = ({ page, size }) =>
  CallAPI(`${NOTIFICATION_END_POINT}`, "GET", {}, { page, size });

export const markNotificationAsRead = (notificationId) =>
  CallAPI(`${NOTIFICATION_END_POINT}/${notificationId}/read`, "PUT");

export const markAllAsRead = () =>
  CallAPI(`${NOTIFICATION_END_POINT}/read`, "PUT");

export const triggerOpenBookingDetail = (bookingId) =>
  CallAPI(`${NOTIFICATION_END_POINT}/bookingDetail/${bookingId}`, "GET");
