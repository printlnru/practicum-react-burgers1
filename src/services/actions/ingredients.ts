import { AppDispatch } from "../..";
import {
  requestWithCheckResponse,
} from "../../utils/check-response";

export const INGREDIENTS_LOADING = "INGREDIENTS_LOADING";
export const INGREDIENTS_LOAD_SUCCESS = "INGREDIENTS_LOAD_SUCCESS";
export const INGREDIENTS_LOAD_FAILED = "INGREDIENTS_LOAD_FAILED";

export const INGREDIENTS_CHANGE_ACTIVE_TAB = "INGREDIENTS_CHANGE_ACTIVE_TAB";

const INGREDIENTS_METHOD_NAME = "/ingredients";

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INGREDIENTS_LOADING,
    });

    requestWithCheckResponse(INGREDIENTS_METHOD_NAME)
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
