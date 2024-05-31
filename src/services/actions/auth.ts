import { AppDispatch } from "../..";
import {
  registrationReq,
  loginReq,
  logoutReq,
  forgotPasswordReq,
  resetPasswordReq,
  getUserInfoReq,
  updateUserReq,
} from "../api/auth";

export const AUTH_LOGIN_IN_PROGRESS = "AUTH_LOGIN_IN_PROGRESS";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED";

export const AUTH_LOGOUT_IN_PROGRESS = "AUTH_LOGOUT_IN_PROGRESS";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILED = "AUTH_LOGOUT_FAILED";

export const AUTH_REGISTRATION_IN_PROGRESS = "AUTH_REGISTRATION_IN_PROGRESS";
export const AUTH_REGISTRATION_SUCCESS = "AUTH_REGISTRATION_SUCCESS";
export const AUTH_REGISTRATION_FAILED = "AUTH_REGISTRATION_FAILED";

export const AUTH_FORGOT_PASSWORD_IN_PROGRESS =
  "AUTH_FORGOT_PASSWORD_IN_PROGRESS";
export const AUTH_FORGOT_PASSWORD_SUCCESS = "AUTH_FORGOT_PASSWORD_SUCCESS";
export const AUTH_FORGOT_PASSWORD_FAILED = "AUTH_FORGOT_PASSWORD_FAILED";

export const AUTH_RESET_PASSWORD_IN_PROGRESS =
  "AUTH_RESET_PASSWORD_IN_PROGRESS";
export const AUTH_RESET_PASSWORD_SUCCESS = "AUTH_RESET_PASSWORD_SUCCESS";
export const AUTH_RESET_PASSWORD_FAILED = "AUTH_RESET_PASSWORD_FAILED";

export const AUTH_GET_USER_IN_PROGRESS = "AUTH_GET_USER_IN_PROGRESS";
export const AUTH_GET_USER_SUCCESS = "AUTH_GET_USER_SUCCESS";
export const AUTH_GET_USER_FAILED = "AUTH_GET_USER_FAILED";

export const AUTH_UPDATE_USER_IN_PROGRESS = "AUTH_UPDATE_USER_IN_PROGRESS";
export const AUTH_UPDATE_USER_SUCCESS = "AUTH_UPDATE_USER_SUCCESS";
export const AUTH_UPDATE_USER_FAILED = "AUTH_UPDATE_USER_FAILED";

export const registrationAct = (state: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_REGISTRATION_IN_PROGRESS });

    registrationReq(state)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_REGISTRATION_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({ type: AUTH_REGISTRATION_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: AUTH_REGISTRATION_FAILED });
      });
  };
};

export const loginAct = (state: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_LOGIN_IN_PROGRESS });

    loginReq(state)
      .then((res) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          user: res,
        });
      })
      .catch((err) => {
        dispatch({ type: AUTH_LOGIN_FAILED });
      });
  };
};

export const logoutAct = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_LOGOUT_IN_PROGRESS });
    logoutReq()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS,
          });
        } else {
          dispatch({ type: AUTH_LOGOUT_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: AUTH_LOGOUT_FAILED });
      });
  };
};

export const forgotPasswordAct = (state: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_FORGOT_PASSWORD_IN_PROGRESS });
    forgotPasswordReq(state)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({ type: AUTH_FORGOT_PASSWORD_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: AUTH_FORGOT_PASSWORD_FAILED });
      });
  };
};

export const resetPasswordAct = (state: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_RESET_PASSWORD_IN_PROGRESS });
    resetPasswordReq(state)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_RESET_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({ type: AUTH_RESET_PASSWORD_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: AUTH_RESET_PASSWORD_FAILED });
      });
  };
};

export const getUserInfoAct = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_GET_USER_IN_PROGRESS });
    getUserInfoReq()
      .then((res: any) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_GET_USER_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({ type: AUTH_GET_USER_FAILED });
        }
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_GET_USER_FAILED });
      });
  };
};

export const updateUserAct = (state: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AUTH_UPDATE_USER_IN_PROGRESS });
    updateUserReq(state)
      .then((res: any) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_UPDATE_USER_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({ type: AUTH_UPDATE_USER_FAILED });
        }
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_UPDATE_USER_FAILED });
      });
  };
};
