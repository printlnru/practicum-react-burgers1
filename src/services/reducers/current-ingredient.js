import {
  CURRENT_INGREDIENTS_LOAD,
  CURRENT_INGREDIENTS_UNLOAD
} from '../actions/current-ingredient';

const initialState = {
  ingredient: null,
  visible: false
};

export default function currentIngredient(state = initialState, action) {
  switch (action.type) {
    case CURRENT_INGREDIENTS_LOAD: {
      return { ingredient: action.value, visible: true }
    }
    case CURRENT_INGREDIENTS_UNLOAD: {
      return { ingredient: null, visible: false }
    }
    default:
      return state
  }
}