import React from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../../../app-data/shared/components/Navigation/Site';
import Footer from '../../../app-data/shared/components/Footer';
import ProductDetailBody from '../../../app-data/components/pages/EshopPage/components/ProductDetail';
import { PRODUCT_QUERY } from '../../../app-data/graphql/query';
import Product from '../../../app-data/shared/types/Product.types';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  const { product } = data;

  console.log(product);

  return (
    <>
      <Navigation />
      <ProductDetailBody product={product as Product} />
      <Footer />
    </>
  );
};

export default ProductDetail;
