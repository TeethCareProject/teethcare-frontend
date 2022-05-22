import { authenticationActions } from "./authentication.slice";
import * as cookie from "js-cookie";
import { TOKEN_KEY, USER_STORAGE } from "../../constants/AppConst";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
  }
);

export const SigninHandler = (data) => {
  return async (dispatch) => {
    cookie.set("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(authenticationActions.fetchingLoginSuccess(data));
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    cookie.remove("token");
    localStorage.removeItem("user");
    dispatch(authenticationActions.logout());
  };
};
