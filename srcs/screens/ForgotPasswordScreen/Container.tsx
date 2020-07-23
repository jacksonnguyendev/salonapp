import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ForgotPasswordScreenComponent} from './Component';
import {useRequestOtpCodeForm} from './useRequestOtpCodeForm';
import {userActions} from '../../core';
import {SCREEN_NAMES} from '../../constants';

export const ForgotPasswordScreenContainer = () => {
  const navigtion = useNavigation();
  const dispatch = useDispatch();
  const {requestOtp, loading, error} = useRequestOtpCodeForm();

  const form = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async values => {
      await requestOtp(values.email);
    },
  });

  const {handleChange, handleBlur, handleSubmit, values} = form;

  const handleOnNavigate = (screenName: keyof typeof SCREEN_NAMES) => {
    navigtion.navigate(screenName);
  };

  useEffect(() => {
    dispatch(userActions.userRequestOtpClean());
  }, [form.values.email]);

  return (
    <ForgotPasswordScreenComponent
      onChangeText={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      emailValue={values.email}
      onGoBack={() => navigtion.goBack()}
      onNavigate={handleOnNavigate}
      loading={loading}
      error={error}
    />
  );
};
