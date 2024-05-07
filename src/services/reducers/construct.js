import { v4 as uuidv4 } from "uuid";

import {
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_RESORT,
} from "../actions/constructor";

import { ORDER_CLOSE } from "../actions/order";

const initialState = {
  bun: null,
  ingredients: [],
};

export default function construct(state = initialState, action) {
  switch (action.type) {
    case CONSTRUCTOR_ADD_ITEM: {
      if (action.item.type === "bun")
        return {
          ...state,
          bun: action.item,
        };
      else
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            {
              ...action.item,
              uid: uuidv4(),
            },
          ],
        };
    }
    case CONSTRUCTOR_DELETE_ITEM: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item) => item.uid !== action.uid
        ),
      };
    }
    case CONSTRUCTOR_RESORT: {
      return {
        ...state,
        ingredients: [...action.value],
      };
    }

    case ORDER_CLOSE: {
      return {
        ...state,
        ingredients: [],
        bun: null,
      };
    }
    default:
      return state;
  }
}
