import {createSlice} from '@reduxjs/toolkit';
import {AUTH_TYPES} from './types';

const initialState = {
  auth: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },

  logout: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
};

const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    [AUTH_TYPES.AUTHORIZE]: state => {
      state.auth.isFetching = true;
      state.auth.isSuccess = false;
      state.auth.error = undefined;
      return state;
    },
    [AUTH_TYPES.AUTHORIZE_SUCCESS]: state => {
      state.auth.isFetching = false;
      state.auth.isSuccess = true;
      return state;
    },
    [AUTH_TYPES.AUTHORIZE_FAILURE]: (state, action) => {
      state.auth.isFetching = false;
      state.auth.isSuccess = false;
      state.auth.error = action.payload;
      return state;
    },

    [AUTH_TYPES.LOGOUT]: state => {
      state.logout.isFetching = true;
      state.logout.isSuccess = false;
      state.logout.error = undefined;
      return state;
    },
    [AUTH_TYPES.LOGOUT_SUCCESS]: state => {
      state.logout.isFetching = false;
      state.logout.isSuccess = true;
      return state;
    },
    [AUTH_TYPES.LOGOUT_ERROR]: (state, action) => {
      state.logout.isFetching = false;
      state.logout.isSuccess = false;
      state.logout.error = action.payload;
      return state;
    },
    [AUTH_TYPES.LOGOUT_CLEAN]: state => {
      state.logout.isFetching = false;
      state.logout.isSuccess = false;
      state.logout.error = undefined;
      return state;
    },
  },
});

export const {reducer: authReducer} = auth;
export * from './actions';
export * from './saga';
