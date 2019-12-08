import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import { logger } from "redux-logger";

import { rootSaga } from "./sagas";

export type State = { counter: number };

export type Action = {
  type: "INCREMENT" | "DECREMENT" | "ASYNC_INCREMENT" | "ASYNC_DECREMENT";
};

const reducer = (state: State = { counter: 0 }, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore<State, Action, unknown, unknown>(
  reducer,
  { counter: 0 },
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export const action = (type: Action["type"]) => store.dispatch({ type });
