import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as ApiAuth from 'services/authService';
import { toast } from 'react-toastify';

import * as actions from './actions';
import {
  authLoginRequestSuccess,
  authRegisterRequestSuccess,
  getUserInfoSuccess,
  getUserInfoFailed,
  getUserInfoRequest,
} from './slice';
import { getToken } from 'utils/hooks/useToken';

function* fetchAuthLoginMid(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(ApiAuth.loginUserRequest, { email, password });
    yield getUserInfoRequestMid({
      payload: { email, token: response?.data?.accessToken },
    });

    if (!response?.data?.message) {
      const accessToken = response?.data?.accessToken;
      yield put(authLoginRequestSuccess({ accessToken }));
    } else {
      yield put(actions.authLoginError(response?.data?.message));
    }
  } catch (error) {
    console.log('error login', error);
  }
}

function* getUserInfoRequestMid(action) {
  const { email, token } = action.payload;
  const tokenLocal = getToken();
  try {
    const response = yield call(ApiAuth.getUserInfoRequest, {
      email,
      token: token || tokenLocal,
    });
    if (response?.data) {
      yield put(getUserInfoSuccess(response?.data));
    } else {
      yield put(getUserInfoFailed(response?.data?.message));
    }
  } catch (error) {
    yield put(getUserInfoFailed(error));
  }
}

function* fetchAuthRegisterMid(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(ApiAuth.registerUserRequest, {
      email,
      password,
    });
    if (response?.data?.message === 'Register user successfull') {
      yield put(authRegisterRequestSuccess(response?.data?.message));
      toast.success(response?.data?.message);
    } else {
      yield put(actions.authRegisterError(response?.data?.message));
    }
  } catch (error) {
    console.log('error register', error);
  }
}

function* logoutRequestMid() {
  yield localStorage.clear();
  window.location.replace('/login');
}

export default function* authSaga() {
  yield all([
    takeLatest(actions.authLoginRequest.type, fetchAuthLoginMid),
    takeLatest(actions.authRegisterRequest.type, fetchAuthRegisterMid),
    takeLatest(getUserInfoRequest.type, getUserInfoRequestMid),
    takeLatest(actions.logoutRequest.type, logoutRequestMid),
  ]);
}
