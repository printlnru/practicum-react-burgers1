import { useEffect, useState } from "react";
import { Feeds } from "../../components/feeds/feeds";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import style from "./orders-page.module.css";
import { TOrder } from "../../utils/types";
import { FeedItem } from "../../components/feeds/feed-item/feed-item";
import { useAppDispatch, useAppSelector } from "../..";
import { getIngredients } from "../../services/actions/ingredients";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws-actions";
import { API_WS_USER_PATH } from "../../services/api/config";
import { getCookie } from "../../utils/cookie";
import { MessageOrder2OrderMapper } from "../../utils/common-functions";

export default function OrdersPage() {
  const dispatch = useAppDispatch();

  const { messages, wsConnected, error } = useAppSelector(
    (store) => store.wsReducer
  );
  const { ingredients } = useAppSelector((store) => store.ingredients);

  const [orders, setOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch({
      type: WS_CONNECTION_START,
      payload: API_WS_USER_PATH + "?token=" + getCookie("token"),
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (messages != null) {
      setOrders(
        messages.orders.map((origin) =>
          MessageOrder2OrderMapper(origin, ingredients)
        )
      );
    } else {
      setOrders([]);
    }
  }, [messages]);

  return (
    <div className={style.center}>
      <div className={style.app}>
        <div className={style.col1}>
          <ProfileMenu />
        </div>

        <div className={style.container}>
          <div className={style.ingredients}>
            {orders.map((item) => (
              <FeedItem key={item["_id"]} order={item} showStatus={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
