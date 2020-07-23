import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ImageSource} from '../../assets';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {SPACINGS} from '../../constants';

export const BackgroundLayout = (
  props: React.PropsWithChildren<{
    removeSafeEdge?: Edge[];
  }>,
) => {
  const {removeSafeEdge = []} = props;
  const safeEdges: Edge[] = ['top', 'bottom', 'left', 'right'];
  const filtered = safeEdges.filter(item => {
    return removeSafeEdge.indexOf(item) < 0;
  });

  const overlayGradientColor = ['rgba(21,27,34,0.7)', 'rgba(95,19,12,0.8)'];

  return (
    <ImageBackground
      source={ImageSource.Background}
      style={[styles.container]}
      resizeMethod="auto"
      resizeMode="cover">
      <LinearGradient style={[styles.overlay]} colors={overlayGradientColor}>
        <SafeAreaView edges={filtered} style={[styles.safeContainer]}>
          {props.children}
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    // paddingVertical: SPACINGS.tiny,
  },
  overlay: {
    flex: 1,
  },
});
