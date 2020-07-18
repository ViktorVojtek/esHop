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
}

export interface IAction {
  payload: any;
  type: string;
}
