import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';

import {SCREEN_NAMES, BOTTOM_TABBAR_HEIGHT} from '../constants';

import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  ForgotPassswordChangePasswordScreen,
  TermsAndConditionsScreen,
  SuccessScreen,
  HomeScreen,
  AccountScreen,
  AppointmentScreen,
  MessageScreen,
  ProfileScreen,
  StoreDetailScreen
} from '../screens';
import {ImageSource} from 'assets';
import {theme} from 'theme';
import {responsive} from 'core';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TABICONS = Object.freeze({
  [SCREEN_NAMES.HOME]: ImageSource.Account,
  [SCREEN_NAMES.ACCOUNT]: ImageSource.Account,
  [SCREEN_NAMES.APPPOINMENTS]: ImageSource.Appointment,
  [SCREEN_NAMES.MESSAGE]: ImageSource.Message,
});

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({size, color}) => {
          return (
            <IconButton
              icon={TABICONS[route.name]}
              style={{borderRadius: 0}}
              color={color}
              size={size}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        style: {height: BOTTOM_TABBAR_HEIGHT},
      }}>
      <Tab.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
      {/* <Tab.Screen name={SCREEN_NAMES.ACCOUNT} component={AccountScreen} /> */}
      <Tab.Screen
        name={SCREEN_NAMES.APPPOINMENTS}
        component={AppointmentScreen}
      />
      <Tab.Screen name={SCREEN_NAMES.MESSAGE} component={MessageScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.SPLASH}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN_NAMES.SPLASH} component={SplashScreen} />
        <Stack.Screen name={SCREEN_NAMES.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={SCREEN_NAMES.SIGN_UP} component={SignUpScreen} />
        <Stack.Screen
          name={SCREEN_NAMES.FOGOT_PASS_CHANGE_PASS}
          component={ForgotPassswordChangePasswordScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.FOGOT_PASS}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.TERMS_AND_CONDITIONS}
          component={TermsAndConditionsScreen}
        />
        <Stack.Screen name={SCREEN_NAMES.SUCCESS} component={SuccessScreen} />
        <Stack.Screen name={SCREEN_NAMES.ACCOUNT} component={AccountScreen} />
        <Stack.Screen name={SCREEN_NAMES.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={SCREEN_NAMES.STORE_DETAIL} component={StoreDetailScreen} />


        <Stack.Screen name={SCREEN_NAMES.MAIN_TAB} component={MainTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
