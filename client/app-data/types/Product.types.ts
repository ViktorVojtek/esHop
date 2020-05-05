export type ProductImage = {
  path: string;
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

export type ProductVariant = {
  default: boolean;
  itemsInStock: number;
  title: string;
  price: ProductPrice;
};

type Product = {
  _id: string;
  category: string;
  dateCreated: string;
  dateDeleted: string;
  dateModified: string;
  description: string;
  deleted: boolean;
  inStock: boolean;
  modifiedByUserId: string;
  shortDescription: string;
  subCategory: string;
  images: ProductImage[];
  note: string;
  title: string;
  variant: ProductVariant[];
};

export default Product;
