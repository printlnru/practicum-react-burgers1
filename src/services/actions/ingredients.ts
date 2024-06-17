import { AppDispatch } from "../..";
import { checkResponse } from "../../utils/check-response";

export const INGREDIENTS_LOADING = "INGREDIENTS_LOADING";
export const INGREDIENTS_LOAD_SUCCESS = "INGREDIENTS_LOAD_SUCCESS";
export const INGREDIENTS_LOAD_FAILED = "INGREDIENTS_LOAD_FAILED";

export const INGREDIENTS_CHANGE_ACTIVE_TAB = "INGREDIENTS_CHANGE_ACTIVE_TAB";

const API_BASE_PATH = "https://norma.nomoreparties.space/api";
const INGREDIENTS_METHOD_NAME = "/ingredients";

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INGREDIENTS_LOADING,
    });

    fetch(API_BASE_PATH + INGREDIENTS_METHOD_NAME)
      .then(checkResponse)
      .then((data) =>
        dispatch({
          type: INGREDIENTS_LOAD_SUCCESS,
          ingredients: data.data,
        })
      )
      .catch((e) => {
        dispatch({
          type: INGREDIENTS_LOAD_FAILED,
        });
      });
  };
}
