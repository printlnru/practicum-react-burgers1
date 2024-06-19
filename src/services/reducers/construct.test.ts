import construct, { TState } from "./construct";
import { TIngredient, TIngredientBunType, TIngredientMainType, TIngredientSauceType, TIngredientWithUid, TUser } from "../../utils/types";
import * as T from "../actions/constructor";

const testAbstractItem  = {
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
  };

const testAddItemBun: TIngredient = {...testAbstractItem,  type: TIngredientBunType};
const testAddItemSauce: TIngredient = {...testAbstractItem,  type: TIngredientSauceType};
const testAddItemMain: TIngredient = {...testAbstractItem,  type: TIngredientMainType};

const testAddItemSauceWithUid: TIngredientWithUid = {...testAddItemSauce,  uid: "123456789"};
const testAddItemMainWithUid: TIngredientWithUid = {...testAddItemMain,  uid: "123456789"};


const initialState: TState = {
  bun: null,
  ingredients: [],
};

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe("test construct reducer", () => {
  it("check CONSTRUCTOR_ADD_ITEM_BUN", () => {
    const expected : TState= {
        bun: testAddItemBun,
        ingredients: [],
    };
    const received = construct(initialState, {
      type: T.CONSTRUCTOR_ADD_ITEM,
      item: testAddItemBun,
    });
    expect(received).toEqual(expected);
  });

  it("check CONSTRUCTOR_ADD_ITEM_MAIN", () => {
    const expected : TState= {
        bun: null,
        ingredients: [testAddItemMainWithUid],
    };
    const received = construct(initialState, {
      type: T.CONSTRUCTOR_ADD_ITEM,
      item: testAddItemMain,
    });
    expect(received).toEqual(expected);
  });

  it("check CONSTRUCTOR_ADD_ITEM_SAUCE", () => {
    const expected : TState= {
        bun: null,
        ingredients: [testAddItemSauceWithUid],
    };
    const received = construct(initialState, {
      type: T.CONSTRUCTOR_ADD_ITEM,
      item: testAddItemSauce,
    });
    expect(received).toEqual(expected);
  });


  it("check CONSTRUCTOR_DELETE_ITEM", () => {
    const expected : TState= {
        bun: null,
        ingredients: [],
    };
    const received = construct({...initialState, ingredients: [testAddItemSauceWithUid]}, {
      type: T.CONSTRUCTOR_DELETE_ITEM,
      uid: "123456789",
    });
    expect(received).toEqual(expected);
  });



  it("check CONSTRUCTOR_RESORT", () => {
    const expected : TState= {
        bun: null,
        ingredients: [testAddItemSauceWithUid, testAddItemMainWithUid],
    };
    const received = construct({...initialState, ingredients: [testAddItemSauceWithUid]}, {
      type: T.CONSTRUCTOR_RESORT,
      value: [testAddItemSauceWithUid, testAddItemMainWithUid],
    });
    expect(received).toEqual(expected);
  });
});
