import {
  INGREDIENTS_LOADING,
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOAD_FAILED,
  INGREDIENTS_CHANGE_ACTIVE_TAB,
} from "../actions/ingredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
  activeTab: "bun",
};

export default function ingredients(state = initialState, action) {
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
