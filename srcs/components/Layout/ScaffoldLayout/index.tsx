import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import {Appbar} from 'react-native-paper';
import {theme, textStyles, rootStyles} from 'theme';
import {ImageSource} from 'assets';
import {EmptyLayout} from '../EmptyLayout';
import {useNavigation} from '@react-navigation/native';

export interface ScaffoldLayoutProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  footerStyle?: StyleProp<ViewStyle>;
  onPressGoBack?: () => void;
}

const DefaultHeader = (props: ScaffoldLayoutProps & {}) => {
  const {headerStyle, headerAction = null, onPressGoBack} = props;
  const navigation = useNavigation();
  return (
    <Appbar.Header accessibilityStates style={[styles.header, headerStyle]}>
      <Appbar.Action
        accessibilityStates
        icon={ImageSource.ArrowLeft}
        color={theme.colors.dark}
        onPress={() => {
          (onPressGoBack && onPressGoBack()) || navigation.goBack();
        }}
      />
      <Appbar.Content
        accessibilityStates
        title="Account"
        titleStyle={[textStyles.title, textStyles.big, textStyles.left]}
        style={[{alignItems: 'flex-start'}]}
      />
      {headerAction}
    </Appbar.Header>
  );
};

export const ScaffoldLayout = (props: ScaffoldLayoutProps) => {
  const {header, footer = null} = props;

  return (
    <View style={[styles.page]}>
      {(header && header) || <DefaultHeader {...props} />}
      <EmptyLayout removeSafeEdge={['top']} style={[styles.body]}>
        {props.children}
        {footer}
      </EmptyLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.header,
  },
  body: {
    flex: 1,
  },
  footer: {},
});
