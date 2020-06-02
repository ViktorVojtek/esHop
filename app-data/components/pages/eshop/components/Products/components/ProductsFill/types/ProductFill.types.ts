import Product from '../../../../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../../../../shared/types/Store.types';

export interface IProductToCartData {
  id: string;
  count?: number;
  variants?: VariantOfProduct;
}

export interface IProductsFillProps {
  products: Product[];
  addProduct: (data: IProductToCartData) => void;
}

export interface IProductTitle {
  id: string;
  title: string;
}

export interface IProductUI extends Omit<IProductsFillProps, 'products'> {
  product: Product;
}
