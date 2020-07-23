import {useEffect, useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, RootState, ResponseError} from '../../core';
import {SCREEN_NAMES} from '../../constants';
import { navigationReset } from 'core/adapters/redux/navigation/actions';

export const useAuthorize = (): {
  authorize: () => void;
  loading: boolean;
  error?: ResponseError;
} => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(
    (state: RootState) => state.auth.auth.isFetching,
  );
  const {isSuccess, error} = useSelector((state: RootState) => state.auth.auth);

  const authorize = () => {
    dispatch(authActions.authroize());
  };

  useEffect(() => {
    if (isSuccess || error) {
      navigation.dispatch(
        navigationReset(
          isSuccess ? SCREEN_NAMES.MAIN_TAB : SCREEN_NAMES.SIGN_IN,
        ),
      );
    }
  }, [isSuccess, error]);

  return {
    authorize,
    loading: isLoading,
    error,
  };
};
