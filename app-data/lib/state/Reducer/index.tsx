import React, { FC, ReactNode, useContext, useEffect } from 'react';
import {
  CartProduct,
  IAction,
  IState,
} from '../../../shared/types/Store.types';
import { Context } from '../Store';
import { useStorage } from '../../util/app.util';

const storage: Storage = useStorage();
const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let newCart: CartProduct[] = [];

      if (state.cart.length > 0) {
        newCart = [...state.cart];
        let productExist = false;

        for (let i: number = 0; i < newCart.length; i += 1) {
          if (
            newCart[i].id === action.payload.id &&
            newCart[i].variant.title === action.payload.variant.title
          ) {
            newCart[i].variant.count = action.payload.variant.count;
            productExist = true;
            break;
          }
        }

        if (!productExist) {
          newCart = [...state.cart, action.payload];
        }
      } else {
        newCart = [...state.cart, action.payload];
      }

      if (storage) {
        storage.setItem('cart', JSON.stringify(newCart));
      }

      return {
        ...state,
        cart: newCart,
      };
    case 'REMOVE_FROM_CART':
      // TODO: add remove item by variant and by id from cart

      return {
        ...state,
        cart: state.cart,
      };
    case 'SET_CART':
      const cart: CartProduct[] = storage
        ? storage.getItem('cart')
          ? JSON.parse(storage.getItem('cart'))
          : []
        : [];

      return {
        ...state,
        cart,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const withSetCart = <P extends object>(
  Component: React.ComponentType<P>
): FC<P> => ({ ...props }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({ type: 'SET_CART', payload: null });
  }, []);

  return <Component {...props} />;
};

export default Reducer;
