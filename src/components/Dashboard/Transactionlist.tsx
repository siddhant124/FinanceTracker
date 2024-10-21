/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Transaction} from '../../redux/transactionsSlice';

export default function Transactionlist({
  data,
  isScrollEnabled = true,
}: {
  data: Transaction[];
  isScrollEnabled?: boolean;
}) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={isScrollEnabled}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 14,
            justifyContent: 'space-between',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>Category</Text>
          <Text style={{fontWeight: 'bold', color: '#000'}}>Date</Text>
          <Text style={{fontWeight: 'bold', color: '#000'}}>Amount</Text>
        </View>
      }
      data={data}
      renderItem={({item}) => (
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text
              style={{textAlign: 'center', fontWeight: '800', color: '#666'}}>
              {item.category}
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: '800', color: '#666'}}>
              {item.date}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '800',
                color: item.type === 'Income' ? 'green' : 'red',
              }}>
              {item.type === 'Income' ? '+' : '-'} {item.amount}
            </Text>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
