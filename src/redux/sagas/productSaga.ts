import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../slices/productSlice';
import { productApi } from '../../services/api/productApi';

function* handleFetchProducts() {
  try {
    const products = yield call(productApi.getProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message || 'Failed to fetch products'));
  }
}

function* handleFetchProductsByCategory(action: any) {
  try {
    const { category } = action.payload;
    const products = yield call(productApi.getProductsByCategory, category);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message || 'Failed to fetch products'));
  }
}

export function* watchProductSaga() {
  yield takeEvery(fetchProductsStart.type, handleFetchProducts);
  // Add more product-related sagas as needed
}
