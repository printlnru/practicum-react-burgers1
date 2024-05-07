import {
  registrationReq,
  loginReq,
  logoutReq,
  forgotPasswordReq,
  resetPasswordReq,
  getUserInfoReq,
  tokenReq,
  updateUserReq,
} from "../api/auth";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

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

export const registrationAct = (state) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REGISTRATION_IN_PROGRESS });

    registrationReq(state)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;

          //localStorage.setItem('accessToken', accessToken);
          setCookie("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

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

export const loginAct = (state) => {
  return function (dispatch) {
    dispatch({ type: AUTH_LOGIN_IN_PROGRESS });

    loginReq(state)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;

          //localStorage.setItem('accessToken', accessToken);
          setCookie("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({ type: AUTH_LOGIN_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: AUTH_LOGIN_FAILED });
      });
  };
};

export const logoutAct = () => {
  return function (dispatch) {
    dispatch({ type: AUTH_LOGOUT_IN_PROGRESS });

    let rToken = localStorage.getItem("refreshToken");

    logoutReq(rToken)
      .then((res) => {
        if (res && res.success) {
          //localStorage.removeItem('accessToken');
          deleteCookie("token");
          localStorage.removeItem("refreshToken");
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

export const forgotPasswordAct = (state) => {
  return function (dispatch) {
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

export const resetPasswordAct = (state) => {
  return function (dispatch) {
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

export const getUserInfoAct = (second) => {
  return function (dispatch) {
    console.log("start. second = ", second);
    dispatch({ type: AUTH_GET_USER_IN_PROGRESS });
    getUserInfoReq()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_GET_USER_SUCCESS,
            user: res.user,
          });
        } else {
          //dispatch({ type: AUTH_GET_USER_FAILED });
        }
      })
      .catch((err) => {
        if (err === 403) {
          if (second == true) {
            console.log("second = true");
            dispatch({ type: AUTH_GET_USER_FAILED });
          } else {
            console.log("update token need...");
            console.log(second);
            tokenReq(localStorage.getItem("refreshToken"))
              .then((res) => {
                if (res && res.success) {
                  const accessToken = res.accessToken.split("Bearer ")[1];
                  const refreshToken = res.refreshToken;

                  //localStorage.setItem('accessToken', accessToken);
                  setCookie("token", accessToken);
                  localStorage.setItem("refreshToken", refreshToken);

                  getUserInfoAct(true);
                } else {
                  dispatch({ type: AUTH_GET_USER_FAILED });
                }
              })
              .catch((err) => {
                dispatch({ type: AUTH_GET_USER_FAILED });
              });
          }
        }
        //dispatch({ type: AUTH_GET_USER_FAILED });
      });
  };
};

export const updateUserAct = (state) => {
  return function (dispatch) {
    dispatch({ type: AUTH_UPDATE_USER_IN_PROGRESS });

    console.log(state);
    if (state.password) {
      console.log("1");
    } else {
      console.log("2");
    }
    updateUserReq(state)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: AUTH_UPDATE_USER_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({ type: AUTH_UPDATE_USER_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: AUTH_UPDATE_USER_FAILED });
      });
  };
};
