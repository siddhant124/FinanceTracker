/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Transactionlist from '../dashboard/Transactionlist';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export default function TransactionsScreen() {
  const {transactions} = useSelector((state: RootState) => state.transactions);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <View
        style={{
          flex: 1,
          margin: 24,
        }}>
        <Text
          style={{
            fontSize: 28,
            color: 'black',
            fontWeight: 'bold',
          }}>
          All Transactions
        </Text>
        <Transactionlist data={transactions} />
      </View>
    </SafeAreaView>
  );
}
