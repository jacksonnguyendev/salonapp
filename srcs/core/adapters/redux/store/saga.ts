import {all, put, takeLatest} from 'redux-saga/effects';
import {
  StoreFilterParams,
  StoreApiService,
} from 'core/services/ApiService/Store';
import {SearchStoreInteractor} from 'core/useCases/Store/SearchStoreInteractor';
import {storeActions} from './actions';
import {ResponseError} from 'core/entities';
import {IStore} from 'core/entities/Store';
import {
  StoreDetailExcuteParams,
  SeeStoreDetailInteractor,
} from 'core/useCases/Store';

interface SearchActionType {
  type: string;
  payload: StoreFilterParams;
}

export function* searchStoreSaga(action: SearchActionType) {
  try {
    const service = new StoreApiService();
    const interactor = new SearchStoreInteractor(service);

    const list = yield interactor.excute(action.payload);
    console.log(list);
    yield put(storeActions.searchStoreSuccess(list));
  } catch (e) {
    console.log(e);
    const error = new ResponseError(e);
    yield put(storeActions.searchStoreFailure(error));
  }
}

interface StoreDetailActionType {
  type: string;
  payload: StoreDetailExcuteParams;
}

export function* storeDetailStoreSaga(action: StoreDetailActionType) {
  try {
    const service = new StoreApiService();
    const interactor = new SeeStoreDetailInteractor(service);

    const detail = yield interactor.excute(action.payload);
    yield put(storeActions.getStoreDetailSuccess(detail));
  } catch (e) {
    const error = new ResponseError(e);
    yield put(storeActions.getStoreDetailFailure(error));
  }
}

export function* storeSagas() {
  yield all([takeLatest(storeActions.searchStore.type, searchStoreSaga)]);
  yield all([
    takeLatest(storeActions.getStoreDetail.type, storeDetailStoreSaga),
  ]);
}
