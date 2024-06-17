import { TIngredient } from "../../utils/types";
import {
  CURRENT_INGREDIENTS_LOAD,
  CURRENT_INGREDIENTS_LOAD_AS_PAGE,
  CURRENT_INGREDIENTS_UNLOAD,
} from "../actions/current-ingredient";

type TState = {
  ingredient: TIngredient | null;
  visible: boolean;
};

const initialState: TState = {
  ingredient: null,
  visible: false,
};

type TActionType = {
  type: string;
  value: TIngredient;
}

export default function currentIngredient(state = initialState, action: TActionType) {
  switch (action.type) {
    case CURRENT_INGREDIENTS_LOAD: {
      return { ingredient: action.value, visible: true };
    }
    case CURRENT_INGREDIENTS_LOAD_AS_PAGE: {
      return { ingredient: action.value, visible: false };
    }
    case CURRENT_INGREDIENTS_UNLOAD: {
      return { ingredient: null, visible: false };
    }
    default:
      return state;
  }
}
