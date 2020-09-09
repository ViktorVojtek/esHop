import React from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'reactstrap';

import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import ProductDetailBody from '../../../app-data/components/pages/eshop/components/ProductDetail';
import { PRODUCT_QUERY } from '../../../app-data/graphql/query';
import Product from '../../../app-data/shared/types/Product.types';
import { withSetCart } from '../../../app-data/lib/state/Reducer';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <Spinner color="primary" />;
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  const { product } = data;

  return (
    <Layout>
      <ProductDetailBody product={product as Product} />
    </Layout>
  );
};

export default withSetCart(ProductDetail);
