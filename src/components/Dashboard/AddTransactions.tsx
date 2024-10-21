/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RadioButton} from './RaidoButton';
import RNPickerSelect from 'react-native-picker-select';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import {useDispatch, useSelector} from 'react-redux'; // Import useSelector to access Redux state
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {addTransactionCategory, addTransactions} from '../../redux/action';
import {RootState} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Transactions} from '../../redux/transactionReducer';

interface TransationType {
  id: number;
  amount: Float;
  selectedType: 'Income' | 'Expense';
  selectedCategory: string;
  selectedDate: string;
}

export default function AddTransactions({navigation}: {navigation: any}) {
  const [isLoading, setIsLoading] = useState(true);
  const [transationData, setTransationData] = useState<TransationType>({
    id: 0,
    amount: 0,
    selectedType: 'Income',
    selectedCategory: '',
    selectedDate: '',
  });

  const dispatch = useDispatch();

  // Access categories from Redux
  const categories = useSelector((state: RootState) => state.reducer);

  // Load categories from AsyncStorage on component mount if not already loaded
  const loadCategories = async () => {
    try {
      // Only load categories if they haven't been loaded yet
      if (categories.length === 0) {
        const storedCategories = await AsyncStorage.getItem('categories');
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          parsedCategories.forEach((category: string) => {
            dispatch(addTransactionCategory(category));
          });
        }
      }
    } catch (error) {
      console.log('Error loading categories:', error);
    } finally {
      setIsLoading(false); // Stop loading indicator after categories are loaded
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddTransaction = async () => {
    const newTransaction = {
      id: transationData.id + 1,
      type: transationData.selectedType,
      category: transationData.selectedCategory,
      amount: transationData.amount,
      date: transationData.selectedDate,
    };
    dispatch(addTransactions(newTransaction));
    await saveTransactionsToStorage(newTransaction);
  };

  const saveTransactionsToStorage = async (newTransaction: Transactions) => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const parsedTransactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];
      parsedTransactions.push(newTransaction);
      await AsyncStorage.setItem(
        'transactions',
        JSON.stringify(parsedTransactions),
      );
    } catch (error) {
      console.log('Error saving transaction:', error);
    }
  };

  const isValidTransaction = () => {
    if (
      transationData.amount !== (0 || undefined || null) &&
      transationData.selectedCategory !== '' &&
      transationData.selectedDate !== ''
    ) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size={'large'} color={'#000'} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
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
          Add Transaction
        </Text>

        {/* Amount Input */}
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'semibold'}}>
            Amount:
          </Text>
          <TextInput
            placeholder="Enter Amount"
            onChangeText={text => {
              const numericValue = parseFloat(text);
              setTransationData({
                ...transationData,
                amount: isNaN(numericValue) ? 0 : numericValue,
              });
            }}
            inputMode="numeric"
            keyboardType="numeric"
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderColor: '#999',
              borderRadius: 9,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          />
        </View>

        {/* Type Selection */}
        <View style={{marginVertical: 10, gap: 10}}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'semibold'}}>
            Type:
          </Text>

          {/* Income Radio Button */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              selected={transationData.selectedType === 'Income'}
              onPress={() =>
                setTransationData({
                  ...transationData,
                  selectedType: 'Income',
                })
              }
            />
            <Text
              style={{
                marginLeft: 10,
                fontWeight: 'medium',
                color: 'black',
                fontSize: 15,
              }}>
              Income
            </Text>
          </View>

          {/* Expense Radio Button */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              selected={transationData.selectedType === 'Expense'}
              onPress={() =>
                setTransationData({
                  ...transationData,
                  selectedType: 'Expense',
                })
              }
            />
            <Text
              style={{
                marginLeft: 10,
                fontWeight: 'medium',
                color: 'black',
                fontSize: 15,
              }}>
              Expense
            </Text>
          </View>
        </View>

        {/* Category Selection */}
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'semibold'}}>
            Category:
          </Text>

          {/* Conditionally render based on whether categories exist */}
          {categories.length > 0 ? (
            <RNPickerSelect
              onValueChange={value =>
                setTransationData({
                  ...transationData,
                  selectedCategory: value,
                })
              }
              items={categories.map(category => ({
                label: category,
                value: category,
              }))}
              placeholder={{label: 'Select Category', value: null}}
              useNativeAndroidPickerStyle={true}
            />
          ) : (
            <Text style={{color: 'red'}}>No categories available</Text>
          )}
        </View>

        {/* Date Picker */}
        <View style={{width: '100%', marginBottom: 54}}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: 'semibold',
              marginBottom: 14,
            }}>
            Select Transaction Date:
          </Text>
          <CalendarPicker
            width={320}
            onDateChange={(date: Date) => {
              const fullDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
              setTransationData({
                ...transationData,
                selectedDate: fullDate,
              });
            }}
            allowRangeSelection={false}
            allowBackwardRangeSelect={true}
            maxDate={new Date()}
            selectedDayColor="#000"
            selectedDayTextStyle={{
              color: '#FFF',
            }}
          />
        </View>
      </ScrollView>

      {/* Add Transaction Button */}
      <TouchableOpacity
        activeOpacity={isValidTransaction() ? 0.6 : 1}
        onPress={() => {
          if (isValidTransaction()) {
            handleAddTransaction();
            navigation.navigate('DashboardScreen');
          } else {
            console.warn('Please add required details');
          }
        }}
        style={{
          backgroundColor: isValidTransaction() ? '#000' : '#808080',
          borderRadius: 10,
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
        }}>
        <Text style={{color: '#FFF', textAlign: 'center', padding: 10}}>
          Add
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
