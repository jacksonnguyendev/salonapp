import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, {onChange, call} from 'react-native-reanimated';
import {responsive} from 'core';
import {rootStyles, textStyles, theme} from 'theme';
import {SizedBox} from 'components';
import {SPACINGS, BOTTOM_TABBAR_HEIGHT} from 'constants';
import {FlatList} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {height: screenHeight} = Dimensions.get('screen');

export type BottomSheetListStylistProps = {};

/**
 * HEADER OF LIST
 */
const ListHeader = (
  props: BottomSheetListStylistProps & {
    style: any;
    topLineStyle: any;
  },
) => {
  return (
    <Animated.View style={[styles.header, StyleSheet.flatten(props.style)]}>
      <Animated.View style={[styles.headerTopLine, props.topLineStyle]} />
      <SizedBox height={SPACINGS.tiny} />
      <Text
        style={[rootStyles.selfCenter, textStyles.subTitle, textStyles.large]}>
        Explore New York
      </Text>
    </Animated.View>
  );
};

const mockListStore = [
  {id: 1, name: 'oek'},
  {id: 2, name: 'oek'},
  {id: 3, name: 'oek'},
  {id: 4, name: 'oek'},
  {id: 5, name: 'oek'},
  {id: 6, name: 'oek'},
  {id: 7, name: 'oek'},
  {id: 8, name: 'oek'},
  {id: 9, name: 'oek'},
  {id: 10, name: 'oek'},
];
const ListStore = (props: BottomSheetListStylistProps) => {
  return (
    <View style={[styles.listStoreContainer]}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      // style={[
      //   styles.listStoreContainer, 
      //   {
      //     maxHeight: styles.listStoreContainer.maxHeight,
      //     minHeight: styles.listStoreContainer.maxHeight,
      //   }
      // ]}
      contentContainerStyle={[styles.listStoreContent]}
      data={mockListStore}
      keyExtractor={item => String(item.id)}
      renderItem={() => <View style={[styles.listStoreItem]} />}
    />
    </View>
  );
};

/**
 * BODY (CONTENT) OF LIST
 */
const ListBody = (props: BottomSheetListStylistProps & {style: any}) => {
  return (
    <Animated.View 
      style={[
        styles.body, 
        StyleSheet.flatten(props.style)
      ]}
      >
      <ListStore />
    </Animated.View>
  );
};

/**
 * LIST VIEW
 */
export const BottomSheetListStylist = (props: BottomSheetListStylistProps) => {
  const insets = useSafeAreaInsets();
  const currentSnapAnimatedValue = new Animated.Value(0);

  const openHeaderHeight = responsive.getSize.h(115) + insets.top;

  // snaps point is array of heights of list View
  const snapPoints = [
    styles.header.height, // close
    styles.header.height + styles.body.height, // open small, this "- responsive.getSize.h(10)" fix ui
    screenHeight - BOTTOM_TABBAR_HEIGHT * Platform.select<number>({ios: 1, android : 2, default: 1}), // open full
  ];
  const middleRange =
    1 - (snapPoints[1] - 39) / (screenHeight - BOTTOM_TABBAR_HEIGHT); // position of middle snap, 39 is sum of safearea top and bottom
  const inputRange = [0, Number(middleRange.toFixed(3)), 1]; // 0 is very top of screen, 1 is very bottom of screen

  const headerStyle = {
    height: currentSnapAnimatedValue.interpolate({
      inputRange: inputRange,
      outputRange: [
        openHeaderHeight,
        styles.header.height,
        styles.header.height,
      ],
    }),
    paddingTop: currentSnapAnimatedValue.interpolate({
      inputRange: inputRange,
      outputRange: [responsive.getSize.h(70) + insets.top, 0, 0],
    }),
  };

  const headerTopLineStyle = {
    opacity: currentSnapAnimatedValue.interpolate({
      inputRange: inputRange,
      outputRange: [0, 1, 1],
    }),
  };

  const bodyStyle = {
    height: currentSnapAnimatedValue.interpolate({
      inputRange: inputRange,
      outputRange: [
        screenHeight - (openHeaderHeight + BOTTOM_TABBAR_HEIGHT),
        styles.body.height + responsive.getSize.h(6),
        0,
      ],
    }),
  };

  const onChangeCallback = ([value]: any) => {};

  const bs = React.createRef<BottomSheet>();

  useEffect(() => {
    bs.current?.snapTo(1);
  }, []);

  return (
    <>
      <BottomSheet
        ref={bs}
        initialSnap={0}
        snapPoints={snapPoints}
        renderHeader={() => (
          <ListHeader style={headerStyle} topLineStyle={headerTopLineStyle} />
        )}
        renderContent={() => <ListBody style={bodyStyle} />}
        callbackNode={currentSnapAnimatedValue}
      />
      <Animated.Code
        exec={onChange(
          currentSnapAnimatedValue,
          call([currentSnapAnimatedValue], onChangeCallback),
        )}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  header: {
    height: responsive.getSize.h(50),
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  headerTopLine: {
    height: responsive.getSize.h(4),
    width: responsive.getSize.w(45),
    borderRadius: responsive.getSize.h(4) / 2,
    marginTop: responsive.getSize.h(6),
    backgroundColor: '#E9E9E9',
    alignSelf: 'center',
  },
  body: {
    height: responsive.getSize.h(100),
    backgroundColor: theme.colors.background,
  },
  listStoreContainer: {
    backgroundColor: 'white',
    paddingVertical: SPACINGS.tiny,
    maxHeight: responsive.getSize.h(100),
  },
  listStoreContent: {
    paddingHorizontal: SPACINGS.large,
    alignItems: 'center',
  },
  listStoreItem: {
    width: responsive.getSize.w(60),
    height: responsive.getSize.w(60),
    borderRadius: 5,
    backgroundColor: 'gray',
    marginRight: SPACINGS.tiny,
  },
});
