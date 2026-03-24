const baseApi = import.meta.env.VITE_MAIN_API;

import Axios from "axios";

import { getCredentials } from "@/common";

export const endpoints: Record<string, string> = Object.freeze({
  default: "https://api-stg.qidient.com/api",
  development: "https://api-stg.qidient.com/api",
  staging: "https://api-stg.qidient.com/api",
  production: "https://api.qidient.com/api",
});

const mode: string = import.meta.env.MODE;

export const getApiEndpoint = () => {
  const baseUrl =
    endpoints[mode] || import.meta.env.VITE_MAIN_API || endpoints["default"];

  return baseUrl;
};

const AxiosInstance = Axios.create({
  baseURL: getApiEndpoint(),
});

const getAuthHeaders = () => {
  const { token, uid } = getCredentials();

  return {
    "x-uid": uid,
    Authorization: `Bearer ${token}`,
  };
};

AxiosInstance.interceptors.request.use(
  (config) => {
    const headers = getAuthHeaders();

    if (headers["x-uid"]) {
      config.headers["x-uid"] = headers["x-uid"];
    }
    if (headers["Authorization"]) {
      config.headers["Authorization"] = headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    const { status, data } = response;

    if (data.isError && !((status >= 200 && status < 300) || status === 404)) {
      return Promise.reject(
        response?.data?.message ?? "There was a fatal error from our end.",
      );
    }

    return data?.data ?? [];
  },
  (error) => {
    if (error.response) {
      const { status, statusText, data } = error.response;

      if (status === 401) {
        return Promise.reject("Unauthorized");
      }
      if (data) {
        return Promise.reject(data?.message ?? statusText);
      }

      return Promise.reject("Error from axios interceptor");
    }

    return Promise.reject(error.message ?? "Timeout exceeded");
  },
);

export { baseApi };

export default AxiosInstance;
