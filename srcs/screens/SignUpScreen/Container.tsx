import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SignUpScreenComponent} from './Component';
import {useSignUp, SignUpFormKey, SignUpFormValue} from './useSignUp';

export const SignUpScreenContainer = () => {
  const navigation = useNavigation();
  const {
    signUp,
    changeFormValue,
    formValues,
    formErrors,
    loading,
    error,
  } = useSignUp();

  return (
    <SignUpScreenComponent
      onSubmit={signUp}
      onChangeValue={(key: SignUpFormKey, value: SignUpFormValue) =>
        changeFormValue(key, value)
      }
      loading={loading}
      onGoBack={() => navigation.goBack()}
      values={formValues}
      formErrors={formErrors}
      errorTitle={error?.getErrorTitle()}
    />
  );
};
