import { takeEvery, call, put } from 'redux-saga/effects';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { authApi } from '../../services/api/authApi';

function* handleLogin(action: any) {
  try {
    const { email, password } = action.payload;
    const user = yield call(authApi.login, email, password);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

function* handleGoogleLogin(action: any) {
  try {
    const { token } = action.payload;
    const user = yield call(authApi.googleLogin, token);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Google login failed'));
  }
}

export function* watchAuthSaga() {
  yield takeEvery(loginStart.type, handleLogin);
  // Add more auth-related sagas as needed
}
