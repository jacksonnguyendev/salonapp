import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '../../theme';

type RNLinkTextProps = React.ComponentProps<typeof Text>;

type LinkTextProps = RNLinkTextProps & {
  children: string;
  onPress?: () => void;
};

export const LinkText = (props: LinkTextProps) => {
  const {children, onPress = () => {}, style, ...rest} = props;
  return (
    <Text {...props} style={[style, styles.linkText]} onPress={() => onPress()}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  linkText: {
    textDecorationLine: 'underline',
    color: theme.colors.primary,
    ...theme.fonts.default.regular
  },
});
