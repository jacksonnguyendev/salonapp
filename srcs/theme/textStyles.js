import {StyleSheet} from 'react-native';
import {fontConfig, colorConfig} from 'theme';
import {responsive} from 'core';

export const textStyles = StyleSheet.create({
  headerTitle: {
    ...fontConfig.default.medium,
    letterSpacing: 0,
    lineHeight: responsive.getSize.h(24),
    fontSize: responsive.getSize.f(18),
    color: colorConfig.textLight,
  },
  title: {
    ...fontConfig.default.medium,
    letterSpacing: 0,
    color: colorConfig.text,
    lineHeight: responsive.getSize.h(20),
    fontSize: responsive.getSize.f(13),
  },
  subTitle: {
    ...fontConfig.default.regular,
    color: colorConfig.text,
    letterSpacing: 0,
    lineHeight: responsive.getSize.h(20),
  },
  description: {
    ...fontConfig.default.regular,
    color: colorConfig.description,
    letterSpacing: 0,
    fontSize: responsive.getSize.f(10),
    lineHeight: responsive.getSize.h(13),
  },
  paragrap: {
    ...fontConfig.default.regular,
    color: colorConfig.text,
    fontSize: responsive.getSize.f(13),
    lineHeight: responsive.getSize.h(20),
  },
  button: {
    color: colorConfig.input,
    fontSize: responsive.getSize.f(13),
    letterSpacing: 0,
    lineHeight: responsive.getSize.h(20),
    ...fontConfig.default.regular,
  },
  link: {
    textDecorationLine: 'underline',
    color: colorConfig.primary,
    fontSize: responsive.getSize.f(13),
    ...fontConfig.default.regular,
  },
  inputLabel: {
    color: colorConfig.inputLabel,
    fontSize: responsive.getSize.f(13),
    letterSpacing: 0,
    ...fontConfig.default.regular,
    lineHeight: responsive.getSize.h(15),
  },
  input: {
    color: colorConfig.input,
    fontSize: responsive.getSize.f(13),
    letterSpacing: 0,
    ...fontConfig.default.regular,
    lineHeight: responsive.getSize.h(20),
  },
  inputLabelDark: {
    color: colorConfig.inputLabelDark,
    fontSize: responsive.getSize.f(13),
    letterSpacing: 0,
    ...fontConfig.default.regular,
    lineHeight: responsive.getSize.h(15),
  },
  inputDark: {
    color: colorConfig.inputDark,
    fontSize: responsive.getSize.f(13),
    letterSpacing: 0,
    ...fontConfig.default.regular,
    lineHeight: responsive.getSize.h(15),
  },
  error: {
    ...fontConfig.default.regular,
    color: colorConfig.error,
    letterSpacing: 0,
    fontSize: responsive.getSize.f(11),
    lineHeight: responsive.getSize.h(15),
  },
  semiBold: {
    fontWeight: '500',
  },

  small: {
    fontSize: responsive.getSize.f(11),
  },
  medium: {
    fontSize: responsive.getSize.f(13),
    lineHeight: responsive.getSize.h(20),
  },
  large: {
    fontSize: responsive.getSize.f(16),
  },
  xLarge: {
    fontSize: responsive.getSize.f(18),
  },
  big: {
    fontSize: responsive.getSize.f(20),
    lineHeight: responsive.getSize.h(24),
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  justify: {
    textAlign: 'justify',
  },
});
