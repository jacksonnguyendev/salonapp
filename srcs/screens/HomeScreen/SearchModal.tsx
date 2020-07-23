import React from 'react';
import moment from 'moment';
import {View, Text, Image, StyleSheet} from 'react-native';
import {theme, rootStyles, textStyles} from 'theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {responsive} from 'core';
import {SPACINGS} from 'constants';
import {FlatList} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';
import {ImageSource} from 'assets';
import {StoreDataType} from 'core/entities/Store';
import {LinkText} from 'components';

export const SearchModal = ({
  searchData,
  onPressResult,
}: {
  searchData: StoreDataType[];
  onPressResult?: (id: number) => void;
}) => {
  const insets = useSafeAreaInsets();
  const hasSearchData = searchData && searchData.length > 0;

  const searchHistory = [
    {
      title: 'Search 1',
      description: 'Location name',
      createdAt: new Date(),
    },
    {
      title: 'Search 2',
      description: 'Location name',
      createdAt: new Date(),
    },
    {
      title: 'Search 2',
      description: 'Location name',
      createdAt: new Date(),
    },
  ];

  const _renderSearchResult = () => {
    return (
      <>
        <Text style={[textStyles.description, textStyles.medium, styles.title]}>
          SEARCH RESULTS
        </Text>

        <FlatList
          data={searchData}
          keyExtractor={(item, index) => item.storeInfo.name + index}
          renderItem={({item}) => (
            <List.Item
              style={[styles.item]}
              accessibilityStates
              title={item.storeInfo.name}
              titleStyle={[textStyles.title]}
              description={item.storeInfo.address}
              descriptionStyle={[
                textStyles.description,
                styles.itemDescription,
              ]}
              right={() => (
                <View style={[rootStyles.justiCenter]}>
                  <LinkText style={[styles.itemExtraText]}>
                    View on map
                  </LinkText>
                </View>
              )}
              onPress={() => onPressResult && onPressResult(item.storeInfo.id)}
            />
          )}
        />
      </>
    );
  };

  const _renderRecentHistory = () => {
    return (
      <>
        <Text style={[textStyles.description, textStyles.medium, styles.title]}>
          RECENT SEARCH
        </Text>

        <FlatList
          data={searchHistory}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({item}) => (
            <List.Item
              style={[styles.item]}
              accessibilityStates
              left={props => (
                <View style={[props.style, rootStyles.justiCenter]}>
                  <Image source={ImageSource.Clock} />
                </View>
              )}
              title={item.title}
              titleStyle={[textStyles.title]}
              description={item.description}
              descriptionStyle={[
                textStyles.description,
                styles.itemDescription,
              ]}
              right={() => (
                <View style={[rootStyles.justiCenter]}>
                  <Text
                    style={[
                      textStyles.description,
                      textStyles.right,
                      styles.itemExtraText,
                    ]}>
                    <Text>{`${moment(item.createdAt).format('hh:mm')}\n`}</Text>
                    <Text>{moment(item.createdAt).fromNow()}</Text>
                  </Text>
                </View>
              )}
            />
          )}
        />
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        rootStyles.shadow,
        {paddingTop: insets.top + responsive.getSize.h(100)},
      ]}>
      <View style={[styles.content]}>
        {(hasSearchData && _renderSearchResult()) || _renderRecentHistory()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: responsive.getSize.h(150),
    backgroundColor: theme.colors.content,

    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

    paddingBottom: SPACINGS.default,

    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 20,

    elevation: 5,
  },
  content: {
    paddingHorizontal: SPACINGS.default,
  },
  title: {
    marginBottom: responsive.getSize.h(23),
  },
  item: {
    height: responsive.getSize.h(40),
    marginBottom: responsive.getSize.h(10),
    padding: 0,
  },
  itemDescription: {
    fontSize: responsive.getSize.f(12),
    lineHeight: responsive.getSize.f(15),
  },
  itemExtraText: {
    fontSize: responsive.getSize.f(8),
    lineHeight: responsive.getSize.f(10),
  },
});
