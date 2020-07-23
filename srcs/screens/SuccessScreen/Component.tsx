import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';

import {EmptyLayout, Button} from '../../components';
import {ImageSource} from '../../assets';
import {rootStyles} from '../../theme/styles';
import {responsive} from '../../core';
import {textStyles} from '../../theme/textStyles';
import {SPACINGS} from '../../constants';

export interface SuccessScreenComponentProps {
  title: string;
  subTitle: string;
  buttonLabel: string;
  onPressButton: () => void;
}

export const SuccessScreenComponent = (props: SuccessScreenComponentProps) => {
  const {title, subTitle, buttonLabel, onPressButton} = props;

  return (
    <EmptyLayout>
      <View style={[{padding: SPACINGS.default, flex: 1}]}>
        <View style={[rootStyles.flexSmall, rootStyles.alignCenter]}>
          <Image
            source={ImageSource.Success}
            style={[styles.logo]}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text style={[textStyles.title, textStyles.large, styles.title]}>
            {title}
          </Text>
          <Text
            style={[textStyles.subTitle, styles.subTitle, textStyles.center]}>
            {subTitle}
          </Text>
        </View>
        <Button onPress={() => onPressButton()}>{buttonLabel}</Button>
      </View>
    </EmptyLayout>
  );
};

SuccessScreenComponent.defaultProps = {
  title: 'Success!',
  subTitle: '',
  buttonLabel: 'Done',
  onPressButton: () => {},
};

const styles = StyleSheet.create({
  logo: {
    marginTop: responsive.getSize.h(140),
    width: responsive.getSize.w(160),
  },
  title: {
    marginTop: responsive.getSize.h(30),
  },
  subTitle: {
    marginTop: responsive.getSize.h(10),
  },
});
