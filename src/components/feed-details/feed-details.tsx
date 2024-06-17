import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../..";
import { TIngredient, TStatus } from "../../utils/types";
import style from "./feed-details.module.css";
import { useEffect, useState } from "react";

import {
  IngredientId2IngredientMapper,
  formatDate,
  getStatusAsColor,
  getStatusAsText,
  totalCost,
} from "../../utils/common-functions";
import { useLocation } from "react-router-dom";

import { getOrder } from "../../services/actions/order";

export const FeedDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { ingredients } = useAppSelector((store) => store.ingredients);

  const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
  const [price, setPrice] = useState(0);

  const arr = location.pathname.split("/");
  const str_id: string = arr[arr.length - 1];

  useEffect(() => {

    var id: number = +str_id;
    dispatch(getOrder(id));
  }, []);

  const { order, inProgress, failedStatus } = useAppSelector(
    (store) => store.order
  );

  if (failedStatus) {
    return (
      <p className="text text_type_main-default text_color_inactive">
        Ошибка при загрузке информации заказа!
      </p>
    );
  } else if (inProgress) {
    return (
      <p className="text text_type_main-default text_color_inactive">
        Загрузка информации о заказа...
      </p>
    );
  } else {
    return (
      <>
        {order && (
          <section className={style.orderInfo}>
            <p
              className={
                style.orderHeader + " text text_type_digits-default pt-4"
              }
            >
              #{order.number}
            </p>
            <p className="text text_type_main-medium pt-10">{order.name}</p>
            <p className="text text_type_main-default pt-2">
              <span style={{ color: getStatusAsColor("done") }}>
                {getStatusAsText(order.status)}
              </span>
            </p>
            <p className="text text_type_main-medium pt-15 pb-4">Состав:</p>
            <div className={style.orderScrollWrapper + " pr-2"}>
              {Boolean(order.ingredients) &&
                order.ingredients?.map((ingredientId, i) => {
                  const ingredient_Id = String(ingredientId);
                  const ingredient: TIngredient = IngredientId2IngredientMapper(
                    ingredient_Id,
                    ingredients
                  );
                  return (
                    <div key={i} className={style.order + " mt-4 pb-2"}>
                      <div className={style.info}>
                        <div className={style.imageWrapper + " mr-4"}>
                          <img
                            className={style.image}
                            src={ingredient.image_mobile}
                            alt=""
                          />
                        </div>
                        <div
                          className={
                            style.name + " text text_type_main-default"
                          }
                        >
                          {ingredient.name}
                        </div>
                      </div>

                      <div
                        className={
                          style.price + " text text_type_digits-default"
                        }
                      >
                        <span className="pr-2">{ingredient.price}</span>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={style.footer + " mt-10 pr-2 pb-10"}>
              <p className="text text_type_main-default text_color_inactive">
                {formatDate(order.createdAt)}
              </p>
              <div className={style.price + " text text_type_digits-default"}>
                <span className="pr-2">
                  {totalCost(
                    order.ingredients.map((ingredientId, i) => {
                      const ingredient_Id = String(ingredientId);
                      return IngredientId2IngredientMapper(
                        ingredient_Id,
                        ingredients
                      );
                    })
                  )}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
};
