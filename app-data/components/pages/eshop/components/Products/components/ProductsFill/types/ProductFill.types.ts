import Product from '../../../../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../../../../shared/types/Store.types';
import Service from '../../../../../../../../shared/types/Service.types';

export interface IProductToCartData {
  id: string;
  count?: number;
  variants?: VariantOfProduct;
  isEnvelopeSize: boolean;
  title: string;
}

export interface IProductsFillProps {
  products: any;
  addProduct: (data: IProductToCartData) => void;
  toggleModal?: () => void;
}

export interface IProductTitle {
  id: string;
  title: string;
  slug?: string;
}

export interface IProductUI extends Omit<IProductsFillProps, 'products'> {
  product: Product;
}
