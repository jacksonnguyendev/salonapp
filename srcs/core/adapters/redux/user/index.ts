import {createSlice} from '@reduxjs/toolkit';
import {USER_TYPES} from './types';
import {IUser, IResponseError} from 'core/entities';

export type UserStateType = {
  data?: IUser;
  isFetching: boolean;
  error?: IResponseError;
  signIn: {
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
  signUp: {
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
  requestOtp: {
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
  resetPassword: {
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
  updateProfile: {
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
  updateAvatar: {
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
};

const initialState: UserStateType = {
  data: undefined,
  isFetching: false,
  error: undefined,
  signIn: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
  signUp: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
  requestOtp: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
  resetPassword: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
  updateProfile: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
  updateAvatar: {
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
};

const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    [USER_TYPES.UPDATE_USER]: (state, action) => {
      state.data = action.payload;
      return state;
    },

    [USER_TYPES.USER_SIGN_IN]: state => {
      state.signIn.isFetching = true;
      state.signIn.isSuccess = false;
      state.signIn.error = undefined;
      return state;
    },
    [USER_TYPES.USER_SIGN_IN_SUCCESS]: state => {
      state.signIn.isFetching = false;
      state.signIn.isSuccess = true;
      return state;
    },
    [USER_TYPES.USER_SIGN_IN_FAILURE]: (state, action) => {
      state.signIn.isFetching = false;
      state.signIn.error = action.payload;
      return state;
    },
    [USER_TYPES.USER_SIGN_IN_CLEAN]: (state, action) => {
      state.signIn.isFetching = false;
      state.signIn.isSuccess = false;
      state.signIn.error = undefined;
      return state;
    },

    [USER_TYPES.USER_SIGN_UP]: state => {
      state.signUp.isFetching = true;
      state.signUp.isSuccess = false;
      state.signUp.error = undefined;
      return state;
    },
    [USER_TYPES.USER_SIGN_UP_SUCCESS]: state => {
      state.signUp.isFetching = false;
      state.signUp.isSuccess = true;
      return state;
    },
    [USER_TYPES.USER_SIGN_UP_FAILURE]: (state, action) => {
      state.signUp.isFetching = false;
      state.signUp.isSuccess = false;
      state.signUp.error = action.payload;
      return state;
    },
    [USER_TYPES.USER_SIGN_UP_CLEAN]: state => {
      state.signUp.isFetching = false;
      state.signUp.isSuccess = false;
      state.signUp.error = undefined;
      return state;
    },

    [USER_TYPES.USER_REQUEST_OTP]: state => {
      state.requestOtp.isFetching = true;
      state.requestOtp.isSuccess = false;
      state.requestOtp.error = undefined;
      return state;
    },
    [USER_TYPES.USER_REQUEST_OTP_SUCCESS]: state => {
      state.requestOtp.isFetching = false;
      state.requestOtp.isSuccess = true;
      return state;
    },
    [USER_TYPES.USER_REQUEST_OTP_FAILURE]: (state, action) => {
      state.requestOtp.isFetching = false;
      state.requestOtp.isSuccess = false;
      state.requestOtp.error = action.payload;
      return state;
    },
    [USER_TYPES.USER_REQUEST_OTP_CLEAN]: state => {
      state.requestOtp = initialState.requestOtp;
      return state;
    },

    [USER_TYPES.USER_RESET_PASSWORD]: state => {
      state.resetPassword.isFetching = true;
      state.resetPassword.isSuccess = false;
      state.resetPassword.error = undefined;
      return state;
    },
    [USER_TYPES.USER_RESET_PASSWORD_SUCCESS]: state => {
      state.resetPassword.isFetching = false;
      state.resetPassword.isSuccess = true;
      return state;
    },
    [USER_TYPES.USER_RESET_PASSWORD_FAILURE]: (state, action) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.isSuccess = false;
      state.resetPassword.error = action.payload;
      return state;
    },
    [USER_TYPES.USER_RESET_PASSWORD_CLEAN]: state => {
      state.resetPassword = initialState.resetPassword;
      return state;
    },

    [USER_TYPES.USER_UPDATE_PROFILE]: state => {
      state.updateProfile.isFetching = true;
      state.updateProfile.isSuccess = false;
      state.updateProfile.error = undefined;
      return state;
    },
    [USER_TYPES.USER_UPDATE_PROFILE_SUCCESS]: state => {
      state.updateProfile.isFetching = false;
      state.updateProfile.isSuccess = true;
      return state;
    },
    [USER_TYPES.USER_UPDATE_PROFILE_FAILURE]: (state, action) => {
      state.updateProfile.isFetching = false;
      state.updateProfile.isSuccess = false;
      state.updateProfile.error = action.payload;
      return state;
    },
    [USER_TYPES.USER_UPDATE_PROFILE_CLEAN]: state => {
      state.updateProfile = initialState.updateProfile;
      return state;
    },

    [USER_TYPES.USER_UPDATE_AVATAR]: state => {
      state.updateAvatar.isFetching = true;
      state.updateAvatar.isSuccess = false;
      state.updateAvatar.error = undefined;
      return state;
    },
    [USER_TYPES.USER_UPDATE_AVATAR_SUCCESS]: state => {
      state.updateAvatar.isFetching = false;
      state.updateAvatar.isSuccess = true;
      return state;
    },
    [USER_TYPES.USER_UPDATE_AVATAR_FAILURE]: (state, action) => {
      state.updateAvatar.isFetching = false;
      state.updateAvatar.isSuccess = false;
      state.updateAvatar.error = action.payload;
      return state;
    },
    [USER_TYPES.USER_UPDATE_AVATAR_CLEAN]: state => {
      state.updateAvatar = initialState.updateAvatar;
      return state;
    },
  },
});

export const {reducer: userReducer} = user;
export * from './actions';
export * from './saga';
