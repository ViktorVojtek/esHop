export type ProductImage = {
  base64?: string;
  path?: string;
  ext: string;
  imgId: string;
  size: string;
  title: string;
};

export type ProductPrice = {
  currency: string;
  currencySign: string;
  discount: number;
  value: number;
};

export type ProductCategory = {
  id: string;
  title: string;
};

export type ProductVariant = {
  default: boolean;
  description: string;
  discount: number;
  itemsInStock: number;
  images: ProductImage[];
  inStock: number;
  title: string;
  price: ProductPrice;
};

type Product = {
  _id: string;
  category?: ProductCategory;
  dateCreated?: string;
  dateDeleted?: string;
  dateModified?: string;
  deleted?: boolean;
  modifiedByUserId?: string;
  subCategory?: ProductCategory;
  title?: string;
  variants?: ProductVariant[];
};

export default Product;
