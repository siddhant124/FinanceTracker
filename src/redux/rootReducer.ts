import {reducer} from './reducer';
import {combineReducers} from 'redux';
import {transactionReducer} from './transactionReducer';

export default combineReducers({
  reducer,
  transactionReducer,
});
