import {all} from 'redux-saga/effects';
import {userSagas} from './user';
import {authSagas} from './auth';
import {storeSagas} from './store';

export function* rootSaga() {
  yield all([userSagas(), authSagas(), storeSagas()]);
}
