import { messaging } from "../../services/firebase/firebase-init";
import { getToken } from "firebase/messaging";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/teeth-apis/NotificationController";

export const initFcmToken = createAsyncThunk(
  "notification/initFcmToken",
  async (thunkAPI) => {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_CLOUD_MESSAGE_KEY,
    });

    return currentToken;
  }
);

export const getNotificationList = createAsyncThunk(
  "notification/getNotificationList",
  async (options, thunkAPI) => {
    const data = (await getNotifications({ ...options })).data;
    return {
      notificationList: data.notificationStores,
      totalMarkAsUnread: data.numsOfUnread,
    };
  }
);
