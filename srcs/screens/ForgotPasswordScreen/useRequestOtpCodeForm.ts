import {useSelector, useDispatch} from 'react-redux';
import {RootState, userActions} from '../../core';
import {useEffect, useState} from 'react';
import {SCREEN_NAMES} from '../../constants';
import {useNavigation} from '@react-navigation/native';

export type FormRequestOtpCodeKey = 'email';

export const useRequestOtpCodeForm = () => {
  const navigtion = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const {isFetching, error, isSuccess} = useSelector(
    (state: RootState) => state.user.requestOtp,
  );

  const requestOtp = (email: string) => {
    setEmail(email);
    dispatch(userActions.userRequestOtp({email}));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userActions.userRequestOtpClean());
      navigtion.navigate(SCREEN_NAMES.FOGOT_PASS_CHANGE_PASS, {
        email,
      });
    }
  }, [isSuccess, isFetching, error, dispatch, navigtion, email]);

  return {requestOtp, loading: isFetching, error};
};
