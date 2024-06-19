import { FC, useEffect } from "react";
import style from "./ingredient-details.module.css";
import { useLocation } from "react-router-dom";
import { CURRENT_INGREDIENTS_LOAD_AS_PAGE } from "../../services/actions/current-ingredient";

import {TIngredient} from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../..";


export const IngredientDetails : FC = () => {
  const data = useAppSelector((state) => state.currentIngredient.ingredient);
  const { ingredients  } = useAppSelector((store) => store.ingredients);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    if (!data) {
      var item = ingredients.find((e:TIngredient) => e._id == id);
      dispatch({ type: CURRENT_INGREDIENTS_LOAD_AS_PAGE, value: item });
    }
  }, [ingredients]);

  if (!data) return (<>"Loading..."</>);
  else
    return (
      <>
        <img className={style.image} src={data.image_large} alt={data.name} />
        <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
        <ul className={style.row}>
          <li className={style.list_item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data.calories}
            </p>
          </li>
          <li className={style.list_item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data.proteins}
            </p>
          </li>
          <li className={style.list_item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data.fat}
            </p>
          </li>
          <li className={style.list_item}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {data.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    );
}
