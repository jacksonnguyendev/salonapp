import {Button as PButton} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rootStyles} from '../../theme/styles';
import {theme} from '../../theme';
import {responsive} from '../../core';

type BPuttonProps = React.ComponentProps<typeof PButton>;

type ButtonProps = BPuttonProps & {};

export const Button = (props: ButtonProps) => {
  const {children, style, ...rest} = props;

  const getLabelStyle = () => {
    return [
      styles.labelStyle,
      (rest.mode === 'outlined' || rest.mode === 'text') && {
        color: theme.colors.primary,
      },
      rest.labelStyle,
    ];
  };

  return (
    <PButton
      uppercase={false}
      mode="contained"
      style={[
        styles.container,
        rest.disabled && {
          backgroundColor: theme.colors.buttonDisabled,
        },
        rest.mode === 'outlined' && {
          borderWidth: 1,
          borderColor: theme.colors.primary,
          backgroundColor: 'transparent',
        },
        style,
      ]}
      labelStyle={getLabelStyle()}
      contentStyle={[rootStyles.fullHeight]}
      theme={{colors: {disabled: 'red'}}}
      {...rest}>
      {children}
    </PButton>
  );
};

console.log(theme);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    height: responsive.getSize.h(40),
    borderRadius: responsive.getSize.h(20),
  },
  labelStyle: {
    color: theme.colors.buttonText,
    ...theme.fonts.default.regular,
  },
});
