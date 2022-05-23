import Cookies from "js-cookie";
import axios from "axios";

export const CallAPI = (
  endpoint,
  method = "GET",
  body = {},
  params = {},
  configHeaders = null,
  responseType = null
) => {
  let token = null;
  const headers = configHeaders
    ? configHeaders
    : {
        "content-type": "application/json",
      };
  token = Cookies.get("user");
  if (token && token !== "undefined") headers.Authorization = `Bearer ${token}`;

  return axios({
    method,
    url: process.env.REACT_APP_API_URL + endpoint,
    headers,
    data: body,
    responseType,
    params,
  });
};

export const CallAPIOutsite = (endpoint, method = "GET", body) => {
  const headers = {
    "content-type": "application/json",
  };

  return axios({
    method,
    url: `${endpoint}`,
    headers,
    data: body,
  });
};
