import React from 'react';
import {Component} from './Component';
import {useAccountForm} from './useAccountForm';
import {useNavigation} from '@react-navigation/native';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const {
    values,
    formErrors,
    onChangeFormValue,
    isChanged,
    onSubmit,
    loading,
    error,
    hideError,
    onChangeAvatar,
    isAvatarUploading
  } = useAccountForm();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Component
      values={values}
      formErrors={formErrors}
      onChangeFormValue={onChangeFormValue}
      onGoBack={handleGoBack}
      isChanged={isChanged}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      hideError={hideError}
      onChangeAvatar={onChangeAvatar}
      isAvatarUploading={isAvatarUploading}
    />
  );
};
