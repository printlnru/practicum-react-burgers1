import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerConstructorItem} from "./burger-constructor-item/burger-constructor-item";

import { useCallback } from "react";

import style from "./burger-constructor.module.css";

import TotalBlock from "./total-block/total-block";

import { useDrop } from "react-dnd";

import { CONSTRUCTOR_ADD_ITEM } from "../../services/actions/constructor";
import update from "immutability-helper";

import { CONSTRUCTOR_RESORT } from "../../services/actions/constructor";
import { useAppDispatch, useAppSelector } from "../..";
import { TMoveCardCallback, TIngredient, TIngredientWithUid } from "../../utils/types";

export default function BurgerConstructor() {
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item: TIngredient) => {
    dispatch({ type: CONSTRUCTOR_ADD_ITEM, item });
  };
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector((store) => store.construct);

  const moveCard = useCallback<TMoveCardCallback>(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = ingredients[dragIndex];
      dispatch({
        type: CONSTRUCTOR_RESORT,
        value: update(ingredients, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      });
    },
    [ingredients]
  );

  const renderCard = (card: TIngredientWithUid, index: number) => {
    return (
      <BurgerConstructorItem
        key={card.uid}
        index={index}
        item={card}
        moveCard={moveCard}
        //id={undefined}
      />
    );
  };

  return (
    <section ref={dropTarget}>
      {/* top bread */}
      {!bun && (
        <div className={style.top}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Выбирай булку и другие приколюхи..."
            price={0}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>
      )}

      {bun && (
        <div className={style.top}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      
      {/* filling (with scroll) */}
      {/* не понятно как сделать скролл как в макете */}
      <ul className={style.ulstyle}>
        {ingredients && ingredients.map(renderCard)}
        {!ingredients && (
          <li className={style.item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="А сюда начинку и не забудь про соус"
              price={0}
              thumbnail={"https://code.s3.yandex.net/react/code/sauce-03.png"}
            />
          </li>
        )}
      </ul>
      {/* bottom bread */}
      {bun && (
        <div className={style.bottom}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <TotalBlock />
    </section>
  );
}
