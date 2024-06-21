import { wsReducer, WsStore } from "./ws-reducer";
import * as T from "../actions/ws-actions";
import { TMessage } from "../../utils/types";

const initialState: WsStore = {
  wsConnected: false,
  messages: null,
  error: "",
};

const testGetMethod: TMessage = {
  success: true,
  orders: [],
  total: 5,
  totalToday: 2,
};

describe("test ws-reducer reducer", () => {
  it("check WS_CONNECTION_SUCCESS", () => {
    const expected: WsStore = {
      ...initialState,
      wsConnected: true,
      error: null,
    };
    const received = wsReducer(initialState, {
      type: T.WS_CONNECTION_SUCCESS,
    });
    expect(received).toEqual(expected);
  });

  it("check WS_CONNECTION_ERROR_NULL", () => {
    const expected: WsStore = {
      ...initialState,
      wsConnected: false,
      error: null,
    };
    const received = wsReducer(initialState, {
      type: T.WS_CONNECTION_ERROR,
      payload: null,
    });
    expect(received).toEqual(expected);
  });

  it("check WS_CONNECTION_ERROR_STRING", () => {
    const expected: WsStore = {
      ...initialState,
      wsConnected: false,
      error: "Error",
    };
    const received = wsReducer(initialState, {
      type: T.WS_CONNECTION_ERROR,
      payload: "Error",
    });
    expect(received).toEqual(expected);
  });

  it("check WS_CONNECTION_CLOSED", () => {
    const expected: WsStore = {
      messages: null,
      error: null,
      wsConnected: false,
    };
    const received = wsReducer(
      {
        messages: { success: true, orders: [], total: 123, totalToday: 321 },
        error: "any error",
        wsConnected: true,
      },
      {
        type: T.WS_CONNECTION_CLOSED,
      }
    );
    expect(received).toEqual(expected);
  });

  it("check WS_GET_MESSAGE", () => {
    const expected: WsStore = {
      messages: testGetMethod,
      wsConnected: true,
      error: null,
    };
    const received = wsReducer(
      { ...initialState, wsConnected: true, error: "old errors" },
      {
        type: T.WS_GET_MESSAGE,
        payload: testGetMethod,
      }
    );
    expect(received).toEqual(expected);
  });
});
