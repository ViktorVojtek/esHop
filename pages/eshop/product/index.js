import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../../../client/shared/components/Navigation';
import Footer from '../../../client/shared/components/Footer';
import { PRODUCT_QUERY } from '../../../client/app-data/graphql/query';

const ProductDetail = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
  });

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>loading</>;
  }

  const { product } = data;

  console.log(product);

  return (
    <>
      <Navigation />
      <p>Product detail</p>
      <Footer />
    </>
  );
};

export default ProductDetail;
