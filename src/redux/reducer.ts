import {ADD_CATEGORY} from './constants';

const initialState: string[] = [];

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];

    default:
      return state;
  }
};
