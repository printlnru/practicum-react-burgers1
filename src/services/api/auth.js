import { API_BASE_PATH } from "./config";
import { getCookie } from "../../utils/cookie";

const LOGIN_METHOD_NAME = "/auth/login";
const LOGOUT_METHOD_NAME = "/auth/logout";
const REGISTRATION_METHOD_NAME = "/auth/register";
const USER_INFO_METHOD_NAME = "/auth/user";
const FORGOT_PASSWORD_METHOD_NAME = "/password-reset";
const RESET_PASSWORD_METHOD_NAME = "/password-reset/reset";

const REFRESH_TOKEN_METHOD_NAME = "/auth/token";

export const registrationReq = ({ email, password, name }) => {
  return fetch(API_BASE_PATH + REGISTRATION_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.ok) {
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const tokenReq = (token) => {
  return fetch(API_BASE_PATH + REFRESH_TOKEN_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const logoutReq = (token) => {
  return fetch(API_BASE_PATH + LOGOUT_METHOD_NAME, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token }),
  }).then((res) => {
    if (res.ok) {
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
  return fetch(API_BASE_PATH + USER_INFO_METHOD_NAME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};

export const updateUserReq = ({ email, password, name }) => {
  return fetch(API_BASE_PATH + USER_INFO_METHOD_NAME, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};
