import React from 'react';
import {Component} from './Component';
import {RootState, IUserData} from 'core';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useLogout } from './useLogout';
import { SCREEN_NAMES } from 'constants';

export const AccountScreen = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const userData: IUserData | undefined = user && user.getData() ;

  const {onPressLogout, askPopupRender} = useLogout();
  const navigation = useNavigation();

  const handleNavigateTo = (screenName: keyof typeof SCREEN_NAMES) => {
    navigation.navigate(screenName);
  };

  return (
    <>
      <Component
        userName={`${userData?.firstName} ${userData?.lastName}`}
        userEmail={userData?.email}
        userAvatarUri={userData?.avatar?.filePath}
        onPressLogout={onPressLogout}
        navigateTo={handleNavigateTo}
      />
      {askPopupRender()}
    </>
  );
};
