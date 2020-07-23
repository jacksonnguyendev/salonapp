import {UserApiService} from '../../../services';
import {AuthorizeInteractor} from '../../../useCases/AuthorizeInteractor';
import {authActions} from './actions';
import {userActions} from '../user';
import {put, takeLatest, all} from 'redux-saga/effects';
import {ResponseError} from '../../../entities/ResponseError';
import {LogoutInteractor} from '../../../useCases/LogoutInteractor';
import AsyncStorage from '@react-native-community/async-storage';
import {CONFIGS} from '../../../../constants';

export function* authorizeSaga() {
  try {
    const service = new UserApiService();
    const interactor = new AuthorizeInteractor(service);

    const user = yield interactor.authorize();
    yield put(authActions.authroizeSuccess(user));
    yield put(userActions.updateUser(user));
  } catch (e) {
    console.log(e)
    const error = new ResponseError(e);
    yield put(authActions.authroizeFailure(error));
  }
}

export function* logoutSaga() {
  try {
    // const service = new UserApiService();
    // const interactor = new LogoutInteractor(service);

    // yield interactor.logout();

    yield AsyncStorage.removeItem(CONFIGS.storeKeys.accessToken);
    yield AsyncStorage.removeItem(CONFIGS.storeKeys.refreshToken);

    yield put(authActions.logoutSuccess());
  } catch (e) {
    const error = new ResponseError(e);
    yield put(authActions.logoutFailure(error));
  }
}

export function* authSagas() {
  yield all([
    takeLatest(authActions.authroize.type, authorizeSaga),
    takeLatest(authActions.logout.type, logoutSaga),
  ]);
}
