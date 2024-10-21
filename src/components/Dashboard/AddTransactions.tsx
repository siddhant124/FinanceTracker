/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from './RaidoButton';
import RNPickerSelect from 'react-native-picker-select';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import {useDispatch, useSelector} from 'react-redux'; // Import useSelector to access Redux state
import {addTransaction} from '../../redux/transactionsSlice';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {RootState} from '../../redux/store'; // Adjust the import according to your store file

interface TransationType {
  id: number;
  amount: Float;
  selectedType: 'Income' | 'Expense';
  selectedCategory: string;
  selectedDate: string;
}

export default function AddTransactions({navigation}: {navigation: any}) {
  const [transationData, setTransationData] = useState<TransationType>({
    id: 0,
    amount: 0,
    selectedType: 'Income',
    selectedCategory: '',
    selectedDate: '',
  });

  const dispatch = useDispatch();

  // Access categories from Redux
  const categories = useSelector(
    (state: RootState) => state.transactions.categories,
  );

  const handleAddTransaction = async () => {
    const newTransaction = {
      id: transationData.id + 1,
      type: transationData.selectedType,
      category: transationData.selectedCategory,
      amount: transationData.amount,
      date: transationData.selectedDate,
    };
    dispatch(addTransaction(newTransaction));
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

        <View
          style={{
            marginVertical: 10,
          }}>
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

        <View
          style={{
            marginVertical: 10,
            gap: 10,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'semibold'}}>
            Type:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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

        <View
          style={{
            marginVertical: 10,
          }}>
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

      <TouchableOpacity
        activeOpacity={isValidTransaction() ? 0.6 : 1}
        onPress={() => {
          if (isValidTransaction()) {
            handleAddTransaction(); // Add transaction first
            navigation.navigate('DashboardScreen'); // Then navigate to Dashboard
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
        <Text
          style={{
            color: '#FFF',
            textAlign: 'center',
            padding: 10,
          }}>
          Add
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
