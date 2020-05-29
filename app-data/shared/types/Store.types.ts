import { ProductPrice } from './Product.types';

export type VariantOfProduct = {
  title: string;
  price: ProductPrice;
  count: number;
};

export type CartProduct = {
  id: string;
  variant: VariantOfProduct;
};

export interface IState {
  cart: CartProduct[] | [];
  cartTotalSum: number;
  modal: boolean;
  menuOpen: boolean;
  error: boolean;
}

export interface IAction {
  payload: any;
  type: string;
}
