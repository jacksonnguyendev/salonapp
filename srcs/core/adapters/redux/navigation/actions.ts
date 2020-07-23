import {SCREEN_NAMES} from 'constants';
import {CommonActions} from '@react-navigation/native';

export const navigationReset = (
  ScreenName: keyof typeof SCREEN_NAMES,
  params?: {[key: string]: string},
) => {
  return CommonActions.reset({
    index: 0,
    routes: [{name: ScreenName, params}],
  });
};
