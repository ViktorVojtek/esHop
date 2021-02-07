import { SubCategoryType } from '../../components/pages/admin/settings/subcategory';
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
  bonus?: string;
};

export type ServiceData = {
  title: string;
  price: number;
  count: number;
  type?: string;
};

export type GiftCard = {
  giftCardTitle: string;
  giftCardImageUrl: string;
  priceValue: number;
  text: string;
  services: ServiceData[];
  totalPrice: number;
};

export type LoyalityProduct = {
  costPoints: number;
  discount?: number;
  isDiscount: boolean;
  image: string;
  title: string;
};

export type Coupon = {
  code: string;
  value: number;
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
  companyDTAXNum: string;
  companyDVATNum: string;
  companyName: string;
  companyVatNum: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  optionalAddress: string;
  optionalCity: string;
  optionalPostalCode: string;
  optionalState: string;
  tel: string;
  email: string;
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
  loyalityProduct: LoyalityProduct;
  coupon: Coupon;
  freeDelivery: number;
  subCategoriesList: SubCategoryType[] | [];
}

export interface IAction {
  payload: any;
  type: string;
}
