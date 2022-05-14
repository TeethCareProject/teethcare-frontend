import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    isAuthUser: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || {},
    status: "",
  },
  reducers: {
    fetchingLogin: (state, action) => {
      state = {
        ...state,
        data: [],
        isFetching: true,
      };
    },
    fetchingLoginSuccess: (state, action) => {
      return { ...state, isAuthUser: true, user: action.payload };
    },
    fetchingLoginFailure: (state, action) => {
      state = {
        ...state,
        isFetching: false,
        error: true,
        status: action.data.status,
      };
    },
    logout: (state) => {
      return { ...state, isAuthUser: false, user: {} };
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
