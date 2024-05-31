import React from "react";

import { ItemIngredient } from "./item-ingredient/item-ingredient";

import style from "./group-ingredients.module.css";
import { TIngredient } from "../../../utils/types";

type TGroupIngredients = {
  id: string;
  title: string;
  elements: Array<TIngredient>;
  groupRef: any;
};

export const GroupIngredients: React.FC<TGroupIngredients> = ({
  id,
  title,
  elements,
  groupRef,
}) => {
  return (
    <>
      <div className="pt-10" id={id} ref={groupRef}>
        <span className="text text_type_main-medium"> {title}</span>
      </div>
      <div className={style.container}>
        {elements.map((element, index) => (
          <ItemIngredient key={element._id} item={element} />
        ))}
      </div>
    </>
  );
};
