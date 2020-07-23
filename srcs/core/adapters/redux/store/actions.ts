import {createAction} from '@reduxjs/toolkit';
import {STORE_TYPES} from './types';
import {IListStore, IStore} from 'core/entities/Store';
import {IResponseError} from 'core/entities';
import {StoreFilterParams} from 'core/services/ApiService/Store';
import { StoreDetailExcuteParams } from 'core/useCases/Store';

export const storeName = 'store';

const searchStore = createAction<StoreFilterParams>(
  `${storeName}/${STORE_TYPES.SEARCH}`,
);
const searchStoreSuccess = createAction<IListStore>(
  `${storeName}/${STORE_TYPES.SEARCH_SUCCESS}`,
);
const searchStoreFailure = createAction<IResponseError>(
  `${storeName}/${STORE_TYPES.SEARCH_FAILURE}`,
);
const searchStoreClean = createAction(
  `${storeName}/${STORE_TYPES.SEARCH_CLEAN}`,
);

const getStoreDetail = createAction<StoreDetailExcuteParams>(
  `${storeName}/${STORE_TYPES.GET_STORE_DETAIL}`,
);
const getStoreDetailSuccess = createAction<IStore>(
  `${storeName}/${STORE_TYPES.GET_STORE_DETAIL_SUCCESS}`,
);
const getStoreDetailFailure = createAction<IResponseError>(
  `${storeName}/${STORE_TYPES.GET_STORE_DETAIL_FAILURE}`,
);
const getStoreDetailClean = createAction(
  `${storeName}/${STORE_TYPES.GET_STORE_DETAIL_CLEAN}`,
);

export const storeActions = {
  searchStore,
  searchStoreSuccess,
  searchStoreFailure,
  searchStoreClean,
  getStoreDetail,
  getStoreDetailSuccess,
  getStoreDetailFailure,
  getStoreDetailClean
};
