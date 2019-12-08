import { put, takeEvery, all, call } from "redux-saga/effects";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

export function* decrementAsync() {
  yield delay(1000);
  yield put({ type: "DECREMENT" });
}

function* watchAsyncIncrement() {
  yield takeEvery("ASYNC_INCREMENT", incrementAsync);
}

function* watchAsyncDecrement() {
  yield takeEvery("ASYNC_DECREMENT", decrementAsync);
}

export function* rootSaga() {
  yield all([watchAsyncIncrement(), watchAsyncDecrement()]);
}
