import { v4 as uuidv4 } from "uuid";

import {
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_RESORT,
} from "../actions/constructor";

import { ORDER_CLOSE } from "../actions/order";
import { TIngredient, TIngredientWithUid } from "../../utils/types";

export type TState = {
  bun: TIngredient | null;
  ingredients: Array<TIngredientWithUid>
}

const initialState : TState = {
  bun: null,
  ingredients: [],
};

type TActionType = {
  type: 'CONSTRUCTOR_ADD_ITEM' | 'CONSTRUCTOR_DELETE_ITEM' | 'CONSTRUCTOR_RESORT' | 'ORDER_CLOSE';
  item: TIngredient;
  uid?: string;
  value?: Array<TIngredientWithUid>;
}

export default function construct(state : TState = initialState, action: TActionType) {
  switch (action.type) {
    case CONSTRUCTOR_ADD_ITEM: {
      if (action.item?.type === "bun")
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
          (item: TIngredientWithUid) => item.uid !== action.uid
        ),
      };
    }
    case CONSTRUCTOR_RESORT: {
      return {
        ...state,
        ingredients: [...action.value??[]],
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
