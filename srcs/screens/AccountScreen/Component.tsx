import React from 'react';
import {Text, SectionList, StyleSheet} from 'react-native';
import {List, Divider} from 'react-native-paper';
import {ScaffoldLayout, Avatar, SizedBox} from 'components';
import {translate, responsive} from 'core';
import {textStyles, rootStyles, theme} from 'theme';
import {SPACINGS, SCREEN_NAMES} from 'constants';
import {View} from 'react-native-animatable';
import {ImageSource} from 'assets';

export interface AccoutnComponentProps {
  userName?: string;
  userEmail?: string;
  userAvatarUri?: string;
  onPressLogout?: () => void;
  navigateTo: (screenName: keyof typeof SCREEN_NAMES) => void;
}

export const Component = (props: AccoutnComponentProps) => {
  const {
    userName = '',
    userEmail = '',
    userAvatarUri = '',
    onPressLogout,
    navigateTo,
  } = props;

  const menuSections = [
    {
      title: 'Profile',
      data: [
        {
          icon: (
            <Avatar
              size={responsive.getSize.w(30)}
              source={{uri: userAvatarUri}}
              containerStyle={{marginHorizontal: SPACINGS.tiny}}
            />
          ),
          divider: false,
          title: userName,
          subTitle: userEmail,
          titleStyle: [textStyles.title],
          onPress: () => {
            navigateTo(SCREEN_NAMES.PROFILE);
          },
        },
        {
          icon: <List.Icon icon={ImageSource.Transaction} />,
          divider: true,
          title: 'Transactions',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Settings',
      data: [
        {
          icon: <List.Icon icon={ImageSource.Settings} />,
          divider: true,
          title: 'Setting',
          onPress: () => {},
        },
        {
          icon: <List.Icon icon={ImageSource.Transaction} />,
          divider: true,
          title: translate('general.term_agreement'),
          onPress: () => {},
        },
      ],
    },
    {
      title: '',
      data: [
        {
          icon: <List.Icon icon={ImageSource.Export} />,
          divider: true,
          title: 'Sign out',
          onPress: () => onPressLogout && onPressLogout(),
        },
      ],
    },
  ];

  return (
    <ScaffoldLayout>
      <SectionList
        sections={menuSections}
        keyExtractor={(item, index) => String(item.title + index)}
        renderItem={({item}) => (
          <>
            <List.Item
              accessibilityStates
              left={props => (
                <View style={[rootStyles.centered, rootStyles.row]}>
                  {item.icon}
                  {(item.divider && <View style={[styles.divider]} />) || null}
                </View>
              )}
              title={item.title}
              description={item.subTitle}
              titleStyle={[item.titleStyle]}
              style={[styles.listItem]}
              onPress={item.onPress}
            />
            <Divider accessibilityStates />
          </>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={[textStyles.description, styles.listTitle]}>
            {title}
          </Text>
        )}
      />
    </ScaffoldLayout>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    margin: SPACINGS.tiny,
    marginTop: SPACINGS.default,
  },
  listItem: {
    backgroundColor: 'white',
    minHeight: responsive.getSize.h(50),
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.dark_less,
    height: responsive.getSize.h(20),
    marginRight: responsive.getSize.w(7),
  },
});
