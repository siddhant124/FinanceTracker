/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Transactionlist from './Transactionlist';
import {PlusCircleIcon} from 'react-native-heroicons/outline';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addTransactions} from '../../redux/action';
import {Transactions} from '../../redux/transactionReducer';

export default function Dashboard({navigation}: {navigation: any}) {
  const {income, expense, balance, transactions} = useSelector(
    (state: RootState) => state.transactionReducer,
  );
  const reversedTransactions = [...transactions].reverse();

  const dispatch = useDispatch();

  // Load categories from AsyncStorage on component mount
  const loadCategories = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions);
        parsedTransactions.forEach((transaction: Transactions) => {
          dispatch(addTransactions(transaction));
        });
      }
    } catch (error) {
      console.log('Error loading categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{padding: 24}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            marginVertical: 10,
            overflow: 'hidden',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              width: '100%',
              flexDirection: 'row',
              padding: 16,
            }}>
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Balance
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'semibold',
                  color: 'black',
                  textAlign: 'left',
                }}>
                ₹ {balance}
              </Text>
            </View>

            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Transactions
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'semibold',
                  color: 'black',
                  textAlign: 'right',
                }}>
                {transactions.length}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              width: '100%',
              flexDirection: 'row',
              padding: 16,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'left',
                }}>
                Income
              </Text>
              <Text
                style={{fontSize: 18, fontWeight: 'semibold', color: 'black'}}>
                ₹ {income}
              </Text>
            </View>

            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Expense
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'semibold',
                  color: 'black',
                  textAlign: 'right',
                }}>
                ₹ {expense}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Recent Transactions
          </Text>
        </View>

        <Transactionlist
          isScrollEnabled={false}
          data={reversedTransactions?.slice(0, 5) ?? []}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('AddTransactions')}
          style={{
            marginTop: 10,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <PlusCircleIcon color={'#000'} size={35} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#000',
              marginLeft: 8,
            }}>
            Add Transactions
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
