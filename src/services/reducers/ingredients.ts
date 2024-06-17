import { TIngredient } from "../../utils/types";
import {
  INGREDIENTS_LOADING,
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOAD_FAILED,
  INGREDIENTS_CHANGE_ACTIVE_TAB,
} from "../actions/ingredients";

type TState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: Array<TIngredient>;
  activeTab: string;
}

const initialState : TState= {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
  activeTab: 'bun',
};

type TActiveTab = 'bun' | 'sauce' | 'main';

type TActionType = {
  type: string;
  ingredients: Array<TIngredient>;
  value: TActiveTab
}

export default function ingredients(state = initialState, action: TActionType) {
  switch (action.type) {
    case INGREDIENTS_LOADING: {
      return {
        ...state,
        //очистим данные
        ingredients: [],
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        ingredientsFailed: false,
        // Запрос начал выполняться
        ingredientsRequest: true,
      };
    }
    case INGREDIENTS_LOAD_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        // Запрос выполнился без ошибок,
        // выставляем соответсвующие значения в хранилище
        ingredientsFailed: false,
        // Запрос закончил своё выполнение
        ingredientsRequest: false,
      };
    }
    case INGREDIENTS_LOAD_FAILED: {
      return {
        ...state,
        //очистим данные
        ingredients: [],
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        ingredientsFailed: true,
        // Запрос закончил своё выполнение
        ingredientsRequest: false,
      };
    }
    case INGREDIENTS_CHANGE_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.value,
      };
    }
    default:
      return state;
  }
}
