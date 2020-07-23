import {all, put, takeLatest, select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Credential,
  SignUpCredential,
  ICredential,
  ResetPasswordCredentialData,
  SignUpCredentialType,
  IUserDataEditable,
  User,
  AttachmentUpload,
} from '../../../entities';
import {UserApiService, AttachmentApiService} from '../../../services';
import {
  SignInInteractor,
  UserUpdateProfileInteractor,
  RequestOtpInteractor,
  ResetPasswordInteractor,
  UploadAvatarInteractor,
} from '../../../useCases';
import {userActions} from './index';
import {SignUpInteractor} from '../../../useCases/SignUpInteractor';
import {ResponseError} from '../../../entities/ResponseError';
import {CONFIGS} from '../../../../constants';
import {RootState} from '../reducer';
import { authActions } from '../auth';

interface SignInActionType {
  type: string;
  payload: {
    credential: ICredential;
  };
}

export function* signInSaga(action: SignInActionType) {
  const {credential} = action.payload;
  try {
    const service = new UserApiService();
    const interactor = new SignInInteractor(service);

    const sessionData = yield interactor.signIn(
      new Credential(credential.username, credential.password),
    );

    yield AsyncStorage.setItem(
      CONFIGS.storeKeys.accessToken,
      sessionData.accessToken,
    );

    yield AsyncStorage.setItem(
      CONFIGS.storeKeys.refreshToken,
      sessionData.refreshToken,
    );
    yield put(authActions.authroize()); // auth and fetch user data
    yield put(userActions.userSignInSuccess());
  } catch (error) {
    yield put(userActions.userSignInFailure(new ResponseError(error)));
  }
}

interface SignUpActionType {
  type: string;
  payload: SignUpCredentialType;
}

export function* signUpSaga(action: SignUpActionType) {
  try {
    const service = new UserApiService();
    const interactor = new SignUpInteractor(service);

    yield interactor.signUp(new SignUpCredential(action.payload));
    yield put(userActions.userSignUpSuccess());
  } catch (e) {
    const error = new ResponseError(e);
    yield put(userActions.userSignUpFailure(error));
  }
}

interface RequestOtpActionType {
  type: string;
  payload: {
    email: string;
  };
}

export function* requestOtpSaga(action: RequestOtpActionType) {
  const {email} = action.payload;
  try {
    const service = new UserApiService();
    const interactor = new RequestOtpInteractor(service);

    const success = yield interactor.requestOtp(email);
    yield put(userActions.userRequestOtpSuccess());
  } catch (e) {
    const error = new ResponseError(e);
    yield put(userActions.userRequestOtpFailure(error));
  }
}

interface ResetPasswordActionType {
  type: string;
  payload: ResetPasswordCredentialData;
}

export function* resetPasswordSaga(action: ResetPasswordActionType) {
  try {
    const service = new UserApiService();
    const interactor = new ResetPasswordInteractor(service);

    const success = yield interactor.resetPassword(action.payload);
    yield put(userActions.userResetPasswordSuccess());
  } catch (e) {
    const error = new ResponseError(e);
    yield put(userActions.userResetPasswordFailure(error));
  }
}

interface UpdateProfileActionType {
  type: string;
  payload: IUserDataEditable;
}

export function* updateProfileSaga(action: UpdateProfileActionType) {
  try {
    const service = new UserApiService();
    const interactor = new UserUpdateProfileInteractor(service);
    const userData = yield select((state: RootState) => state.user.data?.getData() || {});

    yield interactor.updateProfile(userData.id, action.payload);
    yield put(userActions.updateUser(new User({...userData, ...action.payload})))
    yield put(userActions.userUpdateProfileSuccess());
    yield put(userActions.userUpdateProfileClean());
  } catch (e) {
    const error = new ResponseError(e);
    yield put(userActions.userUpdateProfileFailure(error));
  }
}

interface UpdateAvatarActionType {
  type: string;
  payload: AttachmentUpload;
}

export function* updateAvatarSaga(action: UpdateAvatarActionType) {
  try {
    const service = new AttachmentApiService();
    const interactor = new UploadAvatarInteractor(service);
    const userService = new UserApiService();
    const updateInteractor = new UserUpdateProfileInteractor(userService);
    const userData = yield select((state: RootState) => state.user.data?.getData() || {});

    const result = yield interactor.excute({ file: action.payload });
    const newUserData = {...userData, avatar: result};

    yield updateInteractor.updateProfile(userData.id, {avatar: result});

    yield put(userActions.updateUser(new User(newUserData)))
    yield put(userActions.userUpdateAvatarSuccess());
  } catch (e) {
    const error = new ResponseError(e);
    yield put(userActions.userUpdateAvatarFailure(error));
  }
}

export function* userSagas() {
  yield all([
    takeLatest(userActions.userSignIn.type, signInSaga),
    takeLatest(userActions.userSignUp.type, signUpSaga),
    takeLatest(userActions.userRequestOtp.type, requestOtpSaga),
    takeLatest(userActions.userResetPassword.type, resetPasswordSaga),
    takeLatest(userActions.userUpdateProfile.type, updateProfileSaga),
    takeLatest(userActions.userUpdateAvatar.type, updateAvatarSaga),
  ]);
}
