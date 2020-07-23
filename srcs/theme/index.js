import {DefaultTheme} from 'react-native-paper';
import {colorConfig} from './colors';
import {fontConfig} from './fonts';

export const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: colorConfig,
  fonts: fontConfig,
};

export * from './styles';
export * from './textStyles';
export * from './colors';
export * from './fonts'