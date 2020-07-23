import {useSelector, useDispatch} from 'react-redux';
import {
  RootState,
  userActions,
  ResetPasswordCredentialData,
} from '../../../core';
import {useEffect} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants';
import {translate} from '../../../core';

export type FormRequestOtpCodeKey = 'email';

export const useChangePasswordWithOtp = () => {
  const navigtion = useNavigation();
  const dispatch = useDispatch();
  const {isFetching, error, isSuccess} = useSelector(
    (state: RootState) => state.user.resetPassword,
  );

  const resetPassword = (data: ResetPasswordCredentialData) => {
    dispatch(userActions.userResetPassword(data));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userActions.userResetPasswordClean());

      navigtion.navigate(SCREEN_NAMES.SUCCESS, {
        subTitle: translate(
          'forgotPasswordChangePassword.label_reset_passsword_success',
        ),
        onPressButton: () => {
          navigtion.dispatch(StackActions.popToTop());
          navigtion.navigate(SCREEN_NAMES.SIGN_IN);
        },
      });
    }

    return () => {
      // dispatch(userActions.userResetPasswordClean());
    };
  }, [isSuccess, isFetching, error, dispatch, navigtion]);

  useEffect(() => {
    return () => {
      dispatch(userActions.userResetPasswordClean());
    };
  }, []);

  return {resetPassword, loading: isFetching, error};
};
