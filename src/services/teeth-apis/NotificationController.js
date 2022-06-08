import {
  ADD_TOKEN_END_POINT,
  NOTIFICATION_END_POINT,
} from "../end-points/NotifcationEndPoint";
import { CallAPI } from "./axiosBase";

export const addFcmToken = (fcmToken) =>
  CallAPI(`${ADD_TOKEN_END_POINT}`, "POST", { fcmToken: fcmToken });

export const getNotifications = () =>
  CallAPI(`${NOTIFICATION_END_POINT}`, "GET");
