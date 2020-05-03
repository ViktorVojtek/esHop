/* eslint-disable no-underscore-dangle */
const Reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const temp = [];

      if (state.cart.length > 0) {
        for(const item of state.cart) {
          if (item.id === action.payload.id) {
            const updatedItem = { ...item, count: action.payload.count + 1 };
            temp.push(updatedItem);
          } else {
            temp.push(item);
          }
        }
      } else {
        temp.push(action.payload);
      }
      console.log(temp);

      return {
        ...state,
        cart: temp,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((cartItem) => (cartItem as any).id !== action.payload),
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
