"use client";
import axios from "axios";
import Cookies from "js-cookie";
// import { signOutRequest } from "@/store/auth/authSlice";
import momentTimezone from "moment-timezone";
// import {
//   BaseURL,
//   handleDecrypt,
//   handleEncrypt,
//   mediaUrl,
// } from "@/resources/utils/helper";
import RenderToast from "@/component/atoms/RenderToast";
import {
  baseURL,
  handleDecrypt,
  handleEncrypt,
  mediaUrl,
} from "@/resources/utils/helper";

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = handleDecrypt(Cookies.get("_xpdx_rf")); // Assuming the refresh token is stored in cookies
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(mediaUrl("auth/refresh-token"), {
    token: refreshToken,
  });

  const data = response?.data;
  Cookies.set("_xpdx", handleEncrypt(data?.jwtToken));
  Cookies.set("_xpdx_rf", handleEncrypt(data?.refreshToken));

  return data?.jwtToken;
};

const getErrorMsg = (error = null) => {
  const message = error?.response?.data?.message;
  let errorMessage = "";

  if (Array.isArray(message)) {
    errorMessage = message[0];
  } else if (Array.isArray(message?.error) && message?.error[0]) {
    errorMessage = message?.error[0];
  } else {
    errorMessage = message;
  }

  return errorMessage;
};

let handleRequest = async ({
  method = "",
  route = "",
  data = {},
  headers = {},
  dispatch = null,
  showAlert = true,
  isFormData = false,
}) => {
  try {
    const url = baseURL(route);
    const token = Cookies.get("_xpdx");

    const _headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      timezone: momentTimezone.tz.guess(),

      ...(isFormData && {
        "Content-Type": "multipart/form-data",
      }),

      ...(token && {
        Authorization: `Bearer ${handleDecrypt(token)}`,
      }),

      ...headers,
    };

    const response = await axios({
      method,
      url,
      data,
      headers: _headers,
    });

    return { response, error: null };
  } catch (error) {
    const errorMessage = getErrorMsg(error);

    if (showAlert) {
      RenderToast(errorMessage || "An unexpected error occurred.", "error");
    }

    if (error?.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(); // Attempt to refresh token
        headers.Authorization = `Bearer ${newAccessToken}`; // Update headers with new token
        return await axios({ method, url, data, headers }); // Retry the request
      } catch (refreshError) {
        // dispatch(signOutRequest()); for now comment but change after going forward
        Cookies.remove("_xpdx");
        Cookies.remove("_xpdx_rf");
        typeof window !== "undefined" && window.location === "/login";
      }
    }

    return { error, response: null };
  }
};

const Get = ({
  route = "",
  headers = {},
  dispatch = null,
  showAlert = true,
}) => {
  return handleRequest({
    method: "get",
    route,
    headers,
    dispatch,
    showAlert,
  });
};

const Post = ({
  route = "",
  data = {},
  headers = {},
  showAlert = true,
  dispatch = null,
  isFormData = false,
}) => {
  return handleRequest({
    method: "post",
    route,
    data,
    headers,
    dispatch,
    showAlert,
    isFormData,
  });
};

const Patch = ({
  route = "",
  data = {},
  headers = {},
  showAlert = true,
  dispatch = null,
  isFormData = false,
}) => {
  return handleRequest({
    method: "patch",
    route,
    data,
    headers,
    dispatch,
    isFormData,
    showAlert,
  });
};

const Put = ({
  route = "",
  data = {},
  headers = {},
  showAlert = true,
  dispatch = null,
  isFormData = false,
}) => {
  return handleRequest({
    method: "put",
    route,
    data,
    headers,
    dispatch,
    showAlert,
    isFormData,
  });
};

const Delete = ({
  route = "",
  headers = {},
  dispatch = null,
  showAlert = true,
}) => {
  return handleRequest({
    method: "delete",
    route,
    // data,
    headers,
    dispatch,
    showAlert,
  });
};

export { Delete, Get, Patch, Post, Put };
