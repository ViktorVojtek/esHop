import React from 'react';
import { withSetCart } from '../../../../../../../lib/state/Reducer';
import Layout from '../../../../../../../shared/components/Layout/Site.layout';
import Product from '../../../../../../../shared/types/Product.types';
import { SubCategoryType } from '../../../../../admin/settings/subcategory';
import ProductDetailBody from '../../../ProductDetail';

type ProductDetailType = {
  product: Product;
  subCategory: SubCategoryType;
};

const ProductDetail = (props: ProductDetailType) => {
  const { product, subCategory } = props;

  return (
    <Layout>
      <ProductDetailBody
        subCategory={subCategory}
        product={product as Product}
      />
    </Layout>
  );
};

export default withSetCart(ProductDetail);
