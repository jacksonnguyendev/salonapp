import React, {useState, useCallback} from 'react';
import {Component} from './Component';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, IUserData, storeActions} from 'core';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from 'constants';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user.data);
  const userData: IUserData | null = user?.getData() || null;

  const [searchText, setSearchText] = useState('');
  const {
    isFetching: isSearchFetching, 
    isSuccess: isSearchSuccess,
    data: searchData
  } = useSelector((state: RootState) => state.store.search);
  const [searchTimer, setSearchTimer] = useState<number>(setTimeout(() => {}, 0)); 

  /**
   * on clear search text remove search data
   */
  const handleOnClearSearch = () => {
    if (searchTimer) { 
      clearTimeout(searchTimer);
    }

    dispatch(storeActions.searchStoreClean())
  }

  /**
   * 
   * @param text input search text
   */
  const handleOnSearch = (text: string) => {
    setSearchText(text);

    if (text) {
      if (searchTimer) { 
        clearTimeout(searchTimer);
      }

      setSearchTimer(setTimeout(() => {
        dispatch(storeActions.searchStore({searchText: text}));
      }, 300));
    } else {
      handleOnClearSearch()
    }
  };

  const handleOnPressAvatar = () => {
    navigation.navigate(SCREEN_NAMES.ACCOUNT);
  };

  return (
    <Component
      avatarUri={userData?.avatar?.filePath}
      onPressAvatar={handleOnPressAvatar}
      searchData={searchData.toJSON()}
      searchText={searchText}
      onSearch={handleOnSearch}
      onClearSearch={handleOnClearSearch}
      onPressResult={(id) => navigation.navigate(SCREEN_NAMES.STORE_DETAIL, {id})}
    />
  );
};
