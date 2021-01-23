import React from 'react';
import { withSetCart } from '../../../../../../../lib/state/Reducer';
import Layout from '../../../../../../../shared/components/Layout/Site.layout';
import Product from '../../../../../../../shared/types/Product.types';
import ProductDetailBody from '../../../ProductDetail';

type ProductDetailType = {
  product: Product;
};

const ProductDetail = (props: ProductDetailType) => {
  const { product } = props;

  return (
    <Layout>
      <ProductDetailBody product={product as Product} />
    </Layout>
  );
};

export default withSetCart(ProductDetail);
