import { createSlice } from "@reduxjs/toolkit";
import { getNotificationList, initFcmToken } from "./notification.action";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    fcmToken: null,
    isCheckedPermission: false,
    checkResult: false,
    notificationList: [],
  },
  reducers: {
    setFcmToken: (state, action) => {
      return {
        ...state,
        fcmToken: action.payload,
      };
    },
    setNotificationList: (state, action) => {
      return {
        ...state,
        notificationList: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(initFcmToken.fulfilled, (state, action) => {
      return {
        ...state,
        fcmToken: action.payload,
        isCheckedPermission: true,
        checkResult: true,
      };
    });
    builder.addCase(initFcmToken.rejected, (state, action) => {
      return {
        ...state,
        fcmToken: null,
        isCheckedPermission: true,
        checkResult: false,
      };
    });
    builder.addCase(getNotificationList.fulfilled, (state, action) => {
      return {
        ...state,
        notificationList: action.payload,
      };
    });
  },
});

export const authenticationActions = notificationSlice.actions;
export default notificationSlice.reducer;
