import React from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import {} from 'reactstrap';

import Navigation from '../../../client/shared/components/Navigation';
import Footer from '../../../client/shared/components/Footer';
import ProductDetailBody from '../../../client/components/EshopPage/components/ProductDetail';
import { PRODUCT_QUERY } from '../../../client/app-data/graphql/query';
import Product from '../../../client/components/EshopPage/components/Products/types/Products.type';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
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
      <ProductDetailBody product={product} />
      <Footer />
    </>
  );
};

export default ProductDetail;
