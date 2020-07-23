import {createSlice} from '@reduxjs/toolkit';
import {STORE_TYPES} from './types';
import {IListStore, ListStore, IStore} from 'core/entities/Store';
import {IResponseError} from 'core/entities';

export type StoreStateType = {
  list: {
    data: any[];
  };
  search: {
    data: IListStore;
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
  detail: {
    data?: IStore;
    isFetching: boolean;
    isSuccess: boolean;
    error?: IResponseError;
  };
};

const initialState: StoreStateType = {
  list: {
    data: [],
  },
  search: {
    data: new ListStore(),
    isFetching: false,
    isSuccess: true,
    error: undefined,
  },
  detail: {
    data: undefined,
    isFetching: false,
    isSuccess: false,
    error: undefined,
  },
};

const store = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
    [STORE_TYPES.SEARCH]: state => {
      state.search.isFetching = true;
      state.search.isSuccess = false;
      state.search.error = undefined;
      return state;
    },
    [STORE_TYPES.SEARCH_SUCCESS]: (state, action) => {
      state.search.isFetching = false;
      state.search.isSuccess = true;
      state.search.data = action.payload;
      return state;
    },
    [STORE_TYPES.SEARCH_FAILURE]: (state, action) => {
      state.search.isFetching = false;
      state.search.isSuccess = false;
      state.search.error = action.payload;
      return state;
    },
    [STORE_TYPES.SEARCH_CLEAN]: state => {
      state.search = initialState.search;
      return state;
    },

    [STORE_TYPES.GET_STORE_DETAIL]: state => {
      state.detail.isFetching = true;
      state.detail.isSuccess = false;
      state.detail.error = undefined;
      return state;
    },
    [STORE_TYPES.GET_STORE_DETAIL_SUCCESS]: (state, action) => {
      state.detail.isFetching = false;
      state.detail.isSuccess = true;
      state.detail.data = action.payload;
      return state;
    },
    [STORE_TYPES.GET_STORE_DETAIL_FAILURE]: (state, action) => {
      state.detail.isFetching = false;
      state.detail.isSuccess = false;
      state.detail.error = action.payload;
      return state;
    },
    [STORE_TYPES.GET_STORE_DETAIL_CLEAN]: state => {
      state.detail = initialState.detail;
      return state;
    },
  },
});

export const {reducer: storeReducer} = store;
export * from './actions';
export * from './saga';
