import Product from '../../../../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../../../../shared/types/Store.types';
import { SubCategoryType } from '../../../../../../admin/settings/subcategory';

export interface IProductToCartData {
  id: string;
  count?: number;
  variants?: VariantOfProduct;
  isEnvelopeSize: boolean;
  title: string;
}

export interface IProductsFillProps {
  products: any;
  addProduct: (data?: IProductToCartData) => void;
  subCategories: SubCategoryType[];
}

export interface IProductTitle {
  title: string;
  slug?: string;
}

export interface IProductUI {
  product: Product;
  subCategoriesList: SubCategoryType[];
  addProduct: (data?: IProductToCartData) => void;
}
