import { combineReducers } from '@reduxjs/toolkit'
import ingredients from './ingredients'
import constructor from './constructor'
import currentIngredient from './current-ingredient'
import order from './order'

export default combineReducers({
    ingredients, //список всех полученных ингредиентов
    constructor, //список всех ингредиентов в текущем конструкторе бургера
    currentIngredient, //объект текущего просматриваемого ингредиента
    order //объект созданного заказа
});