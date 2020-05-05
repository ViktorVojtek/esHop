import { IAction, IState } from '../../types/Store.types';

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
              console.log(state.cart[i].variant[j]);
              console.log(action.payload.variant[0]);
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

/* let updatedCart = [];
        const oldCartData = [...state.cart];
        let itemExist: boolean = false;
        let itemExistIdx: number[] = [0, 0];

        let i: number = 0;
        let j: number = 0;

        while (i < oldCartData.length) {
          if (oldCartData[i].id === action.payload.id) {
            while (j < oldCartData[i].variant.length) {
              if (
                oldCartData[i].variant[j].title ===
                action.payload.variant[0].title
              ) {
                itemExist = true;
                itemExistIdx = [i, j];
              }

              j += 1;
            }
          }

          i += 1;
        }

        if (itemExist) {
          console.log('items exist');
          oldCartData[itemExistIdx[0]].variant[itemExistIdx[1]].count =
            action.payload.variant[0].count;

          console.log(oldCartData);

          updatedCart = [...oldCartData];
        } else {
          updatedCart = [...state.cart, action.payload];
        }

        console.log(updatedCart); */
