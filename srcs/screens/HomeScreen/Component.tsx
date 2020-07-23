import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {rootStyles} from 'theme';
import {Searchbar, Avatar} from 'components';
import {responsive, translate} from 'core';
import {SPACINGS} from 'constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CategorySelector} from 'components/CategorySelector';
import {BottomSheetListStylist} from './BottomSheetListStylist';
import {SearchModal} from './SearchModal';
import {StoreDataType} from 'core/entities/Store';

export interface HomeScreenComponentProps {
  avatarUri?: string;
  onPressAvatar: () => void;

  searchData: StoreDataType[];
  searchText: string;
  onSearch: (text: string) => void;
  onClearSearch: () => void;

  onPressResult?: (id: number) => void;
}

export const Component = (props: HomeScreenComponentProps) => {
  const {
    avatarUri,
    onPressAvatar,
    searchData,
    searchText,
    onSearch,
    onClearSearch,
    onPressResult
  } = props;
  const {top} = useSafeAreaInsets();

  const listCategory = [
    {id: '1', title: 'Category 1', color: 'red'},
    {id: '2', title: 'Category 2', color: 'blue'},
    {id: '3', title: 'Category 3', color: 'green'},
    {id: '4', title: 'Category 4', color: 'yellow'},
    {id: '5', title: 'Category 5', color: 'oriange'},
  ];

  return (
    <View style={[rootStyles.flexSmall]}>
      <MapView
        provider="google"
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
      />

      <View style={[styles.header, {marginTop: top + SPACINGS.default}]}>
        <Searchbar
          accessibilityStates
          placeholder={translate('home.search_placeholder')}
          onChangeText={onSearch}
          value={searchText}
          style={[styles.search]}
        />

        <TouchableOpacity onPress={onPressAvatar}>
          <Avatar
            editable={false}
            size={responsive.getSize.w(40)}
            source={{uri: avatarUri}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <CategorySelector data={listCategory} />
      </View>
      <View style={[styles.searchWrapper]}>
        <SearchModal searchData={searchData} onPressResult={onPressResult} />
      </View>
      <BottomSheetListStylist />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: SPACINGS.default,
    zIndex: 999,
  },
  search: {
    flex: 1,
    marginRight: SPACINGS.default,
    paddingHorizontal: 0,
    paddingRight: 0,
  },
  mapFull: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
  searchWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
