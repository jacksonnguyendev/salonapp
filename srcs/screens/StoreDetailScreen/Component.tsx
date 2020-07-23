import React from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import {EmptyLayout, GobackButton, SizedBox} from '../../components';
import {theme, textStyles, rootStyles} from 'theme';
import {responsive} from 'core';
import {Appbar, Avatar} from 'react-native-paper';
import {ImageSource} from 'assets';
import {StylistInfo, StoreInfo} from 'core/entities/Store';
import { SPACINGS } from 'constants';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

interface StoreDetailScreenComponentProps {
  stylistInfo?: StylistInfo;
  storeInfo?: StoreInfo;
}

export const StoreDetailScreenComponent = (
  props: StoreDetailScreenComponentProps,
) => {
  const { stylistInfo, storeInfo} = props;
  const coverUri = storeInfo?.attachments[0]?.filePath || '';

  return (
    <EmptyLayout removeSafeEdge={['top']}>
      <ImageBackground
        source={{uri: coverUri}}
        style={[styles.headerBackground]}
        imageStyle={[styles.headerBackground]}
        >
        <LinearGradient colors={['rgba(37,36,36,0.6)', 'rgba(4,23,35,0.7)']} style={[styles.headerBackground]}>
          <Appbar.Header accessibilityStates style={[styles.header]}>
            <GobackButton color={'white'} />
            <Appbar.Content
              accessibilityStates
              title={storeInfo?.name || ''}
              titleStyle={[
                textStyles.title,
                textStyles.big,
                textStyles.left,
                styles.headerTitle,
              ]}
              style={[rootStyles.alignStart]}
            />
          </Appbar.Header>
        </LinearGradient>
      </ImageBackground>
      <Avatar.Image
        accessibilityStates
        source={(stylistInfo?.avatar && {uri: stylistInfo.avatar.filePath}) || ImageSource.ProfileAvatar}
        style={[styles.avatar]}
        size={responsive.getSize.w(58)}
      />
      <SizedBox height={responsive.getSize.h(10)} />
      <View style={[styles.infoWrapper]}>
          <Text style={[textStyles.title]}>
            {`${stylistInfo?.firstName || ''} ${stylistInfo?.lastName || ''}`}
          </Text>
          
          <Text 
            style={[
              textStyles.description, 
              textStyles.small, 
              textStyles.center,
              styles.subTitle,
              ]}>
            {storeInfo?.address}
          </Text>
          <SizedBox height={responsive.getSize.h(4)} />
          
          <Text style={[
              textStyles.description, 
              textStyles.small, 
              textStyles.center,
              styles.subTitle,
              {color: theme.colors.accent}
              ]}>SEND MESSAGES</Text>
      </View>
      <SizedBox height={SPACINGS.default} />

      <View style={[styles.content]}>
          <Text style={[textStyles.title]}>Description</Text>
          <SizedBox height={SPACINGS.tiny} />
          <Text style={[textStyles.paragrap]}>{storeInfo?.description || ''}</Text>
          <SizedBox height={SPACINGS.small} />
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={storeInfo?.attachments || []} 
            keyExtractor={(item) => String(item.id)} 
            renderItem={({item}) => {
                return <FastImage source={{uri: item.filePath}} style={[styles.image]} />
            }}
          />
      </View>

      <SizedBox height={SPACINGS.xLarge} />
      <Text style={[textStyles.title, {marginLeft: SPACINGS.small}]}>Services</Text>
      <SizedBox height={SPACINGS.tiny} />
      <View style={[styles.content]}></View>

    </EmptyLayout>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    height: responsive.getSize.h(200),
    backgroundColor: theme.colors.backdrop,
    borderBottomLeftRadius: responsive.getSize.h(30),
    borderBottomRightRadius: responsive.getSize.h(30),
  },
  header: {
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: theme.colors.textLight,
  },
  avatar: {
    marginTop: -responsive.getSize.w(30),
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    height: responsive.getSize.w(60),
    width: responsive.getSize.w(60),
    borderRadius: responsive.getSize.w(60 / 2),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    alignItems: 'center',
    paddingHorizontal: SPACINGS.big
  },
  content: {
    backgroundColor: theme.colors.content,
    paddingVertical: SPACINGS.default,
    paddingHorizontal: SPACINGS.small,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  subTitle: {
    lineHeight: responsive.getSize.h(16),
    color: theme.colors.text
  },
  image: {
    width: responsive.getSize.w(75),
    height: responsive.getSize.w(75),
    borderRadius: responsive.getSize.h(4),
    marginRight: responsive.getSize.w(10),
    backgroundColor: theme.colors.backdrop
  }
});
