import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {ADD_TRANSACTION} from './constants';

export interface Transactions {
  id: number;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  date: string;
}

export interface TransactionsState {
  transactions: Transactions[];
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

export const transactionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      // Create a new transactions array without mutating the original state
      const newTransactions = [...state.transactions, action.payload];

      // Update income, expense, and balance based on the type of transaction
      let updatedIncome = state.income;
      let updatedExpense = state.expense;

      if (action.payload.type === 'Income') {
        updatedIncome += action.payload.amount;
      } else {
        updatedExpense += action.payload.amount;
      }

      const updatedBalance = updatedIncome - updatedExpense;

      // Return the new state with updated transactions, income, expense, and balance
      return {
        ...state,
        transactions: newTransactions,
        income: updatedIncome,
        expense: updatedExpense,
        balance: updatedBalance,
      };

    default:
      return state;
  }
};
