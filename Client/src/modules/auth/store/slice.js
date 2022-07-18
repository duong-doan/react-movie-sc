import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
  user: {},
  token: '',
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    authLoginRequestSuccess: (state, action) => {
      const { email, accessToken } = action.payload;
      state.token = accessToken || '';
      state.user = { email };
      state.loading = false;
    },
    authRegisterRequestSuccess: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [actions.authLoginRequest.type]: (state) => {
      state.loading = true;
    },
    [actions.authLoginError.type]: (state) => {
      state.loading = false;
    },
    [actions.authLoginRequest.type]: (state) => {
      state.loading = true;
    },
    [actions.authRegisterError.type]: (state, action) => {
      console.log('extra', action);
      state.loading = false;
    },
  },
});

export const { authLoginRequestSuccess, authRegisterRequestSuccess } =
  authSlice.actions;

export default authSlice.reducer;
