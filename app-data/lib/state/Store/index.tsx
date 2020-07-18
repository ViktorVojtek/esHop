/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
import Reducer from '../Reducer';

import { IState } from '../../../shared/types/Store.types';

const initialState: IState = {
  cart: [],
  cartTotalSum: 0,
  modal: false,
  menuOpen: false,
  error: false,
  category: '',
  subCategory: '',
  giftCards: [],
  productsTotal: 0,
  productsToShow: 0,
  allowEnvelope: true,
};

export const Context = createContext<{
  state: IState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Store;
