import {StyleSheet} from 'react-native';
import { theme } from 'theme';

export const rootStyles = StyleSheet.create({
  noFlex: {
    flex: undefined,
  },
  flexSmall: {
    flex: 1,
  },
  flexMedium: {
    flex: 2,
  },
  flexLarge: {
    flex: 3,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  justiCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  justiStart: {
    justifyContent: 'flex-start',
  },
  justiEnd: {
    justifyContent: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullTouchHitSlop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
