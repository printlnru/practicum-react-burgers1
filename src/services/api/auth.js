import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import merge from "lodash/merge";

import { API_BASE_PATH } from "./config";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

const LOGIN_METHOD_NAME = "/auth/login";
const LOGOUT_METHOD_NAME = "/auth/logout";
const REGISTRATION_METHOD_NAME = "/auth/register";
const USER_INFO_METHOD_NAME = "/auth/user";
const FORGOT_PASSWORD_METHOD_NAME = "/password-reset";
const RESET_PASSWORD_METHOD_NAME = "/password-reset/reset";

const REFRESH_TOKEN_METHOD_NAME = "/auth/token";

const COOKIE_NAME = "token";

const retrieveToken = () => getCookie("token");

const saveToken = (accessToken, refreshToken) => {
  //localStorage.setItem('accessToken', accessToken);
  setCookie("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
const clearToken = () => {
  //localStorage.removeItem('accessToken');
  deleteCookie("token");
  localStorage.removeItem("refreshToken");
};

const refreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return fetch(API_BASE_PATH + REFRESH_TOKEN_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((res) => {
      if (res && res.success) {
        let accessToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        saveToken(accessToken, refreshToken);
        return res.user;
      }
      else{
        return Promise.reject(res.status);
      }
    })

    .catch((error) => {
      // Clear token and continue with the Promise catch chain
      clearToken();
      throw error;
    });
};

const shouldRefreshToken = (error) => {
  var rv =
    error.response.status === 403 &&
    error.body.success === false &&
    error.body.message === "jwt expired";
  return rv;
};

const fetchJSONWithToken = (url, options = {}) => {
  const token = retrieveToken();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return fetchJSON(url, optionsWithToken);
};

const refreshedFetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken,
});

export const registrationReq = ({ email, password, name }) => {
  return fetch(API_BASE_PATH + REGISTRATION_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.ok) {
      let accessToken = res.accessToken.split("Bearer ")[1];
      let refreshToken = res.refreshToken;
      saveToken(accessToken, refreshToken);
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const loginReq = ({ email, password }) => {
  return fetch(API_BASE_PATH + LOGIN_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((res) => {
      if (res && res.success) {
        let accessToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        saveToken(accessToken, refreshToken);
        return res.user;
      }
      else{
        return Promise.reject(res.status);
      }
    });
};

export const logoutReq = () => {
  let token = localStorage.getItem("refreshToken");
  return fetch(API_BASE_PATH + LOGOUT_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token }),
  }).then((res) => {
    if (res.ok) {
      clearToken();
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const forgotPasswordReq = ({ email }) => {
  return fetch(API_BASE_PATH + FORGOT_PASSWORD_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const resetPasswordReq = ({ password, token }) => {
  return fetch(API_BASE_PATH + RESET_PASSWORD_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password, token }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const getUserInfoReq = () => {
  return refreshedFetch(API_BASE_PATH + USER_INFO_METHOD_NAME, {
    method: "GET"
  }).then((res) => {
    if (res.body.success) {
      return res.body;
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const updateUserReq = ({ email, password, name }) => {
  return refreshedFetch(API_BASE_PATH + USER_INFO_METHOD_NAME, {
    method: "PATCH",
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.body.success) {
      return res.body;
    } else {
      return Promise.reject(res.status);
    }
  });
};
