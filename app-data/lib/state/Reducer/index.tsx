import React, { FC, ReactNode, useContext, useEffect } from 'react';
import {
  CartProduct,
  IAction,
  IState,
  GiftCard,
} from '../../../shared/types/Store.types';
import { Context } from '../Store';
import { useStorage } from '../../util/app.util';

const storage: Storage = useStorage();
let newCart: CartProduct[] = [];
let newGiftCards: GiftCard[] = [];

const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.cart.length > 0) {
        newCart = [...state.cart];
        let productExist = false;

        for (let i: number = 0; i < newCart.length; i += 1) {
          if (
            newCart[i].id === action.payload.id &&
            newCart[i].variant.title === action.payload.variant.title
          ) {
            newCart[i].variant.count =
              newCart[i].variant.count + action.payload.variant.count;
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
      if (state.cart.length > 0) {
        newCart = [...state.cart];

        for (let i: number = 0; i < newCart.length; i += 1) {
          if (
            newCart[i].id === action.payload.id &&
            newCart[i].variant.title === action.payload.variant.title &&
            newCart[i].variant.count > 1
          ) {
            newCart[i].variant.count = action.payload.variant.count;
            break;
          } else if (
            newCart[i].id === action.payload.id &&
            newCart[i].variant.title === action.payload.variant.title &&
            newCart[i].variant.count === 1
          ) {
            newCart = [...newCart.slice(0, i), ...newCart.slice(i + 1)];
            break;
          }
        }
      }

      if (storage) {
        storage.setItem('cart', JSON.stringify(newCart));
      }

      return {
        ...state,
        cart: newCart,
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
    case 'SET_GIFTCARD':
      const giftCards: GiftCard[] = storage
        ? storage.getItem('giftCards')
          ? JSON.parse(storage.getItem('giftCards'))
          : []
        : [];

      return {
        ...state,
        giftCards,
      };
    case 'ADD_TO_GIFT_CARDS':
      newGiftCards = [...state.giftCards];
      newGiftCards = [...state.giftCards, action.payload];
      if (storage) {
        storage.setItem('giftCards', JSON.stringify(newGiftCards));
      }
      return {
        ...state,
        giftCards: newGiftCards,
      };
    case 'REMOVE_FROM_GIFT_CARDS':
      if (state.giftCards.length > 0) {
        newGiftCards = [...state.giftCards];
        newGiftCards.splice(action.payload.id, 1);
      }
      if (storage) {
        storage.setItem('giftCards', JSON.stringify(newGiftCards));
      }

      return {
        ...state,
        giftCards: newGiftCards,
      };
    case 'SET_TOTAL_SUM':
      if (storage) {
        storage.setItem('cartTotalSum', JSON.stringify(action.payload));
      }

      return {
        ...state,
        cartTotalSum: action.payload,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      };
    case 'SET_PRODUCT_MODAL':
      return {
        ...state,
        modal: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
        subCategory: '',
      };
    case 'SET_SUBCATEGORY':
      return {
        ...state,
        subCategory: action.payload,
      };
    case 'MENU_TOGGLE':
      return {
        ...state,
        menuOpen: action.payload,
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
    dispatch({ type: 'SET_GIFTCARD', payload: null });
  }, []);

  return <Component {...props} />;
};

export default Reducer;
