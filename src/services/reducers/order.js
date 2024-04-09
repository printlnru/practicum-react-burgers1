import {
  ORDER_CREATE,
  ORDER_INPROGRESS,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_CLOSE,

} from '../actions/order';

const initialState = {
  ingredients: [],
  inProgress: false,
  successStatus: false,
  failedStatus: false,
  order: null
};

export default function construct(state = initialState, action) {
  switch (action.type) {
    case ORDER_CREATE: {
      return {
        ...state,
        ingredients: action.value
      }
    }
    case ORDER_INPROGRESS: {
      return {
        ...state,
        inProgress: true,
        failedStatus: false,
        successStatus: false
      }
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        successStatus: true,
        inProgress: false,
        failedStatus: false,
        order: action.value
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        failedStatus: true,
        inProgress: false,
        successStatus: false
      }
    }
    case ORDER_CLOSE: {
      return {
        ...state,
        ingredients: [],
        failedStatus: false,
        inProgress: false,
        successStatus: false,
        order: null
      }
    }
    default:
      return state
  }
}