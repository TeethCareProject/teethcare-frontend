import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "notification",
  initialState: {
    fcmToken: null,
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
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
