import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../..";
import { TMessage } from "../../utils/types";

import { TWsActionNames, TWsActions } from "../actions/ws-actions";

export const socketMiddleware = (anName: TWsActionNames) : Middleware => 
  (store: MiddlewareAPI<Dispatch<TWsActions>, RootState>) =>
  (next: (action: unknown) => unknown) =>
  (action: unknown): unknown => {
    let socket: WebSocket | null = null;

    const { dispatch, getState } = store;
    const action1 = action as TWsActions;

    const { type } = action1;

    if (type === anName.WS_CONNECTION_START) {
      // объект класса WebSocket
      socket = new WebSocket(action1.payload);
    }
    if (socket) {
      // функция, которая вызывается при открытии сокета
      socket.onopen = (event) => {
        dispatch({ type: anName.WS_CONNECTION_SUCCESS, payload: event });
      };

      // функция, которая вызывается при ошибке соединения
      socket.onerror = (event: Event) => {
        dispatch({ type: anName.WS_CONNECTION_ERROR, payload: event });
      };

      // функция, которая вызывается при получения события от сервера
      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData: TMessage = JSON.parse(data);
        dispatch({ type: anName.WS_GET_MESSAGE, payload: parsedData });
      };
      // функция, которая вызывается при закрытии соединения
      socket.onclose = (event) => {
        dispatch({ type: anName.WS_CONNECTION_CLOSED, payload: event });
      };

      if (type === anName.WS_SEND_MESSAGE) {
        const message = action1.payload;
        // функция для отправки сообщения на сервер
        socket.send(JSON.stringify(message));
      }
    }

    return next(action);
  };
