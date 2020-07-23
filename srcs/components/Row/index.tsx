import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export const Row = (props: ViewProps & {children?: JSX.Element[]}) => {
  return <View style={[styles.row, props.style]} {...props} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
