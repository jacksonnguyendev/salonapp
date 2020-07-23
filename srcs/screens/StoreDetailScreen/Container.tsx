import {get} from 'lodash';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {storeActions, RootState} from 'core';
import {StoreDetailScreenComponent} from './Component';

export const StoreDetailScreenContainer = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const id = get(route, 'params.id', undefined);
  const {data} = useSelector((state: RootState) => state.store.detail);
  const {storeInfo, stylistInfo} = data?.toJSON() || {};

  useEffect(() => {
    if (id) {
      dispatch(storeActions.getStoreDetail({id: id}));
    }
  }, []);

  return <StoreDetailScreenComponent storeInfo={storeInfo} stylistInfo={stylistInfo} />;
};
