import Configs from 'react-native-config';
import {responsive} from '../core/utils/responsive';

export * from './datetime.const';

export enum SCREEN_NAMES {
  SPLASH = 'SPLASH',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  FOGOT_PASS = 'FOGOT_PASS',
  FOGOT_PASS_CHANGE_PASS = 'FOGOT_PASS_CHANGE_PASS',
  TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
  SUCCESS = 'SUCCESS',
  HOME = 'HOME',
  APPPOINMENTS = 'APPPOINMENTS',
  ACCOUNT = 'ACCOUNT',
  MESSAGE = 'MESSAGE',
  MAIN_TAB = 'MAIN_TAB',
  PROFILE = 'PROFILE',
  STORE_DETAIL = 'STORE_DETAIL',
}

export const CONFIGS = {
  apiUrl: Configs.API_URL,
  storeKeys: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  },
};

export const SPACINGS = {
  tiny: responsive.getSize.h(10),
  small: responsive.getSize.h(15),
  default: responsive.getSize.h(20),
  large: responsive.getSize.h(25),
  xLarge: responsive.getSize.h(30),
  big: responsive.getSize.h(40),
};

export const SAFE_HIT_SLOP = {top: 10, right: 10, left: 10, bottom: 10};

export const BOTTOM_TABBAR_HEIGHT = responsive.getSize.h(80);
