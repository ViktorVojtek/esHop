/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from 'react';
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
  customer: {
    firstName: '',
    lastName: '',
    userId: '',
    token: '',
    isVerified: false,
    marketing: false,
    companyDTAXNum: '',
    companyDVATNum: '',
    companyName: '',
    companyVatNum: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    optionalAddress: '',
    optionalCity: '',
    optionalPostalCode: '',
    optionalState: '',
    email: '',
    tel: '',
  },
  loyalityProduct: null,
  coupon: null,
  freeDelivery: null,
  subCategoriesList: [],
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

export const useStore: () => {
  state: IState;
  dispatch: React.Dispatch<any>;
} = () => useContext(Context);

export default Store;
