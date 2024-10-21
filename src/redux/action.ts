import {ADD_CATEGORY, ADD_TRANSACTION} from './constants';
import {Transactions} from './transactionReducer';

export function addTransactionCategory(item: string) {
  return {
    type: ADD_CATEGORY,
    payload: item,
  };
}

export function addTransactions(item: Transactions) {
  return {
    type: ADD_TRANSACTION,
    payload: item,
  };
}
