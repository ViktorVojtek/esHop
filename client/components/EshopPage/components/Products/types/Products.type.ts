
type ProductImage = {
  path: string
  ext: string
  imgId: string
  size: string
  title: string
}

type ProductPrice = {
  currency: string
  currencySign: string
  discount: Number
  value: Number
}

type ProductVariant = {
  default: Boolean
  itemsInStock: Number
  title: string
  price: ProductPrice
}

type Product = {
  _id: string
  category: string
  dateCreated: string
  dateDeleted: string
  dateModified: string
  description: string
  deleted: Boolean
  inStock: Boolean
  modifiedByUserId: string
  shortDescription: string
  subCategory: string
  images: Array<ProductImage>
  note: string
  title: string
  variant: Array<ProductVariant>
}

export default Product;