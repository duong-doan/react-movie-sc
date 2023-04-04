import { all, put, takeLatest, call } from 'redux-saga/effects';
import {
  getListMovieRequestApi,
  getMovieInfoRequestApi,
  getCommentsInMovieApi,
  postCommentInMovieApi,
  searchMoviesApi,
} from 'services/movieService';
import { getToken } from 'utils/hooks/useToken';
import * as actions from './actions';
import {
  getListMovieSuccess,
  updateLoading,
  getMovieInfoSuccess,
  getCommentSuccess,
  getMovieSearchSuccess,
  getMovieSearchFailed,
  updateLoadingSearch,
} from './slice';

function* fetchListMovieRequestMid(action) {
  const page = action.payload;
  try {
    yield put(updateLoading(true));
    const accessToken = getToken();
    const response = yield call(getListMovieRequestApi, { page, accessToken });
    if (response?.data?.moviesList) {
      const data = response?.data?.moviesList;
      yield put(getListMovieSuccess(data));
    } else {
      yield put(actions.getListMovieError(response.data.errors));
    }
  } catch (error) {
    yield put(actions.getListMovieError(error));
  }
}

function* fetchMovieInfoRequestMid(action) {
  try {
    const id = action.payload;
    const response = yield call(getMovieInfoRequestApi, id);
    if (response) {
      const data = response.data.movie;
      yield put(getMovieInfoSuccess(data));
    }
  } catch (error) {
    yield put(actions.getMovieInfoError(error));
  }
}

function* fetchCommentRequestMid(action) {
  try {
    const movie_id = action.payload;
    const response = yield call(getCommentsInMovieApi, movie_id);
    if (response) {
      const data = response.data.comments;
      yield put(getCommentSuccess(data));
    }
  } catch (error) {
    yield put(actions.getCommentError(error));
  }
}

function* postCommentRequestMid(action) {
  const { data } = action.payload;
  try {
    const accessToken = getToken();
    const response = yield call(postCommentInMovieApi, {
      data,
      token: accessToken,
    });
    if (response.data.message) {
      yield fetchCommentRequestMid({ payload: data.movie_id });
    }
  } catch (error) {
    console.log(error);
  }
}

function* searchMoviesRequestMid(action) {
  const searchValue = action.payload;
  try {
    yield put(updateLoadingSearch(true));
    const response = yield call(searchMoviesApi, searchValue);
    yield put(getMovieSearchSuccess(response.data.movies));
  } catch (error) {
    yield put(getMovieSearchFailed(error));
  }
}

export default function* movieSaga() {
  yield all([
    takeLatest(actions.getListMovieRequest.type, fetchListMovieRequestMid),
    takeLatest(actions.getMovieInfoRequest.type, fetchMovieInfoRequestMid),
    takeLatest(actions.getCommentRequest.type, fetchCommentRequestMid),
    takeLatest(actions.postCommentRequest.type, postCommentRequestMid),
    takeLatest(actions.searchMovieRequest.type, searchMoviesRequestMid),
  ]);
}
