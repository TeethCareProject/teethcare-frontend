import { createSlice } from "@reduxjs/toolkit";
import { getNotificationList, initFcmToken } from "./notification.action";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    fcmToken: null,
    isCheckedPermission: false,
    checkResult: false,
    notificationList: [],
    page: 0,
    totalElements: 0,
    totalPages: 0,
    totalMarkAsUnread: 0,
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
    setPage: (state, action) => {
      return {
        ...state,
        page: state.page + action.payload,
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
      const { payload } = action;
      return {
        ...state,
        notificationList: {
          ...payload.notificationList,
        },
        totalMarkAsUnread: payload.totalMarkAsUnread,
      };
    });
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
