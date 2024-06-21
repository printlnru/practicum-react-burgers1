import currentIngredient, { TState } from "./current-ingredient";
import { TIngredient, TIngredientBunType } from "../../utils/types";
import * as T from "../actions/current-ingredient";

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
  visible: false,
  ingredient: null,
};

describe("test current-ingredient reducer", () => {
  it("check CURRENT_INGREDIENTS_LOAD", () => {
    const expected: TState = {
      visible: true,
      ingredient: testItem,
    };
    const received = currentIngredient(initialState, {
      type: T.CURRENT_INGREDIENTS_LOAD,
      value: testItem,
    });
    expect(received).toEqual(expected);
  });

  it("check CURRENT_INGREDIENTS_LOAD_AS_PAGE", () => {
    const expected: TState = {
      visible: false,
      ingredient: testItem,
    };
    const received = currentIngredient(initialState, {
      type: T.CURRENT_INGREDIENTS_LOAD_AS_PAGE,
      value: testItem,
    });
    expect(received).toEqual(expected);
  });

  it("check CURRENT_INGREDIENTS_UNLOAD", () => {
    const expected: TState = initialState;
    const received = currentIngredient(
      { visible: true, ingredient: testItem },
      { type: T.CURRENT_INGREDIENTS_UNLOAD }
    );
    expect(received).toEqual(expected);
  });
});
