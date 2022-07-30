import useSWR from "swr";
import { CallAPI } from "../services/teeth-apis/axiosBase";

export const useSWRFetch = (
  endpoint,
  params = {},
  configHeaders = null,
  responseType = null,
  refreshInterval = 1000
) => {
  const { data, error } = useSWR(
    endpoint,
    (endpoint) =>
      CallAPI(endpoint, "GET", {}, params, configHeaders, responseType),
    {
      refreshInterval: refreshInterval,
    }
  );

  return {
    response: data,
    isLoading: !error && !data,
    isError: error,
  };
};
