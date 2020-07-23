import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {theme} from '../../theme';

export const EmptyLayout = (
  props: React.PropsWithChildren<{
    removeSafeEdge?: Edge[];
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
  }>,
) => {
  const {removeSafeEdge = [], backgroundColor, style} = props;
  const safeEdges: Edge[] = ['top', 'bottom', 'left', 'right'];
  const filtered = safeEdges.filter(item => {
    return removeSafeEdge.indexOf(item) < 0;
  });

  return (
    <SafeAreaView
      edges={filtered}
      style={[
        styles.safeContainer,
        (backgroundColor && {backgroundColor}) || null,
        style,
      ]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
});
