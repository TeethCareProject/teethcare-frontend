import { messaging } from "../../services/firebase/firebase-init";
import { getToken } from "firebase/messaging";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initFcmToken = createAsyncThunk(
  "notification/initFcmToken",
  async (thunkAPI) => {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_CLOUD_MESSAGE_KEY,
    });

    return currentToken;
  }
);
