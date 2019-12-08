import { put, takeEvery, takeLatest, all, call } from "redux-saga/effects";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

export function* decrementAsync() {
  yield delay(1000);
  yield put({ type: "DECREMENT" });
}

const getNews = async (id: number) => {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return await resp.json();
};

export function* fetchNews({ id }: { type: "FETCH_NEWS"; id: number }) {
  try {
    const { title } = yield call(getNews, id);
    yield put({ type: "FETCH_NEWS_SUCCESS", title });
  } catch (error) {
    console.error(`Could not fetch news with id ${id}.`);
  }
}

function* watchAsyncIncrement() {
  yield takeEvery("ASYNC_INCREMENT", incrementAsync);
}

function* watchAsyncDecrement() {
  yield takeEvery("ASYNC_DECREMENT", decrementAsync);
}

function* watchFetchNews() {
  yield takeLatest("FETCH_NEWS", fetchNews);
}

export function* rootSaga() {
  yield all([watchFetchNews(), watchAsyncIncrement(), watchAsyncDecrement()]);
}
