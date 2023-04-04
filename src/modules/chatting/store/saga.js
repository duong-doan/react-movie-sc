import { all, put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import {
  searchUsersRequest,
  searchUsersSuccess,
  searchUsersFailed,
  updateIsFetchingUserListSearch,
  getUserListFriendRequest,
  updateIsFetchingUserListFriend,
  getUserListFriendSuccess,
  getUserListFriendFailed,
  createRoomChatRequest,
  setIdsOpenChatbox,
} from './slice';
import * as AuthApi from 'services/authService';
import { getToken } from 'utils/hooks/useToken';
import UseSocket from 'utils/socket';
import { CHANNEL } from 'modules/auth/store/constant';

function* searchUsersRequestMid(action) {
  const searchValue = action.payload;
  try {
    yield put(updateIsFetchingUserListSearch(true));
    const response = yield call(AuthApi.searchUsersRequest, { searchValue });
    yield put(searchUsersSuccess(response.data.users));
  } catch (error) {
    yield put(searchUsersFailed(error));
  }
}

function* getUserListFriendRequestMid(action) {
  const page = action.payload;
  try {
    yield put(updateIsFetchingUserListFriend(true));
    const accessToken = getToken();
    const response = yield call(AuthApi.getAllUsersRequest, {
      page,
      accessToken,
    });
    if (response?.data?.users) {
      const data = response?.data?.users;
      yield put(getUserListFriendSuccess(data));
    } else {
      yield put(getUserListFriendFailed(response.data.errors));
    }
  } catch (error) {
    yield put(getUserListFriendFailed(error));
  }
}

function* createRoomChatRequestMid(action) {
  const { roomId, userId } = action.payload;
  const { emitEvent } = UseSocket();
  try {
    const data = {
      roomId,
      userId,
    };
    yield put(setIdsOpenChatbox(true));
    yield emitEvent(CHANNEL.CREATE_ROOM, data);
  } catch (error) {
    console.log(error);
  }
}

export default function* chattingSaga() {
  yield all([
    takeLatest(searchUsersRequest.type, searchUsersRequestMid),
    takeLatest(getUserListFriendRequest.type, getUserListFriendRequestMid),
    takeEvery(createRoomChatRequest.type, createRoomChatRequestMid),
  ]);
}
