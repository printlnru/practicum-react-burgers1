import style from "./feeds.module.css";

import { FeedItem } from "./feed-item/feed-item";
import { useAppDispatch, useAppSelector } from "../..";
import { useEffect, useState } from "react";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws-actions";
import { API_WS_ALL_PATH } from "../../services/api/config";
import { TOrder } from "../../utils/types";
import { MessageOrder2OrderMapper } from "../../utils/common-functions";

export const Feeds : React.FC = () => {
  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<TOrder[]>([]);

  const { messages, wsConnected, error } = useAppSelector(
    (store) => store.wsReducer
  );

  const { ingredients } = useAppSelector((store) => store.ingredients);


  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: API_WS_ALL_PATH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (messages != null) {
      setOrders(
        messages.orders.map((origin) => MessageOrder2OrderMapper(origin,ingredients))
      );
    } else {
      setOrders([]);
    }
  }, [messages]);

  return (
    <>
      {!wsConnected && "Загрузка..."}
      {error && "Произошла ошибка"}
      {messages && (
        <>
          <div className={style.textleft}>
            <span className="text text_type_main-large">Лента заказов</span>
          </div>

          <div className={style.ingredients}>
            {orders.map((item) => (
              <FeedItem key={item["_id"]} order={item} showStatus={false} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
