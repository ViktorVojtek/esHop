/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
import Reducer from '../Reducer';

import { IState } from '../../types/Store.types';

const initialState: IState = {
  cart: [],
  modal: false,
  error: false,
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
