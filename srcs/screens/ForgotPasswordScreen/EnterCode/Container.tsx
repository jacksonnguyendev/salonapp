import React from 'react';
import {useFormik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  ForgotPasswordChangePasswordScreenComponent,
  ForgotPasswordChangePasswordFormValue,
} from './Component';
import {useCountDownResend} from './useCountDownResend';
import {useRequestOtpCodeForm} from '../useRequestOtpCodeForm';
import {useChangePasswordWithOtp} from './useChangePasswordWithOtp';

import {resetPasswordSchema} from './validationSchemas';

export const ForgotPasswordChangePasswordScreenContainer = () => {
  const navigtion = useNavigation();
  const route = useRoute();
  const {email = undefined} = route.params;

  const {getTimeLeft, resetTime, isAvalibleResend} = useCountDownResend();
  const {
    requestOtp,
    loading: resendLoading,
    error: resendError,
  } = useRequestOtpCodeForm();
  const {
    resetPassword,
    loading: resetLoading,
    error: resetError,
  } = useChangePasswordWithOtp();

  const handleOnPressResend = async () => {
    if (isAvalibleResend && email) {
      await requestOtp(email);
      resetTime();
    }
  };

  const form = useFormik<ForgotPasswordChangePasswordFormValue>({
    initialValues: {
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async values => {
      await resetPassword({
        otpCode: values.code || '',
        newPassword: values.newPassword || '',
        confirmNewPassword: values.confirmPassword || '',
        email: email || '',
      });
    },
    validationSchema: resetPasswordSchema,
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors: formErrors,
  } = form;

  return (
    <ForgotPasswordChangePasswordScreenComponent
      email={email}
      onChangeText={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      formValues={values}
      onGoBack={() => navigtion.goBack()}
      loading={resetLoading}
      error={resetError || resendError}
      validationErrors={formErrors}
      resendTime={getTimeLeft()}
      isAvalibleResend={isAvalibleResend}
      onPressResend={handleOnPressResend}
      resendLoading={resendLoading}
    />
  );
};
