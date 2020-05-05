import { IAction, IState } from '../../types/Store.types';

const Reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const temp: any[] = [];

      if (state.cart.length > 0) {
        for (const product of state.cart) {
          console.log(product);

          if (product.id === action.payload.id) {
            const updatedItem = {
              ...product,
            };

            /* for (const variantItem of variant) {

            } */

            if (action.payload.variant) {
              updatedItem.variant = action.payload.variant;
            }

            temp.push(updatedItem);
          } else {
            temp.push(product);
          }
        }
      } else {
        temp.push(action.payload);
      }

      return {
        ...state,
        cart: temp,
      };
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
