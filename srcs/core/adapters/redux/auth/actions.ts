import {createAction} from '@reduxjs/toolkit';
import {AUTH_TYPES} from './types';
import {ResponseError} from '../../../entities/ResponseError';
import {User} from '../../../entities';

export const authStoreName = 'auth';

const authroize = createAction(`${authStoreName}/${AUTH_TYPES.AUTHORIZE}`);
const authroizeSuccess = createAction<User>(
  `${authStoreName}/${AUTH_TYPES.AUTHORIZE_SUCCESS}`,
);
const authroizeFailure = createAction<ResponseError>(
  `${authStoreName}/${AUTH_TYPES.AUTHORIZE_FAILURE}`,
);

const logout = createAction(`${authStoreName}/${AUTH_TYPES.LOGOUT}`);
const logoutSuccess = createAction(
  `${authStoreName}/${AUTH_TYPES.LOGOUT_SUCCESS}`,
);
const logoutFailure = createAction<ResponseError>(
  `${authStoreName}/${AUTH_TYPES.LOGOUT_ERROR}`,
);
const logoutClean = createAction(`${authStoreName}/${AUTH_TYPES.LOGOUT_CLEAN}`);

export const authActions = {
  authroize,
  authroizeSuccess,
  authroizeFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  logoutClean,
};
