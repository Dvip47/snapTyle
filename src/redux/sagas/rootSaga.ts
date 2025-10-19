import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchProductSaga } from './productSaga';
import { watchOrderSaga } from './orderSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchProductSaga),
    fork(watchOrderSaga),
  ]);
}
