import React from 'react';
import {Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {theme} from 'theme';
import {ImageSource} from 'assets';

export const GobackButton = ({
  color = theme.colors.textLight,
  width = 16,
  height = 16,
}) => {
  const navigation = useNavigation();

  return (
    <Appbar.Action
      accessibilityStates
      icon={() => (
        <Image
          source={ImageSource.ArrowLeft}
          style={{tintColor: color, width, height}}
        />
      )}
      onPress={() => navigation.goBack()}
    />
  );
};
