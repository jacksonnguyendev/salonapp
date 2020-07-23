import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {BackgroundLayout} from '../../components';
import {ImageSource} from '../../assets';
import {SPACINGS} from '../../constants';

export interface SplashScreenComponentProps {
  loading: boolean;
}

export const SplashScreenComponent = (props: SplashScreenComponentProps) => {
  const {loading} = props;

  return (
    <BackgroundLayout>
      <View style={[styles.container]}>
        <Image source={ImageSource.Logo} style={[styles.image]} />
        <View style={[styles.loadingContainer]}>
          {loading && (
            <DotIndicator
              color="rgba(255,255,255,0.6)"
              count={3}
              size={10}
              style={[styles.loadingIcon]}
            />
          )}
        </View>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20 + SPACINGS.small, // to make logo center in screen
  },
  loadingContainer: {
    height: 20,
    marginTop: SPACINGS.small,
  },
  loadingIcon: {},
});
