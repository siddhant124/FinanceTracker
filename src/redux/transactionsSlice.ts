import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
  id: number;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  date: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  categories: string[]; // Add categories to the state
  income: Float;
  expense: number;
  balance: number;
}

const initialState: TransactionsState = {
  transactions: [],
  categories: [], // Initialize the categories array
  income: 0,
  expense: 0,
  balance: 0,
};

// Utility function to save transactions to AsyncStorage
const saveTransactionsToAsyncStorage = async (transactions: Transaction[]) => {
  try {
    await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
  } catch (error) {
    console.log('Error saving transactions:', error);
  }
};

// Utility function to save categories to AsyncStorage
const saveCategoriesToAsyncStorage = async (categories: string[]) => {
  try {
    await AsyncStorage.setItem('categories', JSON.stringify(categories));
  } catch (error) {
    console.log('Error saving categories:', error);
  }
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);

      if (action.payload.type === 'Income') {
        state.income += action.payload.amount;
      } else {
        state.expense += action.payload.amount;
      }

      state.balance = state.income - state.expense;

      // Save the updated transactions array to AsyncStorage
      saveTransactionsToAsyncStorage(state.transactions);
    },

    // New reducer to add a category
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload); // Add the category to the array

      // Save the updated categories array to AsyncStorage
      saveCategoriesToAsyncStorage(state.categories);
    },

    // You can add more reducers like loading transactions and categories from AsyncStorage if needed
  },
});

export const {addTransaction, addCategory} = transactionsSlice.actions;
export default transactionsSlice.reducer;
