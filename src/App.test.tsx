import { render } from "@testing-library/react";
import React from "react";
import { incrementAsync, delay } from "./sagas";
import { call, put } from "redux-saga/effects";
import App from "./App";

import configureStore from "redux-mock-store";
import { State, Action } from "./store";
import { Provider } from "react-redux";
import { Store } from "redux";

const mockStore = configureStore<State>();

let store: Store<State, Action>;

beforeEach(() => {
  store = mockStore({ counter: 0 });
});

test("renders app title", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const el = getByText(/Redux saga/i);
  expect(el).toBeInTheDocument();
});

test("increment async", () => {
  const gen = incrementAsync();

  expect(gen.next().value).toEqual(call(delay, 1000));
  expect(gen.next().value).toEqual(put({ type: "INCREMENT" }));
  expect(gen.next().done).toBe(true);
});
