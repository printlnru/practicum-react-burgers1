import React from "react";
import PropTypes from "prop-types";
import ingredientType from "../../../../utils/types";

import { useDrag } from "react-dnd";

import { Link } from "react-router-dom";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./item-ingredient.module.css";

import { useSelector, useDispatch } from "react-redux";

export default function ItemIngredient({ item }) {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  const count = useSelector((store) =>
    item.type === "bun"
      ? store.construct.bun && store.construct.bun._id === item._id
        ? 2
        : 0
      : store.construct.ingredients.filter((e) => e._id === item._id).length
  );

  return (
    <Link
      className={style.article}
      to={`/ingredients/${item._id}`}
      state={{background: true}}
    >
      <div className={style.item} ref={dragRef}>
        {count > 0 && (
          <div className={style.counter}>
            <Counter count={count} size="default" extraClass="m-1" />
          </div>
        )}
        <img src={item.image} alt={item.image} className="pl-4 pr-4" />
        <span className={style.currencyContainer}>
          <span className="text text_type_digits-default pr-2 pt-1">
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </span>
        <div className={style.name}>
          <span className="text text_type_main-default">{item.name}</span>
        </div>
      </div>
    </Link>
  );
}

ItemIngredient.propTypes = {
  item: ingredientType.isRequired,
};
