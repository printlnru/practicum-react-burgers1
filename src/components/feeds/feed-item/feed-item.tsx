import style from "./feed-item.module.css";

import { Link, useLocation } from "react-router-dom";
import { TIngredient, TOrder } from "../../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { formatDate, getStatusAsColor, getStatusAsText, totalCost } from '../../../utils/common-functions';

type TFeedItem = {
  order: TOrder;
  showStatus: boolean
};

export const FeedItem: React.FC<TFeedItem> = ({ order, showStatus }) => {
  const location = useLocation();

  const showCount = 5;

  return (
    <Link
      key={order.number}
      to={{
        pathname: `${location.pathname}/${order.number}`,
      }}
      className={style.link}
      state={{background: location}}
    >
      <div className={style.order}>
        <div className={style.header}>
          <p className="text text_type_digits-default">{"#" + order?.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className={style.name + " text text_type_main-medium pb-6 pt-6"}>
          {order.name}
          {showStatus && <p className="text text_type_main-default" style={{color: getStatusAsColor(order.status)}}>{getStatusAsText(order.status)}</p>}
        </div>

        <div className={style.footer}>
          <div className={style.images}>
            {order.ingredients.map((ingredient, i) => {
              let left = -i * 15;
              if (i <= showCount - 1)
                return (
                  <div
                    key={i}
                    className={style.imageWrapper}
                    style={{ left: left, zIndex: 100 - i }}
                  >
                    <img
                      className={style.image}
                      src={ingredient.image}
                      alt={"image " + ingredient.name}
                    />
                  </div>
                );
              if (i === showCount)
                return (
                  <div
                    key={i}
                    className={style.imageWrapper}
                    style={{ left: left, zIndex: 100 - i }}
                  >
                    <p
                      className={style.count + " text text_type_digits-default"}
                    >
                      {"+" + (order.ingredients.length - showCount)}
                    </p>
                    <img
                      className={style.image}
                      style={{ opacity: 0.5 }}
                      src={ingredient.image}
                      alt={"image " + ingredient.name}
                    />
                  </div>
                );
              return false;
            })}
          </div>
          <div className={style.coast}>
            <span className="text text_type_digits-default pr-2">
              {totalCost(order.ingredients)}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
