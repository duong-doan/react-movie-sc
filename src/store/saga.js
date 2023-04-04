import { all, fork } from 'redux-saga/effects';
import authSaga from 'modules/auth/store/saga';
import movieSaga from 'modules/movies/store/saga';
import chattingSaga from 'modules/chatting/store/saga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(movieSaga), fork(chattingSaga)]);
}
