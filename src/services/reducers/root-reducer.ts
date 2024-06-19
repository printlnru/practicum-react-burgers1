import { combineReducers } from "@reduxjs/toolkit";
import ingredients from "./ingredients";
import construct from "./construct";
import currentIngredient from "./current-ingredient";
import order from "./order";
import auth from "./auth";
import {wsReducer} from "./ws-reducer";

export default combineReducers({
  ingredients, //список всех полученных ингредиентов
  construct, //список всех ингредиентов в текущем конструкторе бургера
  currentIngredient, //объект текущего просматриваемого ингредиента
  order, //объект созданного заказа
  auth,
  wsReducer
});
