/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity} from 'react-native';
import React from 'react';

export const RadioButton = ({
  selected,
  onPress,
}: {
  selected: any;
  onPress: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 20,
        width: 20,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {selected ? (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 6,
            backgroundColor: '#000',
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};
