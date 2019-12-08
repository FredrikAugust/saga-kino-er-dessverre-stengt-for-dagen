import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import { logger } from "redux-logger";

import { rootSaga } from "./sagas";

export type State = { counter: number; news: Array<string> };

type FetchNewsAction = { type: "FETCH_NEWS"; id: number };
type FetchNewsSuccessAction = { type: "FETCH_NEWS_SUCCESS"; title: string };

export type Action =
  | FetchNewsAction
  | FetchNewsSuccessAction
  | {
      type: "INCREMENT" | "DECREMENT" | "ASYNC_INCREMENT" | "ASYNC_DECREMENT";
    };

const reducer = (state: State = { counter: 0, news: [] }, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "FETCH_NEWS_SUCCESS":
      return { ...state, news: [...state.news, action.title] };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore<State, Action, unknown, unknown>(
  reducer,
  { counter: 0, news: [] },
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

export const action = (type: Action["type"], payload: any = {}) =>
  store.dispatch({ type, ...payload });
