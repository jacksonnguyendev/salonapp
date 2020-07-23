import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SignInScreenComponent} from './Component';
import {useSignIn} from './useSignIn';
import {SCREEN_NAMES} from '../../constants';

export const SignInScreenContainer = () => {
  const navigation = useNavigation();
  const {signIn, error, formValues, onChangeFormValue, loading} = useSignIn();

  const handleNavigateTo = (screenName: keyof typeof SCREEN_NAMES) => {
    navigation.navigate(screenName);
  };

  return (
    <SignInScreenComponent
      onSignIn={signIn}
      loading={loading}
      onChangeFormValue={onChangeFormValue}
      onNavigateTo={handleNavigateTo}
      error={error}
      values={formValues}
    />
  );
};
