import { AppDispatch } from "../..";
import {
  requestWithCheckResponse,
} from "../../utils/check-response";
import { getCookie } from "../../utils/cookie";
import { TIngredient } from "../../utils/types";

export const ORDER_CREATE = "ORDER_CREATE";
export const ORDER_INPROGRESS = "ORDER_INPROGRESS";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_CLOSE = "ORDER_CLOSE";

const ORDER_METHOD_NAME = "/orders";

export function createOrder(ingredients: Array<TIngredient>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_INPROGRESS,
    });

    requestWithCheckResponse(ORDER_METHOD_NAME, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({ ingredients: ingredients }),
    })
      .then((data) => {
        if (data.success) {
          dispatch({
            type: ORDER_SUCCESS,
            order: data.order,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: ORDER_FAILED,
        });
      });
  };
}

export function getOrder(id: number) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_INPROGRESS,
    });

    requestWithCheckResponse(ORDER_METHOD_NAME + "/" + id)
      .then((data) => {
        if (data.success && data.orders && data.orders.length == 1) {
          dispatch({
            type: ORDER_SUCCESS,
            order: data.orders[0],
          });
        } else {
          dispatch({
            type: ORDER_FAILED,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: ORDER_FAILED,
        });
      });
  };
}
