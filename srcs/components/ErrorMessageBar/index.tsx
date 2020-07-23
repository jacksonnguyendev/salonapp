import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {rootStyles} from '../../theme/styles';
import {theme} from '../../theme';
import {ImageSource} from '../../assets';
import {SPACINGS} from '../../constants';

interface ErrorMessageBarProps {
  message: string;
  style?: StyleProp<ViewStyle>;
  onClear?: () => void;
  outlined?: boolean;
}

export const ErrorMessageBar = (props: ErrorMessageBarProps) => {
  const {message, onClear = () => {}, outlined = false} = props;

  return (
    <Animatable.View
      animation="bounceIn"
      style={[
        rootStyles.fullWidth,
        styles.container,
        outlined && styles.outlinedContainer,
        props.style,
      ]}>
      <TouchableOpacity onPress={() => onClear()}>
        <Image
          source={outlined ? ImageSource.CloseRed : ImageSource.Close}
          style={[styles.icon]}
        />
      </TouchableOpacity>
      <Text style={[styles.message, outlined && styles.outlinedMessage]}>
        {message}
      </Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.error,
    paddingVertical: SPACINGS.tiny,
    paddingHorizontal: SPACINGS.small,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    borderRadius: theme.roundness,
  },
  outlinedContainer: {
    borderColor: theme.colors.error,
    borderWidth: 0.5,
    backgroundColor: 'rgba(255,79,112,0.2)',
  },
  icon: {
    marginRight: SPACINGS.tiny,
  },
  message: {
    color: '#FFFFFF',
  },
  outlinedMessage: {
    color: theme.colors.error,
  },
});
