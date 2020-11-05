import { ProductPrice } from './Product.types';

export type ProductImage = {
  base64?: string;
  path?: string;
  ext: string;
  imgId: string;
  size: string;
  title: string;
};

export type VariantOfProduct = {
  title: string;
  price: ProductPrice;
  discount: number;
  count: number;
  images: ProductImage[];
  productCode?: string;
};

export type GiftCard = {
  cardColor: string;
  price: number;
  text: string;
};

export type CartProduct = {
  id: string;
  variant: VariantOfProduct;
  isEnvelopeSize: boolean;
};

export type Customer = {
  firstName: string;
  lastName: string;
  isVerified: boolean;
  userId: string;
  token: string;
  marketing: boolean;
};

export interface IState {
  cart: CartProduct[] | [];
  cartTotalSum: number;
  modal: boolean;
  menuOpen: boolean;
  error: boolean;
  category: string;
  subCategory: string;
  giftCards: GiftCard[] | [];
  productsTotal: number;
  productsToShow: number;
  allowEnvelope: boolean;
  customer: Customer;
}

export interface IAction {
  payload: any;
  type: string;
}
