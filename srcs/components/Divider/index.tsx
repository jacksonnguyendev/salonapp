import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SPACINGS} from 'constants';
import {theme} from 'theme';

export const Divider = ({
  lineWidth = 1,
  type = 'horizontal',
}: {
  lineWidth?: number;
  type?: 'horizontal' | 'veritcal';
}) => {
  return (
    <View
      style={[
        type === 'horizontal'
          ? {
              height: lineWidth,
              maxHeight: lineWidth,
              flex: 1,
            }
          : {
              width: lineWidth,
              maxWidth: lineWidth,
              flex: 1,
            },
        {backgroundColor: theme.colors.border},
      ]}
    />
  );
};
