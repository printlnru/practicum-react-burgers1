import auth, { TState } from "./auth";
import { TUser } from "../../utils/types";
import * as T from "../actions/auth";

const testUser: TUser = {
  email: "test1@yandex.ru",
  name: "Andy",
};

const emptyUser: TUser = {
  name: "",
  email: "",
};

const initialState: TState = {
  error: false,
  login: false,
  user: emptyUser,
};

describe("test auth reducer", () => {
  it("check AUTH_REGISTRATION_IN_PROGRESS", () => {
    const expected = {
      user: emptyUser,
      error: false,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_REGISTRATION_IN_PROGRESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_REGISTRATION_SUCCESS", () => {
    const expected = {
      user: emptyUser,
      error: false,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_REGISTRATION_SUCCESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_REGISTRATION_FAILED", () => {
    const expected = {
      user: emptyUser,
      error: true,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_REGISTRATION_FAILED,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_LOGIN_IN_PROGRESS", () => {
    const expected = {
      user: emptyUser,
      error: false,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_LOGIN_IN_PROGRESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_LOGIN_SUCCESS", () => {
    const expected = {
      user: testUser,
      error: false,
      login: true,
    };
    const received = auth(initialState, {
      type: T.AUTH_LOGIN_SUCCESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_LOGIN_FAILED", () => {
    const expected = {
      user: emptyUser,
      error: true,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_LOGIN_FAILED,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_LOGOUT_SUCCESS", () => {
    const expected = {
      user: emptyUser,
      error: false,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_LOGOUT_SUCCESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_GET_USER_IN_PROGRESS", () => {
    const expected = {
      user: emptyUser,
      error: false,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_GET_USER_IN_PROGRESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_GET_USER_SUCCESS", () => {
    const expected = {
      user: testUser,
      error: false,
      login: true,
    };
    const received = auth(initialState, {
      type: T.AUTH_GET_USER_SUCCESS,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });

  it("check AUTH_GET_USER_FAILED", () => {
    const expected = {
      user: emptyUser,
      error: true,
      login: false,
    };
    const received = auth(initialState, {
      type: T.AUTH_GET_USER_FAILED,
      user: testUser,
    });
    expect(received).toEqual(expected);
  });
});
