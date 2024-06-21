import ingredients, { TState } from "./ingredients";
import {
  TActiveTabBunType,
  TActiveTabMainType,
  TIngredient,
  TIngredientBunType,
} from "../../utils/types";
import * as T from "../actions/ingredients";

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

const initialState: TState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
  activeTab: TActiveTabBunType,
};

describe("test ingredients reducer", () => {
  it("check INGREDIENTS_LOADING", () => {
    const expected: TState = {
      ingredientsFailed: false,
      ingredientsRequest: true,
      ingredients: [],
      activeTab: TActiveTabBunType,
    };
    const received = ingredients(
      { ...initialState, ingredients: [testItem] },
      {
        type: T.INGREDIENTS_LOADING,
      }
    );
    expect(received).toEqual(expected);
  });

  it("check INGREDIENTS_LOAD_FAILED", () => {
    const expected: TState = {
      ingredientsFailed: true,
      ingredientsRequest: false,
      ingredients: [],
      activeTab: TActiveTabBunType,
    };
    const received = ingredients(
      { ...initialState, ingredients: [testItem] },
      {
        type: T.INGREDIENTS_LOAD_FAILED,
      }
    );
    expect(received).toEqual(expected);
  });

  it("check INGREDIENTS_LOAD_SUCCESS", () => {
    const expected: TState = {
      ingredientsFailed: false,
      ingredientsRequest: false,
      ingredients: [testItem],
      activeTab: TActiveTabBunType,
    };
    const received = ingredients(initialState, {
      type: T.INGREDIENTS_LOAD_SUCCESS,
      ingredients: [testItem],
    });
    expect(received).toEqual(expected);
  });

  it("check INGREDIENTS_CHANGE_ACTIVE_TAB", () => {
    const expected: TState = { ...initialState, activeTab: TActiveTabMainType };
    const received = ingredients(initialState, {
      type: T.INGREDIENTS_CHANGE_ACTIVE_TAB,
      value: TActiveTabMainType,
    });
    expect(received).toEqual(expected);
  });
});
