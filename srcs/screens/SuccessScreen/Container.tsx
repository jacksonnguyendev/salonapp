import React from 'react';
import {SuccessScreenComponent} from './Component';
import {useRoute} from '@react-navigation/native';
import {get} from 'lodash';

export const SuccessScreen = () => {
  const route = useRoute();

  return (
    <SuccessScreenComponent
      title={get(route.params, 'title', undefined)}
      subTitle={get(route.params, 'subTitle', undefined)}
      buttonLabel={get(route.params, 'buttonLabel', undefined)}
      onPressButton={get(route.params, 'onPressButton', undefined)}
    />
  );
};
