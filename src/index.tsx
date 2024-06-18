import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./services/reducers/root-reducer";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import * as anName from "./services/actions/ws-actions";


// Инициализируем хранилище с помощью корневого редьюсера
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( { serializableCheck: false } ).concat(socketMiddleware(anName)),
});




export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
