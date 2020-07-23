import React, {useEffect} from 'react';
import {StyleSheet, Image, View, StyleProp, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Image as PickerImage} from 'react-native-image-crop-picker';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {get} from 'lodash';
import {responsive} from 'core';
import {ImageSource} from 'assets';
import {theme, rootStyles} from 'theme';
import {useUploadAvatar} from './useUploadAvatar';

export type PickerImageType = PickerImage;
export type AvatarProps = React.ComponentProps<typeof FastImage> & {
  size?: number;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onSelectFile?: (file: PickerImageType) => void;
  editable?: boolean;
};

export const Avatar = (props: AvatarProps) => {
  const {editable = true} = props;
  const {onPressEdit, selectedImage} = useUploadAvatar();
  const {
    source = {uri: ''},
    size = responsive.getSize.w(40),
    containerStyle = {},
    onSelectFile,
    loading,
  } = props;

  const imageStyle = [
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.colors.backdrop
    },
  ];

  const penSize = size / 5;

  const penStyle = [
    styles.avatarPen,
    {
      height: penSize * 2,
      width: penSize * 2,
      borderRadius: penSize,
      bottom: -responsive.getSize.w(5),
      right: -responsive.getSize.w(10) / 2,
    },
  ];

  const renderImage = () => {
    if (selectedImage) {
      return (
        <Image
          style={imageStyle}
          source={{uri: selectedImage.path}}
          resizeMode="cover"
        />
      );
    } else if (get(source, 'uri')) {
      // remote source
      return (
        <FastImage source={source} style={imageStyle} resizeMode="cover" />
      );
    } else {
      return (
        <Image
          style={imageStyle}
          // local source
          source={source && ImageSource.ProfileAvatar}
          resizeMode="cover"
        />
      );
    }
  };

  useEffect(() => {
    if (onSelectFile && selectedImage) onSelectFile(selectedImage);
  }, [selectedImage]);

  return (
    <>
      <View
        style={[styles.container, {width: size, height: size}, containerStyle]}>
        {renderImage()}
        {editable && (
          <IconButton
            accessibilityStates
            icon={ImageSource.Pen}
            color={'white'}
            size={penSize}
            style={[penStyle]}
            onPress={onPressEdit}
            disabled={loading}
          />
        )}
        {loading && (
          <View style={[rootStyles.centered, rootStyles.fullTouchHitSlop]}>
            <ActivityIndicator accessibilityStates />
          </View>
        )}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {},
  avatarPen: {
    position: 'absolute',
    backgroundColor: theme.colors.primary,
    width: responsive.getSize.w(19),
    height: responsive.getSize.w(19),
    borderRadius: responsive.getSize.w(19) / 2,
    borderWidth: responsive.getSize.w(1),
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
