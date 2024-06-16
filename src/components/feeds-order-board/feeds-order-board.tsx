import style from "./feeds-order-board.module.css";

import { useAppSelector } from "../..";
import { useEffect, useState } from "react";
import { TOrder } from "../../utils/types";

export default function FeedsOrderBoard() {
  
  const [createdItem, setCreatedItem] = useState<TOrder[][]>([]);
  const [pendingItem, setPendingItem] = useState<TOrder[][]>([]);

  const { messages, wsConnected, error } = useAppSelector(
    (store) => store.wsReducer
  );

  const splitArr = (arr: any, size: number) =>
    arr.reduce(
      (item: any, c: any) => {
        if (item[item.length - 1].length === size) {
          item.push([]);
        }
        item[item.length - 1].push(c);
        return item;
      },
      [[]]
    );

  useEffect(() => {
    if (messages?.orders.length) {
      const created = messages.orders.filter((i) => i.status === "created");
      const pending = messages.orders.filter((i) => i.status === "pending");
      //const done = messages.orders.filter((i) => i.status === "done");
      setCreatedItem(splitArr(created, 10));
      setPendingItem(splitArr(pending, 10));
    }
  }, [messages]);

  return (
    <div className={style.feedInfo + " pl-10"}>
      <div className={style.statusesWrapper}>
        <section className={style.statuses}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={style.statusesColumns}>
            {pendingItem.length && pendingItem[0].length ? (
              pendingItem.map((pendingColumn, i) => (
                <div key={i} className={style.statusesColumn}>
                  {pendingColumn.map((item) => (
                    <span
                      key={item.number}
                      className={style.done + " text text_type_digits-default"}
                    >
                      {item.number}
                    </span>
                  ))}
                </div>
              ))
            ) : (
              <p className="text text_type_main-medium text_color_inactive">
                -
              </p>
            )}
          </div>
        </section>
        <section>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={style.statusesColumns}>
            {createdItem.length && createdItem[0].length ? (
              createdItem.map((createdColumn, i) => (
                <div key={i} className={style.statusesColumn}>
                  {createdColumn.map((item) => (
                    <span
                      key={item.number}
                      className="text text_type_digits-default"
                    >
                      {item.number}
                    </span>
                  ))}
                </div>
              ))
            ) : (
              <p className="text text_type_main-medium text_color_inactive">
                -
              </p>
            )}
          </div>
        </section>
      </div>
      <div>
        <p className="text text_type_main-medium mt-10">
          Выполнено за все время:
        </p>
        <p className="text text_type_digits-large">
          {messages?.total.toLocaleString()}
        </p>

        <p className="text text_type_main-medium mt-10">
          Выполнено за сегодня:
        </p>
        <p className="text text_type_digits-large">
          {messages?.totalToday.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
