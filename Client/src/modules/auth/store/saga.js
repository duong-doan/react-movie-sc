import { all, put, takeLatest, call } from 'redux-saga/effects';
import { loginUserRequest, registerUserRequest } from 'services/authService';

import { getToken, setToken } from 'utils/hooks/useToken';
import * as actions from './actions';
import { authLoginRequestSuccess, authRegisterRequestSuccess } from './slice';

function* fetchAuthLoginMid(action) {
  const { email } = action.payload;
  try {
    const response = yield call(loginUserRequest, { email });
    if (response) {
      const { accessToken } = response?.data;
      setToken(accessToken);
      const accessTokenLocal = getToken();
      if (accessTokenLocal) {
        yield put(authLoginRequestSuccess(response.data));
      }
    }
  } catch (error) {
    console.log('error login', error);
  }
}

function* fetchAuthRegisterMid(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(registerUserRequest, { email, password });
    if (response.data) {
      yield put(authRegisterRequestSuccess());
    } else {
      yield put(actions.authRegisterError(response));
    }
  } catch (error) {
    console.log('error register', error);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(actions.authLoginRequest.type, fetchAuthLoginMid),
    takeLatest(actions.authRegisterRequest.type, fetchAuthRegisterMid),
  ]);
}
