import React from 'react';
import {Searchbar as PSearchbar, IconButton} from 'react-native-paper';
import {StyleSheet, Platform} from 'react-native';
import {responsive} from 'core';
import {textStyles, theme} from 'theme';
import {ImageSource} from 'assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PSearchbarProps = React.ComponentProps<typeof PSearchbar>;
export type SearchbarProps = PSearchbarProps & {};

export const Searchbar = (props: SearchbarProps) => {
  const {style, inputStyle, ...rest} = props;
  return (
    <PSearchbar
      style={[styles.container, StyleSheet.flatten(style)]}
      placeholderTextColor={theme.colors.placeholder}
      inputStyle={[
        {
          fontSize: textStyles.inputDark.fontSize,
          color: theme.colors.text,
          fontFamily: textStyles.inputDark.fontFamily,
        },
        inputStyle,
      ]}
      {...rest}
      icon={({}) => (
        <IconButton
          accessibilityStates
          icon={ImageSource.Search}
          size={responsive.getSize.w(16)}
        />
      )}
      clearIcon={props => (
        <IconButton
          accessibilityStates
          icon={ImageSource.Close}
          size={responsive.getSize.w(12)}
          color={props.color}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    height: responsive.getSize.h(40),
    borderRadius: responsive.getSize.h(50) / 2,

    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,

    elevation: 5,
  },
});
