import { authenticationActions } from "./authentication.slice";
import Cookies from "js-cookie";

export const loginStorageHandler = (loginData) => {
  return (dispatch) => {
    Cookies.set("token", loginData.token);
    localStorage.setItem("user", JSON.stringify(loginData));
    dispatch(authenticationActions.setUser(loginData));
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    dispatch(authenticationActions.logout());
  };
};
