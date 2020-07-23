import React from 'react';
import {View} from 'react-native';
import {SPACINGS} from 'constants';

export const SizedBox = ({
  width = SPACINGS.default,
  height = SPACINGS.default,
}) => {
  return <View style={[{width, height}]} />;
};
