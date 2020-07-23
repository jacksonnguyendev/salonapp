import {createAction} from '@reduxjs/toolkit';
import {USER_TYPES} from './types';
import {
  User,
  ICredential,
  ResetPasswordCredentialData,
  SignUpCredentialType,
  IUserDataEditable,
  AttachmentUpload,
} from '../../../entities';
import {ResponseError} from '../../../entities/ResponseError';

const userStoreName = 'user';

const updateUser = createAction<User>(
  `${userStoreName}/${USER_TYPES.UPDATE_USER}`,
);

const userSignIn = createAction<{credential: ICredential}>(
  `${userStoreName}/${USER_TYPES.USER_SIGN_IN}`,
);
const userSignInSuccess = createAction(
  `${userStoreName}/${USER_TYPES.USER_SIGN_IN_SUCCESS}`,
);
const userSignInFailure = createAction<ResponseError>(
  `${userStoreName}/${USER_TYPES.USER_SIGN_IN_FAILURE}`,
);
const userSignInClean = createAction(
  `${userStoreName}/${USER_TYPES.USER_SIGN_IN_CLEAN}`,
);

const userSignUp = createAction<SignUpCredentialType>(
  `${userStoreName}/${USER_TYPES.USER_SIGN_UP}`,
);
const userSignUpSuccess = createAction(
  `${userStoreName}/${USER_TYPES.USER_SIGN_UP_SUCCESS}`,
);
const userSignUpFailure = createAction<ResponseError>(
  `${userStoreName}/${USER_TYPES.USER_SIGN_UP_FAILURE}`,
);
const userSignUpClean = createAction(
  `${userStoreName}/${USER_TYPES.USER_SIGN_UP_CLEAN}`,
);

const userRequestOtp = createAction<{
  email: string;
}>(`${userStoreName}/${USER_TYPES.USER_REQUEST_OTP}`);
const userRequestOtpSuccess = createAction(
  `${userStoreName}/${USER_TYPES.USER_REQUEST_OTP_SUCCESS}`,
);
const userRequestOtpFailure = createAction<ResponseError>(
  `${userStoreName}/${USER_TYPES.USER_REQUEST_OTP_FAILURE}`,
);
const userRequestOtpClean = createAction(
  `${userStoreName}/${USER_TYPES.USER_REQUEST_OTP_CLEAN}`,
);

const userResetPassword = createAction<ResetPasswordCredentialData>(
  `${userStoreName}/${USER_TYPES.USER_RESET_PASSWORD}`,
);
const userResetPasswordSuccess = createAction(
  `${userStoreName}/${USER_TYPES.USER_RESET_PASSWORD_SUCCESS}`,
);
const userResetPasswordFailure = createAction<ResponseError>(
  `${userStoreName}/${USER_TYPES.USER_RESET_PASSWORD_FAILURE}`,
);
const userResetPasswordClean = createAction(
  `${userStoreName}/${USER_TYPES.USER_RESET_PASSWORD_CLEAN}`,
);

const userUpdateProfile = createAction<IUserDataEditable>(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_PROFILE}`,
);
const userUpdateProfileSuccess = createAction(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_PROFILE_SUCCESS}`,
);
const userUpdateProfileFailure = createAction<ResponseError>(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_PROFILE_FAILURE}`,
);
const userUpdateProfileClean = createAction(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_PROFILE_CLEAN}`,
);

const userUpdateAvatar = createAction<AttachmentUpload>(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_AVATAR}`,
);
const userUpdateAvatarSuccess = createAction(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_AVATAR_SUCCESS}`,
);
const userUpdateAvatarFailure = createAction<ResponseError>(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_AVATAR_FAILURE}`,
);
const userUpdateAvatarClean = createAction(
  `${userStoreName}/${USER_TYPES.USER_UPDATE_AVATAR_CLEAN}`,
);

export const userActions = {
  updateUser,
  userSignIn,
  userSignInSuccess,
  userSignInFailure,
  userSignInClean,
  userSignUp,
  userSignUpSuccess,
  userSignUpFailure,
  userSignUpClean,
  userRequestOtp,
  userRequestOtpSuccess,
  userRequestOtpFailure,
  userRequestOtpClean,
  userResetPassword,
  userResetPasswordSuccess,
  userResetPasswordFailure,
  userResetPasswordClean,
  userUpdateProfile,
  userUpdateProfileSuccess,
  userUpdateProfileFailure,
  userUpdateProfileClean,
  userUpdateAvatar,
  userUpdateAvatarSuccess,
  userUpdateAvatarFailure,
  userUpdateAvatarClean
};
