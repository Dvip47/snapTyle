import { takeEvery, call, put } from 'redux-saga/effects';
import { 
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure
} from '../slices/orderSlice';
import { orderApi } from '../../services/api/orderApi';

function* handleFetchOrders(action: any) {
  try {
    const { userId } = action.payload;
    const orders = yield call(orderApi.getOrders, userId);
    yield put(fetchOrdersSuccess(orders));
  } catch (error: any) {
    yield put(fetchOrdersFailure(error.message || 'Failed to fetch orders'));
  }
}

function* handleCreateOrder(action: any) {
  try {
    const orderData = action.payload;
    const order = yield call(orderApi.createOrder, orderData);
    yield put(createOrderSuccess(order));
  } catch (error: any) {
    yield put(createOrderFailure(error.message || 'Failed to create order'));
  }
}

export function* watchOrderSaga() {
  yield takeEvery(fetchOrdersStart.type, handleFetchOrders);
  yield takeEvery(createOrderStart.type, handleCreateOrder);
}
