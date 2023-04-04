import { createSlice } from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';
import map from 'lodash/map';

const initialState = {
  ids: [],
  list: {},
  moviesSearch: [],
  movieInfo: {},
  comments: [],
  loading: false,
  loadingSearch: false,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getListMovieSuccess: (state, action) => {
      const movies = action.payload;
      let list = { ...state.list };
      let ids = [];
      map(movies, (item) => {
        list = {
          ...list,
          [item._id]: {
            ...item,
          },
        };
        state.list = list;

        ids = uniq([...state.ids, item._id]);
        state.ids = ids;
      });
      state.moviesList = action.payload;
      state.loading = false;
    },
    getMovieInfoSuccess: (state, action) => {
      state.movieInfo = action.payload;
    },
    getCommentSuccess: (state, action) => {
      state.comments = action.payload;
    },
    getMovieSearchSuccess: (state, action) => {
      state.moviesSearch = action.payload;
      state.loadingSearch = false;
    },
    getMovieSearchFailed: (state) => {
      state.loadingSearch = false;
    },
    updateLoadingSearch: (state, action) => {
      state.loadingSearch = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearDataMovies: (state) => {
      state.list = {};
      state.ids = [];
    },
    clearMovieInfo: (state) => {
      state.movieInfo = {};
    },
  },
});

export const {
  getListMovieSuccess,
  updateLoading,
  clearDataMovies,
  getMovieInfoSuccess,
  clearMovieInfo,
  getCommentSuccess,
  getMovieSearchSuccess,
  getMovieSearchFailed,
  updateLoadingSearch,
} = movieSlice.actions;

export default movieSlice.reducer;
