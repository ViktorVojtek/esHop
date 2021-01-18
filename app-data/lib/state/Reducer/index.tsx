import React, { FC, ReactNode, useContext, useEffect } from 'react';
import {
  CartProduct,
  IAction,
  IState,
  GiftCard,
} from '../../../shared/types/Store.types';
import { Context } from '../Store';
import { useStorage } from '../../util/app.util';
import cookie from 'js-cookie';
import { useQuery } from '@apollo/react-hooks';
import {
  CUSTOMER_QUERY,
  FREEDELIVERY_QUERY,
  LOYALITY_PRODUCTS_QUERY,
  PRODUCTS_BY_IDS_QUERY,
} from '../../../graphql/query';

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
      if (state.cart.length > 0) {
        newCart = [...state.cart];

        for (let i: number = 0; i < newCart.length; i += 1) {
          if (
            newCart[i].id === action.payload.id &&
            newCart[i].variant.title === action.payload.variant.title &&
            action.payload.variant.count === 0
          ) {
            newCart = [...newCart.slice(0, i), ...newCart.slice(i + 1)];
            break;
          } else if (
            newCart[i].id === action.payload.id &&
            newCart[i].variant.title === action.payload.variant.title &&
            newCart[i].variant.count > 1
          ) {
            newCart[i].variant.count = action.payload.variant.count;
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
      if (storage) {
        storage.setItem('cart', JSON.stringify(action.payload));
      }
      return {
        ...state,
        cart: action.payload,
      };
    case 'SET_LOYALITY_PRODUCT':
      return {
        ...state,
        loyalityProduct: action.payload,
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
    case 'ADD_LOYALITY_PRODUCT':
      if (storage) {
        storage.setItem('loyalityProduct', JSON.stringify(action.payload));
      }
      return {
        ...state,
        loyalityProduct: action.payload,
      };
    case 'ADD_COUPON':
      return {
        ...state,
        coupon: action.payload,
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
    case 'SET_PRODUCTS_TOTAL_COUNT':
      return {
        ...state,
        productsTotal: action.payload,
      };
    case 'SET_PRODUCTS_TO_SHOW_COUNT':
      return {
        ...state,
        productsToShow: action.payload,
      };
    case 'ALLOW_ENVELOPE':
      return {
        ...state,
        allowEnvelope: action.payload,
      };
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload,
      };
    case 'SET_FREEDELIVERY':
      return {
        ...state,
        freeDelivery: action.payload,
      };
    default:
      return state;
  }
};

export const withSetCart = <P extends object>(
  Component: React.ComponentType<P>
): FC<P> => ({ ...props }) => {
  const { dispatch, state } = useContext(Context);
  const { customer } = state;

  let cart: CartProduct[] = storage
    ? storage.getItem('cart')
      ? JSON.parse(storage.getItem('cart'))
      : []
    : [];
  let ids: String[] = [];
  cart.length > 0 &&
    cart.forEach((item) => {
      ids.push(item.id);
    });
  const { error, loading, data } = useQuery(PRODUCTS_BY_IDS_QUERY, {
    variables: { ids },
  });
  if (data) {
    const { productsByIds } = data;
    cart.forEach((item, i) => {
      productsByIds.map((e) => {
        if (item.id === e._id) {
          const comparedVariants = e.variants.filter(
            (variant: any) => variant.title === item.variant.title
          );
          if (comparedVariants.length === 0) {
            cart.splice(i, 1);
          }
          e.variants.map((variant) => {
            if (item.variant.title === variant.title) {
              if (item.variant.price.value !== variant.price.value) {
                item.variant.price.value = variant.price.value;
              }
            }
          });
        }
      });
    });
  }

  const loyalityProducts = getLoyalityProducts();
  let loyalityProduct = storage
    ? storage.getItem('loyalityProduct')
      ? JSON.parse(storage.getItem('loyalityProduct'))
      : null
    : null;
  if (loyalityProduct) {
    if (loyalityProducts) {
      loyalityProducts.map((e) => {
        if (loyalityProduct._id === e._id) {
          loyalityProduct.title = e.title;
          loyalityProduct.costPoints = e.costPoints;
          if (loyalityProduct.isDiscount) {
            loyalityProduct.discount = e.discount;
          }
        }
      });
    }
  }
  const user = getUser(customer.userId);

  const freeDeliveryValue = getFreeDelivery();

  useEffect(() => {
    dispatch({ type: 'SET_CART', payload: cart });
    dispatch({ type: 'SET_GIFTCARD', payload: null });
    dispatch({ type: 'SET_LOYALITY_PRODUCT', payload: loyalityProduct });
    dispatch({ type: 'SET_FREEDELIVERY', payload: freeDeliveryValue });
    dispatch({
      type: 'SET_CUSTOMER',
      payload: {
        ...user,
        phone: user ? user.tel : '',
        firstName: cookie.get('customerFName'),
        lastName: cookie.get('customerLName'),
        userId: cookie.get('customerId'),
        token: cookie.get('customerToken'),
      },
    });
  }, [data, loyalityProducts, user, freeDeliveryValue]);

  return <Component {...props} />;
};

export default Reducer;

function getLoyalityProducts() {
  const { error, loading, data } = useQuery(LOYALITY_PRODUCTS_QUERY);

  if (data) {
    const { loyalityProducts } = data;
    return loyalityProducts;
  }
  return;
}

function getUser(id: string) {
  const { error, loading, data } = useQuery(CUSTOMER_QUERY, {
    variables: { id: id },
    skip: id === undefined || id === '',
    fetchPolicy: 'network-only',
  });
  if (data) {
    const { customer } = data;
    return customer;
  }
}

function getFreeDelivery() {
  const { data } = useQuery(FREEDELIVERY_QUERY, {
    fetchPolicy: 'network-only',
  });
  if (data) {
    const { freeDeliveries } = data;
    if (freeDeliveries.length > 0) {
      return freeDeliveries[0].value;
    }
    return null;
  }
}
