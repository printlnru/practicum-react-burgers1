import construct, { TState } from "./order";
import {
  
  TIngredient,
  TIngredientBunType,
  TOrder,
} from "../../utils/types";
import * as T from "../actions/order";

const testItem: TIngredient = {
  _id: "ingredient_id",
  calories: 123,
  carbohydrates: 234,
  fat: 345,

  image: "string",
  image_large: "string",
  image_mobile: "string",

  name: "Ingredient name",
  price: 100,
  proteins: 200,
  type: TIngredientBunType,
};

const testOrder: TOrder = {
    createdAt:  new Date("2024-06-19T10:11:12.134Z"),
    ingredients: [],
    name: "бургер",
    number: 54321,
    owner: "any",
    price: 12345,
    status: "done",
    updatedAt: new Date("2024-06-19T10:11:12.134Z"),
    _id: "order_id",
}

const initialState: TState = {
  ingredients: [],
  inProgress: false,
  successStatus: false,
  failedStatus: false,
  order: null,
};

describe("test order reducer", () => {
  it("check ORDER_CREATE", () => {
    const expected: TState = { ...initialState, ingredients: [testItem] };
    const received = construct(
      { ...initialState, ingredients: [testItem] },
      {
        type: T.ORDER_CREATE,
        ingredients: [testItem],
      }
    );
    expect(received).toEqual(expected);
  });

  it("check ORDER_INPROGRESS", () => {
    const expected: TState = {
      ingredients: [],
      inProgress: true,
      failedStatus: false,
      successStatus: false,
      order: null,
    };
    const received = construct(initialState, {
      type: T.ORDER_INPROGRESS,
    });
    expect(received).toEqual(expected);
  });

  it("check ORDER_SUCCESS", () => {
    const expected: TState = {
      ingredients: [],
      inProgress: false,
      failedStatus: false,
      successStatus: true,
      order: testOrder,
    };
    const received = construct(initialState, {
      type: T.ORDER_SUCCESS,
      order: testOrder
    });
    expect(received).toEqual(expected);
  });

  it("check ORDER_FAILED", () => {
    const expected: TState = {...initialState,
      failedStatus: true,
    };
    const received = construct(initialState, {
      type: T.ORDER_FAILED,
      order: testOrder
    });
    expect(received).toEqual(expected);
  });

  it("check ORDER_CLOSE", () => {
    const expected: TState = initialState;
    const received = construct({...initialState, order: testOrder}, {
      type: T.ORDER_CLOSE,
      order: testOrder
    });
    expect(received).toEqual(expected);
  });
});
