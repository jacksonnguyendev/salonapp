import React from 'react';
import {Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {responsive} from 'core';
import {SPACINGS} from 'constants';
import {textStyles} from 'theme';

export type CategoryOption = {id: string; title: string; color: string};

export type CategorySelectorProps = {
  data: CategoryOption[];
  onSelect?: (data: CategoryOption) => void;
};

export const CategorySelector = (props: CategorySelectorProps) => {
  const {data, onSelect} = props;
  return (
    <FlatList
      style={[styles.container]}
      horizontal
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onSelect && onSelect(item)}
          style={[styles.itemContainer, {backgroundColor: item.color}]}>
          <Text style={[styles.itemText]}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACINGS.default,
    paddingVertical: SPACINGS.tiny,
  },
  itemContainer: {
    height: responsive.getSize.h(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACINGS.tiny,
    borderRadius: responsive.getSize.h(20) / 2,
    paddingHorizontal: responsive.getSize.h(7),
  },
  itemText: {
    ...textStyles.description,
    ...textStyles.small,
    color: 'white',
  },
});
