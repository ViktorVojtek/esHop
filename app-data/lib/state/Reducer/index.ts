import { IAction, IState } from '../../../shared/types/Store.types';

const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log(action.payload);
      let newCart = [];

      if (state.cart.length > 0) {
        for (let i: number = 0; i < state.cart.length; i += 1) {
          if (state.cart[i].id === action.payload.id) {
            newCart = [...state.cart];

            for (let j: number = 0; j < state.cart[i].variant.length; j += 1) {
              if (
                state.cart[i].variant[j].title ===
                action.payload.variant[0].title
              ) {
                newCart[i].variant[j].count = action.payload.variant[0].count;
              } else {
                newCart[i].variant.push(action.payload.variant[0]);
              }
            }
          } else {
            newCart = [...state.cart, action.payload];
          }
        }

        return {
          ...state,
          cart: newCart,
        };
      } else {
        return {
          ...state,
          cart: [action.payload],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem: any) => cartItem.id !== action.payload
        ),
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
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

export default Reducer;
