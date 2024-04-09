import {
  COSTRUCTOR_ADD_ITEM,
  COSTRUCTOR_DELETE_ITEM,
  COSTRUCTOR_RESORT,

} from '../actions/constructor';

const initialState = {
  bun: null,
  ingredients: [
  ]
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export default function construct(state = initialState, action) {
  switch (action.type) {
    case COSTRUCTOR_ADD_ITEM: {

      if (action.item.type === 'bun')
        return {
          ...state,
          bun: action.item
        }
      else
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            {
              ...action.item,
              uid: uuidv4()
            }
          ]
        }
    }
    case COSTRUCTOR_DELETE_ITEM: {
      console.log(state.ingredients);
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item.uid !== action.uid)
      };
    }
    case COSTRUCTOR_RESORT: {
      console.log(action.value);
      return {
        ...state,
        ingredients: [...action.value]
      }

        //ingredients: state.ingredients.filter(item => item.uuid !== action.uuid)
        ;
    }
    default:
      return state
  }
}